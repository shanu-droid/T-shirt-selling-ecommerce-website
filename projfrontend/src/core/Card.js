import React, {useState, useEffect} from "react"
import { Redirect } from "react-router";
import { addItemToCart, RemoveItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper"


const Card = ({product, addtoCart = true, removeFromCart = false, setReload = f => f //function(f){return f}
    , reload = undefined}) => {      

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const cardTitle = product ? product.name: "Unknown Name"
    const cardDescription = product ? product.description: "Unknown Desscription"
    const cardPrice = product ? product.price: "Unknown Price"

    const addToCart = () => {
        addItemToCart(product, () => setRedirect(true))
    }

    const getRedirect = (redirect) => {
        if(redirect){
            return <Redirect to="/cart"/>
        }
    }

     const showAddToCart = (addtoCart) => {
         return (
            addtoCart && ( <button
                onClick={addToCart}
                className="btn btn-block rounded btn-outline-info mt-2 mb-2"
                style={{marginLeft:"158px", marginRight:"158px"}}
              >
                Add to Cart
              </button>)
         )

     }
     
     const showRemoveFromCart = (removeFromCart) => {
          return (
              removeFromCart && (
                <button
                onClick={() => {
                    RemoveItemFromCart(product._id)
                    setReload(!reload)
                    
                }}
                className="btn btn-block rounded btn-outline-danger mt-2 mb-2"
                style={{marginLeft:"140px", marginRight:"140px"}}
              >
                Remove from cart
              </button>
              )
          )
     }

        return (
          <div className="card text-white bg-dark border border-info">
            <div className="card-header lead text-center text-info">{cardTitle}</div>
            <div className="card-body">
                {getRedirect(redirect)}
              <div className="rounded border border-info p-2">
                <ImageHelper product={product}></ImageHelper>
              </div>
              <p className="lead bg-info rounded font-weight-normal mt-3 text-wrap text-dark text-center">
                {cardDescription}
              </p>
              <p className="btn btn-info rounded  btn-sm px-4 offset-md-5" 
              style={{marginLeft:"165px", marginRight:"165px"}}
              >₹ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                   {showAddToCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showRemoveFromCart(removeFromCart)}
                </div>
              </div>
            </div>
          </div>
        );
      };


export default Card;