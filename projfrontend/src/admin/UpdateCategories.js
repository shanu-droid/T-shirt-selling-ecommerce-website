import React, {useState, useEffect} from "react"
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper"
import {Link} from "react-router-dom"
import {getCategory, updateCategory} from "./helper/adminapicall"

const UpdateCategory = ({match}) => {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated();

    const goBack = () => {
        return (
        <div className="mt-5">
        <Link className="btn btn-sm btn-info mb-3 col-md-3 offset-md-5" style={{borderRadius:20, height: 35}} to="/admin/dashboard">Admin Home</Link>
        </div>
        )
    }

    const preload = categoryId => {
        getCategory(categoryId).then(data => {
          //console.log(data)
          if(data.error){
            setError(data.error);
          }else{
            setName(data.name)
             
          }
        })
      }

      useEffect(() => {
        preload(match.params.categoryId);
      }, []);

    const handleChange = event => {
       setError("");
       setName(event.target.value)

    }
    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);

        //backend request fired
        updateCategory(match.params.categoryId, user._id, token, {name})
        .then(data => {
            if(data.error){
                console.log(data.error)
                setError(true)
            }else{
                setError("")
                setSuccess(true)
                setName("")
            }
        })
    }

    const successMessage = () => {
         if(success){
             return <h4 className="text-info offset-md-4">Category updated successfully!</h4>
         }
    }

    const warningMessage = () => {
        if(error){
            return <h4 className="text-danger offset-md-4">Failed to update category :(</h4>
        }
    }

    const myCategoryForm = () => {
        return (
           <form>
           <div className="form-group">
             <p className="lead text-white offset-md-5">
               Enter the category
             </p>
             <input type="text"
              className="form-control my-3" 
              onChange={handleChange}
              value={name}
              autoFocus 
              required
              placeholder="For Ex. Summer"
              ></input>
             <button 
             className="btn btn-outline-info col-md-3 offset-md-5"
             style={{borderRadius:20}}
             onClick={onSubmit}>
             Update Category
             </button>
           </div>
           </form>
        )
    }



    return (
       <Base 
       title="Update a category here"
       description="Add a updated category here!"
       className="container bg-info p-4">
       <div className="row bg-dark rounded">
          <div className="col-md-8 offset-md-2">
             {successMessage()}
             {warningMessage()}
             {myCategoryForm()} 
             {goBack()}
           </div>
       </div>
       </Base>
    )
}

export default UpdateCategory;