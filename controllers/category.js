var express = require('express');
var categorycontroller = express.Router();

const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const db = require('../bin/database/modelconnect');
const CategoryService = require('../services/category');



categorycontroller.get_categories = async(req, res) => {
    let [err, result] = await to(CategoryService.get_categories())
      if (err)
      {
        return res.json({"Data":null, "Error": err});
      }
      else
      {
        return res.json({result})
      }
};

categorycontroller.get_categories_by_id = async(req, res) => {
  let category_id = req.params.id;
  let [err, result] = await to(CategoryService.get_categories_by_id(category_id))
  if (err)
  {
    return res.json({"Data":null, "Error": err});
  }
  else
  {
  return res.json({result})
  }
}

categorycontroller.get_Categories_In_Product = async(req, res) => {
  let product_id = req.params.product_id;
  let [err, result] = await to(CategoryService.get_Categories_In_Product(product_id))
  if (err)
  {
    return res.json({"Data":null, "Error": err});
  }
  else
  {
  return res.json({result})
  }
}

module.exports = categorycontroller;