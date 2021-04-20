import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteProduct, getProducts } from "./helper/adminapicall";

const ManageProduct = () => {
         const [products, setProducts] = useState([]);

         const {user, token} = isAuthenticated();

         const preload = () => {
            getProducts().then(data => {
              if (data.error) {
                console.log(data.error);
              } else {
                setProducts(data);
              }
            });
          };

        useEffect(() => {
           preload();
        }, []);


        const deleteThisProduct = productId => {
            deleteProduct(productId, user._id, token).then(data => {
              if (data.error) {
                console.log(data.error);
              } else {
                preload();
              }
            });
          };

    return(
        <Base title="Welcome Admin!" description="Manage your all products here!">
      <Link className="btn btn-info" style={{borderRadius:20}} to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
             <h2 className="mb-4 mt-4">All products:</h2>
             {products.map((product, index) => {
                 return(<div key={index} className="row text-center mb-2 ">
                 <div className="col-4 bg-info" style={{borderRadius:20}}>
                   <h3 className="text-dark text-left">{product.name}</h3>
                 </div>
                 <div className="col-4">
                   <Link
                     className="btn btn-warning"
                     style={{borderRadius:20, width:150}}
                     to={`/admin/product/update/${product._id}`}
                   >
                     <span className="">Update</span>
                   </Link>
                 </div>
                 <div className="col-4">
                   <button onClick={() => {
                      deleteThisProduct(product._id);
                    }} className="btn btn-danger text-dark" style={{borderRadius:20, width:150}}>
                     Delete
                   </button>
                 </div>
               </div>)
             })}
        </div>
      </div>
    </Base>
    )
}

export default ManageProduct;