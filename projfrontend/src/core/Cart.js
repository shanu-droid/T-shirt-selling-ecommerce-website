import React, {useState, useEffect} from 'react';
import Base from "./Base"
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import Payment from './Payment';
import StripeCheckout from './StripeCheckout';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload])

    const loadAllProducts = (products) => {
       return (
           <div>
           <h2>All products are here in your cart :-) </h2>
           {products.map((product, index) => {
              return (
                <Card
                key={index}
                product={product}
                addtoCart={false}
                removeFromCart={true}
                setReload={setReload}
                reload={reload}/>
              )  
           })}
           </div>
       )
    }

    const loadCheckout = () => {
        return (
            <div>
            <h2>Now you can checkout here!</h2>
                <div>
                <Payment products={products} setReload={setReload}/>
                </div>
               <div className="mt-3">
               <StripeCheckout
               products={products}
               setReload={setReload}/>
 
               </div>
             
            </div>
        )
    }

    return (
        <Base title = "Ready to checkout!" description="Wear Crazy Tee's and Feel Crazy">
        <div className="row text-center">
            <div className="col-4">{products.length > 0 ?loadAllProducts(products):(<h3>Ups! Your Cart is Empty</h3>)}</div>
            
            <div className="col-8">
            {loadCheckout()}
            </div>
        </div>
        </Base>
    )
}

export default Cart;