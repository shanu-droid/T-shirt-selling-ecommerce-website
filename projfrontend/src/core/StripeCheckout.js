import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/CartHelper';
import StripeCheckoutButton from "react-stripe-checkout"
import {API} from "../backend"
import { createdOrder } from './helper/orderHelper';



const StripeCheckout = ({products, setReload = f=>f, reload=undefined}) => {

   const [data, setData] = useState({
       loading: false,
       success: false,
       error: "",
       address: ""
   })
   
    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    // const getFinalPrice = () => {
    //     return products.reduce((currentValue, nextValue) => {
    //        return currentValue + nextValue.count * nextValue;
    //     }, 0)
    // }

    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
           amount = amount + p.price;
        })
        return amount;
    }
    const makePayment = token => {
        const body = {
            token, 
            products
        }
        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
             body: JSON.stringify(body)

        }).then(response => {
          console.log(response)
          //call further method
          const {status} = response;
          console.log("STATUS", status)
          cartEmpty();
        }).catch(err => console.log(err))


    }
    
    const showStripeButton = () => {
        return isAuthenticated() ?(
            <StripeCheckoutButton
            stripeKey="pk_test_51IcqR5SEWXl2FzuQzewGDePM70kGYZo20g7POuMqdMMd5LJ9Y7nh0FLZHXVBPC1VaCsfDNoWSrGBluh8ZIm31A1600CFjXbZ0I"
            token={makePayment}
            amount={getFinalAmount()*(100/74.35)}
            name="Your order"
            shippingAddress
            billingAddress>
            <button className="btn btn-outline-info rounded mt-5">Pay with stripe</button>
            </StripeCheckoutButton>
            
        ):(
            <Link to="/signin">
            <button className="btn btn-warning mt-5">Signin</button>
            </Link>
          
        )

    }

    return (
        <div>
        <h4>Total amount of your cart is ₹{getFinalAmount()}</h4>
        <h4 className="text-info">Stripe checkout here!</h4>
          {showStripeButton()}
        </div>
    )
   
}

export default StripeCheckout;