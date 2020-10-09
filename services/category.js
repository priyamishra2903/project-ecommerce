var {to} = require('await-to-js');
const Sequelize = require('sequelize');
const db = require('../bin/database/modelconnect');


async function get_categories() {
    let [err, result] = await to(db.categoryModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'description']}
    }));
    if(err)
        return err;
    else if(result.length == 0)
        return "No categories present";

    let Categories = JSON.stringify(result);
    [err, result] = await to(cache.setValue("Categories", Categories));
    if (err){
      return err;
    } else {
      result = JSON.parse(Categories);
      return result;
    }
}

async function get_categories_by_id(category_id) {
    let [err, result] = await to( db.categoryModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'description']}  ,
        where: {
            category_id: category_id
          }
    }) );
    if(!err) {
        if(result && result.length > 0) {
          let Category = JSON.stringify(result);
          [err, result] = await to(cache.setValue("Categories_byId", Category));
          if (err){
            return err;
          } else {
            result = JSON.parse(Category);
            return result;
          }
        } else {
            return `No category with id:${category_id}`;
        }
    } else {
        return err;
    }
}

async function get_Categories_In_Product(product_id) {
    let [err, result] = await to( db.productModel.findAll({
        attributes:['category_id'],
        where:{
          product_id: product_id
        }
    }));
    
    let category_id = result[0]['category_id'];
    [err, result] = await to( db.categoryModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}  ,
        where: {
          category_id: category_id
        }
    }) );
    if(!err) {
      if(result && result.length > 0) {
          return result;
      } else {
          return `No category of product with product_id: ${product_id}`
      }
    } else {
      return result;
    }
}

module.exports = {
    get_categories, get_categories_by_id, get_Categories_In_Product
}