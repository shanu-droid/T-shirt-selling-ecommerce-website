import React, {useState, useEffect} from 'react';
import "../styles.css"
import {API} from "../backend"
import Base from "./Base"
import Card from './Card';
import { getProducts } from './helper/coreapicalls';


export default function Routes() {

    const [products, setProducts] = useState([])
    const [error, setError] = useState(false)

    const loadAllProducts = () => {
        getProducts().then(data => {
            if(data.error){
                setError(data.error)
            }else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
        loadAllProducts()
    }, []);

    return (
        <Base title = "HOME PAGE" description="Wear Crazy Tee's and Feel Crazy">
            <div className="row text-center">
            <div className="text-white">
               <h3> All of Crazy T-shirts </h3>
            </div>
            <div className="row">
            {products.map((product, index) => {
                return (
                    <div key={index} className="col-4 mb-4">
                    <Card product={product}/>
                    </div>
                )
            })}
            </div>
            </div>
        </Base>
    )
}