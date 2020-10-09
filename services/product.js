var {to} = require('await-to-js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../bin/database/modelconnect');


async function get_Products(){
    let [err, result] = await to( db.productModel.findAll())
    if (err){
        return err;
    }
    let Products = JSON.stringify(result);
    [err, result] = await to(cache.setValue("Products", Products));
    if (err){
      return err;
    } else {
      result = JSON.parse(Products);
      return result;
    }
}

async function get_Products_By_Id(product_id){
    let [err, result] = await to( db.productModel.findAll({
        where: {
          product_id: product_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
          let Product = JSON.stringify(result);
          [err, result] = await to(cache.setValue("Products_byId", Product));
          if (err){
            return err;
          } else {
            result = JSON.parse(Product);
            return result;
          }
        } else {
            return `No product with id: ${product_id}`
        }
    } else {
        return err
    }
}

async function search_Products(category){
    let [err, result] = await to( db.productModel.findAll({
        where: {
            name: {
                [Op.like]: '%' + category + '%'
            }
          }
    }) );
    if(!err) {
        if(result && result.length > 0) {
              return result;
        } else {
            return `No product with name: ${category}`
        }
    } else {
        return err
    }
}

async function get_Products_In_Category(category_id){
    let [err, result] = await to( db.productModel.findAll({
        attributes: ['name'],
        group: ['name'],
        where: {
            category_id: category_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            const count = result.length
            return count, result;
        } else {
            return `No product of category with category_id:${category_id}`
        }
    } else {
        return err
    }
}

async function get_Details_By_Id(product_id){
    let [err, result] = await to( db.productModel.findAll({
        attributes: ['name', 'description', 'price'],
        where: {
          product_id: product_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
          return result;
        } else {
            return [`No product with id: ${product_id}`]
        }
    } else {
        return err
    }
}

async function get_Reviews(product_id){
    let [err, result] = await to( db.reviewModel.findAll({
        attributes: ['review'],
        where: {
          product_id: product_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            return result;
        } else {
            return `No review of product with id: ${product_id}`
        }
    } else {
        return err
    }
}

async function add_Reviews(product_id, review){
    let [err, result] = await to( db.orderModel.findAll({
        where:{
          product_id: product_id
        }
    }) );
  
    if(result.length != 0){
        [err, result] = await to( db.reviewModel.create({
          name: review.name,
          review: review.review,
          rating: review.rating,
          product_id: product_id
        }) );
        if (err){
            return err;
        }
        else{
            return "Review added successfully";
        }
    } 
}

module.exports ={
    get_Products, get_Products_By_Id, search_Products, get_Details_By_Id,
    get_Products_In_Category, add_Reviews, get_Reviews
}