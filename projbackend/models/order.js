const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;

const ProductInCartSchema = new mongoose.Schema({
    product:{
        type: ObjectId,
        ref: "Product"
    },
    name: String,
    count: Number,
    price: Number
})

const ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema)

const OrderSchema = new mongoose.Schema({
    products: [ProductInCartSchema],
    transaction_id: {},
    amount: {type: Number},
    address: String,
    status:{
       type: String,
       default: "Received",
       enum: ["Cancelled", "Delivered", "Shipped", "Processing", "Received"]
    },
    update: Date,
    user: {
        type: ObjectId,
        ref: "User"
    }
}, {timestamps: true})

const Order = mongoose.model("Order", OrderSchema)
module.exports = {Order, ProductInCart}