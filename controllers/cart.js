var express = require('express');
var cartcontroller = express.Router();
const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const db = require('../bin/database/modelconnect');
const CartService = require('../services/cart');

cartcontroller.get_products_by_id = async(req, res) => {
    let customer_id = req.params.id;
    let [err, result] = await to(CartService.get_products_by_id(customer_id))
    if(!err) 
    {
        return res.json({ result });
    } else
    {
        res.json({ data: null, " There is an error": err});
    }
};

cartcontroller.add_Products = async(req,res) => {
    let product = req.body;

    let [err, result] = await to(CartService.add_Products(product));
    if (err)
    {
        return res.json({ error: err.message });
    }
    else
    {
        return res.json({ message: "Product is added successfully in your Cart" })
    }    
}

cartcontroller.update_Product = async(req, res) => {
    const item_id = req.params.item_id;
    const quantity = req.body.quantity;

    let [err, result] = await to(CartService.update_Product(item_id, quantity))
    if (err)
    {
        return res.json({ error:err });
    }
    else
    {
        return res.json({ result })
    }
}

cartcontroller.delete_Products = async(req, res) => {
    const customer_id = req.body.customer_id;
    let [err, result] = await to(CartService.delete_Products(customer_id))

    if (err)
    {
        return res.json({"Data":null, "Error": err});
    } 
    if(!result)
    {
        return res.json({data: null, error: "No products is present in cart"});
    }
    return res.json({ message: "Items is deleted Successfully" })
}

cartcontroller.get_Total_Amount = async(req, res) => {
    const customer_id = req.params.id;

    let [err, result] = await to(CartService.get_Total_Amount(customer_id))
    if (err)
    {
        return res.json({"Data":null, "Error": err});
    } 
    if(!result)
    {
        return res.json({"Data": null, "Error": result[0]});
    }
    return res.json({ result })
}

cartcontroller.delete_a_Product = async(req, res) => {
    const product_id = req.params.id;

    let [err, result] = await to(CartService.delete_a_Product(product_id))
    if(err)
        return res.json({data: null, error: err});

    return res.json({ result});
}

module.exports = cartcontroller;