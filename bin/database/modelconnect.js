const Sequelize = require('sequelize');
const {to} = require('await-to-js');
const connection = require('./config');

let customerModel = require('./models/customerModel');

let categoryModel = require('./models/categoryModel');

let productModel = require('./models/productModel');

let cartModel = require('./models/cartModel');

let orderModel = require('./models/orderModel');

let reviewModel = require('./models/reviewModel')

const connect = async ()=>{
    try {
  await connection.sync();
      let [err, result] = await to(connection.sync({ alter: false}));
      console.log("Error !");
      if(err)
          logger.error("Error in connecting to Database !");
      else
          logger.info('Connected to Database');
} catch (err) {
    return res.json({
        'data': null,
        'error': {
            'message': err.message
        }
    })
  }
}
//connection.sync({ force: true })

module.exports = {
    connect,  customerModel,categoryModel, productModel, cartModel, orderModel, reviewModel
}