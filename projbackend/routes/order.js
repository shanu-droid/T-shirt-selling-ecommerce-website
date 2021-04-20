const express = require("express");
const router = express.Router();

const {isSignedIn, isAuthenticated, isAdmin} = require("../controllers/auth")
const {getUserById, pushOrderInPurchaseList} = require("../controllers/user")
const {updateStock} = require("../controllers/product")

const {getOrderById, createOrder, getAllOrders, updateStatus, getOrderStatus} = require("../controllers/order")

//params - it just a parameter extracter for us but it is also an actual routes
router.param("userId", getUserById);
router.param("orderId", getOrderById);


//Actual routes
//create route
router.post("/order/create/:userId",
 isSignedIn, 
 isAuthenticated, 
 pushOrderInPurchaseList, 
 updateStock, 
 createOrder)

//read route
router.get("/order/all/:userId",
 isSignedIn, 
 isAuthenticated, 
 isAdmin,
 getAllOrders
 )

 //status of order
 router.get("/order/status/:userId", 
 isSignedIn, 
 isAuthenticated, 
 isAdmin,
 getOrderStatus
 )

 router.post("/order/:orderId/status/:userId", 
 isSignedIn, 
 isAuthenticated, 
 isAdmin,
 updateStatus)

module.exports = router;