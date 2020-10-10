var {to} = require('await-to-js');
const Sequelize = require('sequelize');
const db = require('../bin/database/modelconnect');


async function get_Departments() {
    let [err, result] = await to(db.departmentModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'description']}
    }));
    if(err)
        return err;
    else if(result.length == 0)
        return "No such departmemt is present";

    let departmemts = JSON.stringify(result);
    [err, result] = await to(cache.setValue("Departments", departmemts));
    if (err){
      return err;
    } else {
      result = JSON.parse(departmemts);
      return result;
    }
}

async function get_Departments_By_Id(category_id) {
    let [err, result] = await to( db.DepartmentModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt', 'description']}  ,
        where: {
            department_id: department_id
          }
    }) );
    if(!err) {
        if(result && result.length > 0) {
          let departmemt = JSON.stringify(result);
          [err, result] = await to(cache.setValue("Departments_byId", departmemt));
          if (err){
            return err;
          } else {
            result = JSON.parse(departmemt);
            return result;
          }
        } else {
            return `There is no departments with id:${category_id}`;
        }
    } else {
        return err;
    }
}

async function get_Departments_In_Product(product_id) {
    let [err, result] = await to( db.productModel.findAll({
        attributes:['department_id'],
        where:{
          product_id: product_id
        }
    }));
    
    let department_id = result[0]['department_id'];
    [err, result] = await to( db.departmentModel.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}  ,
        where: {
          department_id: department_id
        }
    }) );
    if(!err) {
      if(result && result.length > 0) {
          return result;
      } else {
          return `No  departments is present in which there is product_id: ${product_id}`
      }
    } else {
      return result;
    }
}

module.exports = {
    get_Departments, get_Departments_By_Id, get_Departments_In_Product
}