var {to} = require('await-to-js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require('../bin/database/modelconnect');



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
     add_Reviews, get_Reviews
}