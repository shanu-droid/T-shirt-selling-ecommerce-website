import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
   const [categories, setCategories] = useState([]);

   const {user, token} = isAuthenticated();

   const preload = () => {
      getCategories().then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          setCategories(data);
        }
      });
    };

  useEffect(() => {
     preload();
  }, []);


  const deleteThisCategory = categoryId => {
     deleteCategory(categoryId, user._id, token).then(data => {
     if (data.error) {
       console.log(data.error);
     } else {
       preload();
     }
   });
 };


return (
   <Base title="Welcome Admin!" description="Manage your all categories here!">
      <Link className="btn btn-info" style={{borderRadius:20}} to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
             <h2 className="mb-4 mt-4">All categories:</h2>
             {categories.map((category, index) => {
                 return(<div key={index} className="row text-center mb-2 ">
                 <div className="col-4 bg-info" style={{borderRadius:20}}>
                   <h3 className="text-dark text-left">{category.name}</h3>
                 </div>
                 <div className="col-4">
                   <Link
                     className="btn btn-warning"
                     style={{borderRadius:20, width:150}}
                     to={`/admin/category/update/${category._id}`}
                   >
                     <span className="">Update</span>
                   </Link>
                 </div>
                 <div className="col-4">
                   <button onClick={() => {
                      deleteThisCategory(category._id);
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

export default ManageCategories;
