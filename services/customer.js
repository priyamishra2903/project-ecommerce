var {to} = require('await-to-js');
const bcrypt = require('bcrypt');

const db = require('../bin/database/modelconnect');

async function get_customer_by_id(customer_id){
    let [err, result] = await to( db.customerModel.findAll({
        where: {
            customer_id: customer_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            return [result];
        } else {
            return `No customer with id: ${customer_id}`;
        }
    } else {
        return err;
    }
}

async function update_Number(customer_id, phone_number){
    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customer_id
        }
    }) );
    let customer = result[0];
    if(customer == null){
        return `No customer with id: ${customer_id}`
    } 

    [err, result] = await to ( db.customerModel.findAll({
        where: {
            phone_number: phone_number
        }
    }) )
    customer = result[0];
    if(customer){
        return `This phone number already registered`
    }

    [err, result] = await to(
        db.customerModel.update({ phone_number: phone_number}, 
            { 
                where: {
                customer_id: customer_id
        } })
    );
    if(!err){
        return "Phone number updated"
    } else {
        return err;
    }
}

async function update_CreditCard(customer_id, card_number){
    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customer_id
        }
    }) );
    let customer = result[0];
    if(customer == null){
        return `No customer with id: ${customer_id}`;
    } 

    [err, result] = await to(
        db.customerModel.update({ card_number: card_number}, 
            { 
                where: {
                customer_id: customer_id
        } })
    );
    if(!err){
        return "Card details updated";
    } else {
        return err;
    }
}

async function update_Address(customer_id, address){
    let [err, result] = await to( db.customerModel.findAll({
        where:{
        customer_id: customer_id
        }
    }) );
    let customer = result[0];
    if(customer == null){
        return `No customer with id: ${customer_id}`
    } 

    [err, result] = await to(
        db.customerModel.update({ address: address }, 
            { 
                where: {
                customer_id: customer_id
        } })
    );
    if(!err){
        return "Address updated"
    } else {
        return err;
    }
}

module.exports = {
    get_customer_by_id, update_Number, update_CreditCard, update_Address
}