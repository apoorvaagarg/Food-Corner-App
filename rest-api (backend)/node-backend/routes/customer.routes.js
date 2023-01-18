// create routes
const express = require("express");
const app = express();
const customerRoute = express.Router();  //very important module
let Customer = require("../model/Customer");

// add Customer for Customerbank
customerRoute.route('/addcustomer').post((req, res, next)=>{
    Customer.create(req.body,(error, data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data)
        }
    });
});

//get all Customer data from Bank
customerRoute.route('/').get((req, res)=>{
    Customer.find((error, data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data)
        }
    });
});

//get Customer by id?
customerRoute.route('/get-customer/:customer_email').get((req, res)=>{
    Customer.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.json(data)
        }
    });
});

//Update Customerbank
customerRoute.route('/edit-data/:id').put((req, res, next)=>{
    Customer.findByIdAndUpdate(req.params.id,{
        $set: req.body
    } ,(error,data)=>{
        if(error){
            return next(error);
            console.log(error)
        }
        else{
            res.json(data);
            console.log('Donor Data updated Successfully')
        }
    });
});

//Delete from Customerbank
customerRoute.route('/delete-data').get((req, res, next)=>{
    Customer.deleteMany(req.params.id,(error,data)=>{
        if(error){
            return next(error)
        }
        else{
            res.status(200).json({
                msg: data
            })
        }
    });
});
//dont forget to export module
module.exports = customerRoute;