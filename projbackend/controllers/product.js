const Product = require("../models/product")
const formidable = require("formidable")
const _ = require("lodash");
const fs = require("fs");
const category = require("../models/category");


exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, item) => {
        if(err){
            return res.status(400).json({
                error: "Product is not found in DB upss:("
            })
        }
        req.product = item;
        next();
    })
  
}

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "problem with image"
            })
        }
        
        //destructure the feilds
        const {name, description, price, category, stock} = fields;

        //restriction on fields
        if(
            !name ||
            !description || 
            !price ||
            !category ||
            !stock
        ){
            return res.status(400).json({
                error: "please include all fields"
            })
        }

        let product = new Product(fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big!!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        console.log(product);

        //save to the DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: "Saving T-Shirt in DB failed :( try again"
                })
            }
            res.json(product);
        })
    })
}

//By doing this way our application become fast
//middleware to handel photos
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}


exports.getProduct = (req, res) => {

    req.product.photo = undefined; 
    // so that all the data loaded from the db to front end except photo and we use middleware to handle the photo

    return res.json(req.product);

}

exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, file) => {
        if(err) {
            return res.status(400).json({
                error: "problem with image"
            })
        }
        
        //these two line of code responsible for updation of product
        let product = req.product;
        product = _.extend(product, fields)

        //handle file here
        if(file.photo){
            if(file.photo.size > 3000000){
                return res.status(400).json({
                    error: "File size too big!!"
                })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        console.log(product);

        //save to the DB
        product.save((err, product) => {
            if(err) {
                res.status(400).json({
                    error: "updation of product failed"
                })
            }
            res.json(product);
        })
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Failed to delete the product"
            })
        }
        res.json({
            message: "Deletion was a success",
            deletedProduct
        })
    })
}

exports.getAllProducts = (req, res) => {
     let limit = req.query.limit ? parseInt(req.query.limit) : 8 ;
     let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
        if(err){
            return res.status(400).json({
                error: "No Product Found"
            })
        }
       return res.json(products)
    })
}

//update the stock middleware
exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: {_id : prod._id},
                update: { $inc: { stock: -prod.count, sold: +prod.count}}
            }
        }
    })

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if(err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
        next();
    })
}

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {} , (err, category) => {
        if(err){
            return res.status(400).json({
                error: "No Category Found"
            })
        }
        res.json(category)
    })
}