var express = require('express');
var customercontroller = express.Router();

const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validation = require('../bin/src/joi');
const CustomerService = require('../services/customer');
const db = require('../bin/database/modelconnect');

let salt = process.env.salt;
const generateToken = (password, salt) => {

    let token = jwt.sign(password, salt);
    return token;
}

const passwordHash = async (password) => {
    const saltRounds = 12;
    const [err, passwordHash] = await to(bcrypt.hash(password, saltRounds));
    if (err) {
        return res.send({"msg": "Error while generating password hash"}); 
    }
    return passwordHash;
};

customercontroller.login = async(req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let validate = await validation.login.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: error.message });
    }

    let [err, result] = await to(db.customerModel.findAll({
        where:{
            email: email
        }
    }) )
    let customer = result[0];
    if(customer == null){
        return res.json({
        "error": "Incorrect email"
        });
    }
    
    let [error, isValid] = await to(
        bcrypt.compare(password, customer.encryptedPassword )
    );
    if(!isValid){
        return res.status(400).json({ "error": "Incorrect Password"});
    }
    else{
        return res.json({
            message: "Login Successful",
            token: generateToken(customer.encryptedPassword, salt)
        }) 
    }
}

customercontroller.signup = async(req, res) => {
    const {email, name, password, phone_number} = req.body;

    let validate = await validation.signup.validate(req.body);

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload" });
    }
    
    [err, result] = await to ( db.customerModel.findAll({
        where: {
            phone_number: phone_number
        }
    }) )
    customer = result[0];
    if(customer)
    {
        return res.status(400).send({ data: null, error: `This phone number already registered` });
    }

    let encryptedPassword = await  passwordHash(password);

    [err, result] = await to(
        db.customerModel.create({
            email, name, encryptedPassword, phone_number
    }) )
    if(!err){
        return res.json({
            "msg": "Sign up successful"
        });
    } else{
        return res.json({"data":null, "error": err})
    }
}


customercontroller.update_Number = async(req, res) => {
    let customer_id = req.params.id;
    let phone_number = req.body.phone_number;

    let validate = await validation.phone_number.validate({phone_number});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(CustomerService.update_Number(customer_id, phone_number))
    if(err)
        return res.json({ data: null, error: err});
    
    return res.json(result);
}

customercontroller.update_CreditCard = async(req, res) => {
    let customer_id = req.params.id;
    let card_number = req.body.card_number;

    let validate = await validation.card_number.validate({card_number});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(CustomerService.update_CreditCard(customer_id, card_number))
    if(err)
        return res.json({ data: null, error: err});

    return res.json(result);
}

customercontroller.update_Address = async(req, res) => {
    let customer_id = req.params.id;
    let address = req.body.address;

    let validate = await validation.address.validate({address});

    if(validate && validate.error)
    {
        return res.json({ data: null, error: "Invalid Payload"});
    }

    let [err, result] = await to(CustomerService.update_Address(customer_id, address))
    if(err)
        return res.json({ data: null, error: err});

    return res.json(result);
}

customercontroller.get_customer_by_id = async(req, res) => {
    let category_id = req.params.id;
    let [err, result] = await to(CustomerService.get_customer_by_id(category_id))
    if (err)
    {
        return res.json({"Data":null, "Error": err});
    }
    else
    {
        return res.json({result})
  
    }
}


module.exports = customercontroller;