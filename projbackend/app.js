require('dotenv').config()

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")


//my routes
//Authentication routes
const authRoutes = require("./routes/auth")

//user routes
const userRoutes = require("./routes/user")

//category routes
const categoryRoutes = require("./routes/category")

//product routes
const productRoutes = require("./routes/product")

//order routes
const orderRoutes = require("./routes/order")

//stripe for payment route
const stripeRoutes = require("./routes/stripepayment")

//braintree paypal payment routes
const paymentBRoutes = require("./routes/payment")

//DB Connection
mongoose.connect(process.env.DATABASE,{
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    }).then(() =>{
        console.log("DB CONNECTED................");
    });

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//MY Routes
app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)
app.use("/api", stripeRoutes)
app.use("/api", paymentBRoutes)


//PORT
const port = process.env.PORT || 3000

//Starting a server
app.listen(port, () => {
    console.log(`app is running at ${port}`);
})

