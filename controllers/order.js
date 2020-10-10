var express = require('express');
var ordercontroller = express.Router();
const {to} = require('await-to-js');
const Sequelize = require('sequelize');

const validation = require('../bin/src/joi');
const OrderService = require('../services/order');

ordercontroller.buy_Now = async(req, res) => {
    let [err, result] = await to(OrderService.buy_Now(req.body));
    if(err)
        res.json({ data: null, error: err});
    return res.json(result);
}

ordercontroller.get_Order_By_Id = async(req, res) => {
    let order_id = req.params.id
    let [err, result] = await to(OrderService.get_Order_By_Id(order_id))
    if (err){
      return res.json({"Data":null, "Error": err});
    }
    else{
      return res.json({ result });
    }
}

ordercontroller.get_Orders_In_Customer = async(req, res) => {
    const customer_id = req.params.customer_id;
    [err, result] = await to(OrderService.get_Orders_In_Customer(customer_id))
    if(err){
        return res.json({data: null, error: err});
    } else{
        return res.json({ data: result, error: null});
    }
}

ordercontroller.get_Short_Detail = async(req, res) => {
    let order_id = req.params.id;
    let [err, result] = await to(OrderService.get_Short_Detail(order_id))
    if (err){
      return res.json({"Data":null, "Error": err});
    }
    else{
      return res.json({ result });
    }
}
ordercontroller.place_your_Order = async(req, res) => {
    let address = req.body.address;
    let validate = await validation.address.validate({address});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(order_service.place_your_Order(req.body))
    if(err)
        res.json({ data: null, error: err});
    return res.json({ message:"Order placed successfully"});
}


module.exports = ordercontroller;