import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { createdOrder } from "./helper/orderHelper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import DropIn from "braintree-web-drop-in-react"


const Payment = ({products, setReload = f => f, reload = undefined}) => {
   const [info, setInfo] = useState({
       loading:false,
       success:false,
       clientToken: null,
       error:"",
       instance:{}
   })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token
  
  const getToken = (userId, token) => {
    getmeToken(userId, token).then(info => {
      // console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
      return (
          <div>
          {info.clientToken !== null && products.length > 0 ? (
            <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn rounded btn-block btn-outline-info" onClick= {onPurchase}>Buy</button>
          </div>
          ):(<h3>Please login or add something to Cart</h3>)}
          </div>
      )
  }

  useEffect(() => {
      getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({loading: true})
    let nonce;
    let getNonce = info.instance
    .requestPaymentMethod()
    .then(data => {
      nonce = data.nonce
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      }
      processPayment(userId, token, paymentData)
      .then(response => {
        setInfo({...info, success: response.success, loading: false})
        
        const orderData = {
          products: products,
          transaction_id: response.transaction._id,
          amount: response.transaction.amount
        }
        
        createdOrder(userId, token, orderData)

        cartEmpty(() => {
          console.log("did it crased")
        })
        setReload(!reload)
        console.log("PAYMENT SUCCESS")
        

      })
      .catch(err => {
        setInfo({loading:false, success:false, error: err})
        console.log("PAYMENT Failed")

      })
    })
  }

  const successMessage = () => {
    return(
      <div
      className="alert alert-info mt-3"
      style={{display: info.success ? "" : "none"}}>
         <h4>Your order is placed successfully</h4>
      </div>
    )
  }
  const getAmount = () => {
    let amount = 0
    products.map(p => {
      amount = amount + p.price
    })
    return amount;
  }

   return (
       <div>
          {successMessage()}
         <h3 className="text-info">You can pay ₹{getAmount()} here with card!</h3>
         {showbtdropIn()}
       </div>
   )
}

export default Payment;