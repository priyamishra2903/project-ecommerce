var {to} = require('await-to-js');

const db = require('../bin/database/modelconnect');

async function place_your_Order(order) {
    try{
        let [err, result] = await to( db.cartModel.findAll({
            attributes: { exclude: ["createdAt", 'updatedAt', "item_id"]},
            where:{
              customer_id: order.customer_id
            }
        }) );
      
        let order_data = [];
      
        result.forEach( elem => {
            let tmp = elem.dataValues;
            tmp["status"] = order.status;
            tmp["shipped_on"] = order.shipped_on;
            order_data.push(tmp);
        })
          
        if (order_data === undefined) {
            order_data = {}
        };
      
        [err, result] = await to(db.orderModel.bulkCreate(order_data));
        if (err){
            return err;
        } else {
            db.cartModel.destroy({
                where:{
                    customer_id: customer_id
                }
            })
              return result
        }
    } catch{
          return err  
    } 
} 

async function buy_Now(product) {
    try{
        const {shipped_on,customer_id, status, size, quantity, product_id, address} = product;
        let [err, result] = await to( db.productModel.findAll({
            where:{
                product_id: product_id
            }
        }) );
    
        let product_name = result[0]['name'];
        let unit_cost = result[0]['price'];
        if(quantity == 1){
            total = unit_cost;
        } else{
            total = unit_cost*quantity;
        }
        
        [err, result] = await to( db.orderModel.create({
            product_name: product_name,
            customer_id: customer_id,
            attributes: size,
            product_id: product_id,
            price: unit_cost,
            total: total,
            quantity: quantity,
            shipped_on: shipped_on,
            status: status,
            address: address
            }) );
        if (err){
            return err;
        } else {
            return "Order placed successfully"
        }
    } catch{
        return err
    }
}

async function get_Order_By_Id(order_id) {
    let [err, result] = await to( db.orderModel.findAll({
        attributes: ['order_id','product_id','attributes','product_name','quantity','price','total'],
        where:{
            order_id:order_id
        }
    }) )
    if (err){
      return err;
    }
    else{
      return result;
    }
}

async function get_Orders_In_Customer(customer_id) {
    let [err, result] = await to( db.orderModel.findAll({
        attributes: {
        exclude: ['createdAt', 'updatedAt']
        },
        where: {
            customer_id: customer_id
        }
    }) );
    if(!err) {
        if(result && result.length > 0) {
            return result;
        } else {
            return `No orders of customer with customer id: ${customer_id}`
        }
    } else {
        return err
    }
}

async function get_Short_Detail(order_id) {
    let [err, result] = await to( db.orderModel.findAll({
        attributes: ['order_id','price','shipped_on','status'],
        where:{
            order_id: order_id
        }
    }) )
    if (err){
      return err;
    }
    else{
      return result;
    }
}

module.exports = {
    place_your_Order, buy_Now, get_Order_By_Id,
    get_Orders_In_Customer, get_Short_Detail
}