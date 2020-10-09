var express = require('express');
var departmentcontroller = express.Router();
const {to} = require('await-to-js');
const Sequelize = require('sequelize');
const db = require('../bin/database/modelconnect');
const DepartmentServices = require('../services/dapartment');

departmentcontroller.get_Departments = async(req, res) => {
    let [err, result] = await to(DepartmentServices.get_Departments())
      if (err)
    {
        return res.json({"Data":null, "Error": err});
    }
    else
    {
        return res.json({result})
    }
};

departmentcontroller.get_Departments_By_Id = async(req, res) => {
  let department_id = req.params.id;
  let [err, result] = await to(DepartmentServices.get_Departments_By_Id(department_id))
  if (err)
  {
    return res.json({"Data":null, "Error": err});
  } else
  {
  return res.json({result})
  }
}

departmentcontroller.get_Departments_In_Product = async(req, res) => {
  let product_id = req.params.product_id;
  let [err, result] = await to(DepartmentServices.get_Departments_In_Product(product_id))
  if (err)
  {
    return res.json({"Data":null, "Error": err});
  }
  else
  {
  return res.json({result})
  }
}

module.exports = departmentcontroller;