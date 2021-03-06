import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import {signout, isAuthenticated} from "../auth/helper"



const currentTab = (history, path) => {
    if(history.location.pathname === path){
        return {color: "#1B98F5"}
    }else{
        return {color: "#51E1ED"}
    }
}

const Menu = ({history}) => {
    return (
         <div>
             <ul className="nav nav-tabs bg-black">
               <li className="nav-item">
               <Link style={currentTab(history,"/")} className="nav-link" to="/">
                 Home
               </Link>
               </li>
               <li className="nav-item">
               <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">
                 Cart
               </Link>
               </li>
               {isAuthenticated() && (
                <li className="nav-item">
                <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                  U-Dashboard
                </Link>
                </li>
               )}
               {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                  A-Dashboard
                </Link>
                </li>
               )}
               
               {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">
                  Sign Up
                </Link>
                </li>
                <li className="nav-item">
                <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">
                  Sign In
                </Link>
                </li>
                </Fragment>
               )}
               {isAuthenticated() && (
                 <li className="nav-item">
                <span
                className="nav-link text-danger"
                onClick={() => {
                  signout(() => {
                    history.push("/")
                  })
                }}>Sign out</span>
                </li>
               )}
             </ul>

         </div>
    )
}

export default withRouter(Menu);