var express = require('express')
var router = express.Router()
const { check } = require('express-validator');
const  {signup, signin, signout, isSignedIn} = require("../controllers/auth");

router.post("/signup",[
    check("name", "name should be atleast 3 char!!").isLength({ min: 3 }),
    check("email", "email is required!!").isEmail(),
    check("password", "password should be atleast 3 char!!").isLength({ min: 3 })
], signup);

router.post("/signin",[
    check("email", "email is required!!").isEmail(),
    check("password", "password field is required!!").isLength({ min: 1 })
], signin);

router.get("/signout", signout)

// just for testing middleware
// router.get("/testroute", isSignedIn, (req, res) =>{
//     res.json(req.auth)
// })

module.exports = router;