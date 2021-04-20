import React , {useState} from "react"
import Base from "../core/Base"

import {Link, Redirect} from "react-router-dom"

import {signin, aunthenticate, isAuthenticated} from "../auth/helper"

const Signin = () => {
    const [values, setValues] = useState({
       email: "",
       password: "",
       error: "",
       loading: false,
       didRedirect: false
   })

 const {email, password, error, loading, didRedirect} = values
 const {user} = isAuthenticated();


 const handelChange = name => event => {
    setValues({...values, error: false, [name] : event.target.value})
}

const onSubmit = event => {
    event.preventDefault();
    setValues({...values, error: false, loading: true})
    signin({email, password})
    .then(data => {
        if(data.error){
            setValues({...values, error: data.error, loading:false})
        }else{
            aunthenticate(data, () => {
                setValues({
                    ...values,
                    didRedirect: true
                })
            })
        }
    })
    .catch(console.log("signin request failed"))
}

const performRedirect = () => {
    if(didRedirect){
        if(user && user.role === 1){
             return <Redirect to="/admin/dashboard"/>
        }else{
            return <Redirect to="/user/dashboard"/>
        }
    }
    if(isAuthenticated()){
        return <Redirect to="/" />
    }
}

const loadingMessage = () => {
    return(
     loading && (
         <div className="alert alert-info col-md-4 offset-sm-4 text-center">
         <h2>Loading....</h2></div>
     )
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


    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-4 offset-sm-4 text-left">
                  <form>

                      <div className="form-group" >
                      <label className="text-light">Email</label>
                      <input onChange = { handelChange("email") } value = {email} className="form-control" type="email"/>
                      </div>

                      <div className="form-group" >
                      <label className="text-light">Password</label>
                      <input onChange = { handelChange("password") } value = {password} className="form-control" type="password"/>
                      </div>
                      <div className="py-3">
                          <button onClick={onSubmit} className="btn btn-info btn-block offset-sm-4">Submit</button>
                      </div>
                      
                  </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="Sign In page" description="A page for user to sign in!">
          {loadingMessage()}
          {errorMessage()}
          {signInForm()}
          {performRedirect()}
          <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;