var express = require('express');
var productcontroller = express.Router();
const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const validation = require('../bin/src/joi');
const ProductService = require('../services/product');

productcontroller.get_all_Products = async(req, res) => {
    let [err, result] = await to(ProductService.get_all_Products())
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}

productcontroller.get_Products_By_Id = async(req, res) => {
    let [err, result] = await to(ProductService.get_Products_By_Id(req.params.id))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}

productcontroller.search_Products = async(req, res) => {
    const category = req.params.name;
    let [err, result] = await to(ProductService.search_Products(category))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ result});
}

productcontroller.get_Products_In_Category = async(req, res) => {
    let [err, result] = await to(ProductService.get_Products_In_Category(req.params.category_id))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}

productcontroller.get_Details_By_Id = async(req, res) => {
    let [err, result] = await to(ProductService.get_Details_By_Id(req.params.id))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}

productcontroller.get_Reviews = async(req, res) => {
    let [err, result] = await to(ProductService.get_Reviews(req.params.id))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}

productcontroller.add_Reviews = async(req, res) => {
    let validate = await validation.add_review.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload" });
    }

    let [err, result] = await to(ProductService.add_Reviews(req.params.id, req.body))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json({ data: result, err});
}

module.exports = productcontroller;