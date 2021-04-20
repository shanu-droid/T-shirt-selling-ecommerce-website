import React from 'react';
import {Route, Switch, BrowserRouter as Router} from "react-router-dom"
import Home from "./core/Home"
import Signup from "./user/Signup"
import Signin from "./user/Signin"
import AdminRoute from "./auth/helper/AdminRoute"
import PrivateRoute from "./auth/helper/PrivateRoute"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
//import Profile from "./user/Profile"
import AddCategory from "./admin/AddCategory"
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import ManageProduct from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import UpdateCategory from './admin/UpdateCategories';
import Cart from './core/Cart';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route  path="/" exact component={Home}/>
                    <Route  path="/signup" exact component={Signup}/>
                    <Route  path="/signin" exact component={Signin}/>
                    <Route  path="/cart" exact component={Cart}/>
                    <PrivateRoute path="/user/dashboard" exact component={UserDashBoard}/>
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard}/>
                    <AdminRoute path="/admin/create/category" exact component={AddCategory}/>
                    <AdminRoute path="/admin/categories" exact component={ManageCategories}/>
                    <AdminRoute path="/admin/create/product" exact component={AddProduct}/>
                    <AdminRoute path="/admin/products" exact component={ManageProduct}/>
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                    <AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory}/>
                </Switch>
            </Router>
        </div>
    )
}

export default Routes;