import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom";
import Base from "../core/Base"
import { createProduct, getCategories } from "./helper/adminapicall"
import {isAuthenticated} from "../auth/helper/index"

const AddProduct = () => {
    const {user, token} = isAuthenticated();
    const [values, setValues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories: [],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirected:false,
        formData:""
    })

    const {name, description, price, stock, categories, category, loading, error, createdProduct, getRedirected, formData} = values

    const preload = () => {
      getCategories().then(data => {
        console.log(data)
        if(data.error){
          setValues({...values, error: data.error});
        }else{
          setValues({...values, categories: data , formData: new FormData()});
        }
      })
    }
   

    const handleChange = name => event => {
      const value = name === "photo" ? event.target.files[0] : event.target.value;
      formData.set(name, value);
      setValues({ ...values, [name]: value });
    };

    const successMessage = () => {
      return(
        <div
        className="alert alert-info mt-3"
        style={{display: createdProduct ? "" : "none"}}>
           <h4>{createdProduct} created successfully</h4>
        </div>
      )
    }
    const errorMessage = () => {
      return (
          <div
          className="alert alert-danger mt-3 offset-md-4 col-4"
          style={{display: error ? "" : "none"}}>
             <h4>{error}</h4>
          </div>
      )
     }
    
    



     useEffect(() => {
      preload();
    }, []);
  
    const onSubmit = event => {
      event.preventDefault();
      setValues({ ...values, error: "", loading: true });
      createProduct(user._id, token, formData).then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name
          });
        }
      });
    };
    

    const createProductForm = () => (
        <form >
        <div>
           <span className="text-info">Post photo</span>
        </div>
          
          <div className="form-group">
            <label className="btn btn-block btn-info mb-3" style={{borderRadius:20}}>
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group mb-2">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
             {categories && categories.map((cate, index) => (
               <option key={index} value={cate._id}>{cate.name}</option>
             ))}
            </select>
          </div>
          <div className="form-group mb-2">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-info" style={{borderRadius:20}}>
            Create Product
          </button>
        </form>
      );




return (
    <Base 
    title="Add a products here!"
    description="Welcome to product creation section"
    className="container bg-info p-4">
    <div className="row bg-dark rounded">
       <div className="col-md-8 offset-md-2">
             
             {successMessage()}
             {errorMessage()}
             {createProductForm()}
        </div>
        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3 col-md-2 offset-md-5"  style={{borderRadius:20, height:35}} to="/admin/dashboard">Admin Home</Link>
          </div>
    </div>
    </Base>
 )
}

export default AddProduct;