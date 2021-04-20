import React , {useState} from "react"
import Base from "../core/Base"
import {isAuthenticated, signup} from "../auth/helper"

import {Link} from "react-router-dom"

const Signup = () => {
   const [values, setValues] = useState({
       name:"",
       email:"",
       password:"",
       error:"",
       success:false
   })

   const {name, email, password, error, success} = values
   

   const handelChange = name => event => {
       setValues({...values, error: false, [name] : event.target.value})
   }
    const onSubmit = event => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
            .then(data => {
            if(data.error){
               
                setValues({...values, error: data.error, success: false}) 

            }else{
                setValues({
                    ...values,
                    name:"",
                    email:"",
                    password:"",
                    error:"",
                    success:true

                })
            }
        })
        .catch(err => {
            //setValues({...values, error: err.errorMessage, success: false})
            console.log(err.errorMessage);
        })

    }

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                  <form>
                      <div className="form-group" >
                      <label className="text-light">Name</label>
                      <input className="form-control" onChange={handelChange("name")} type="text" value={name}/>
                      </div>

                      <div className="form-group" >
                      <label className="text-light">Email</label>
                      <input className="form-control" onChange={handelChange("email")} type="email" value={email}/>
                      </div>

                      <div className="form-group" >
                      <label className="text-light">Password</label>
                      <input className="form-control" onChange={handelChange("password")} type="password" value={password}/>
                      </div>
                      <div className="py-3">
                          <button onClick={onSubmit} className="btn btn-info btn-block offset-sm-4" >Submit</button>
                      </div>
                      
                  </form>
                </div>
            </div>
        )
    }
    

    const successMessage = () => {
       return(
        <div className="row">
        <div className="col-md-4 offset-sm-4 text-center">
        <div className="alert alert-info"
        style={{display: success ? "": "none"}}>
        New account was created succesfully,<Link to="/signin">Login Here</Link>
        </div>
        </div>
        </div>
       ) 
    }

    const errorMessage = () => {
       return(
        <div className="row">
        <div className="col-md-4 offset-sm-4 text-center">  
        <div className="alert alert-danger"
        style={{display: error ? "": "none"}}>
          {error}
        </div>
        </div>
        </div>
       )
    }

    return (
        <Base title="Sign up page" description="A page for user to sign up!">
          {successMessage()}
          {errorMessage()}
          {signUpForm()}
          <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signup;