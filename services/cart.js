var {to} = require('await-to-js');
const Sequelize = require('sequelize');

const db = require('../bin/database/modelconnect');

async function get_products_by_id( customer_id ) {
    let [err, result] = await to(db.cartModel.findAll(
        {   attributes: {exclude: ['createdAt', 'updatedAt']},
            where: {
                customer_id: customer_id
            }
        }
    ));
    let error;
    if(err)
        return err;
    else if(result.length == 0)
        return "There are no products in cart";
}

async function add_Products(product) {
    let quantity =1;
    let product_id = product.product_id;
    let customer_id = product.customer_id;
    let [err, result] = await to( db.cartModel.findAll({
        where:{
            product_id: product_id,
            customer_id: customer_id
        }
    }));
    if (err) {
        return err;
    }

    if(result.length > 0){
        let subtotal = result[0]['price'];
        quantity +=1;
        subtotal = subtotal*quantity;
        [err, result] = await to (db.cartModel.update(
            { quantity: quantity,
            total: subtotal },
            {
            where:{
                product_id: product_id,
                customer_id: customer_id
            }}
        ) )
        if (err){
            return err;
        } else {
            return null, true;
        }
    } else {
        let [err, result] = await to( db.productModel.findAll({
            where:{
              product_id: product_id
            }
        }) );
    
        let name = result[0]['name'];
        let price;
        if(result[0]['discounted_price']==null){
            price = result[0]['price']
        } else {
            price = result[0]['discounted_price']
        }
    
        [err, result] = await to( db.cartModel.create({
            product_name: name,
            customer_id: customer_id,
            attributes: product.size,
            product_id: product_id,
            price: price,
            subtotal: price,
            quantity: quantity,
            where:{
                product_id: product_id,
                customer_id: customer_id
            }
        }) );
        if (err){
            return err;
        } else {
            return result;
        }
    }
}

async function update_Product( item_id, quantity ) {
    let [err, result] = await to( db.cartModel.findAll({
        where:{
            item_id: item_id
        }
    }));
    if (err) {
        return err;
    }

    if(result.length > 0){
        let subtotal = result[0]['price'];
        subtotal = subtotal*quantity;
        [err, result] = await to (db.cartModel.update(
            { quantity: quantity,
            total: subtotal },
            {
            where:{
                item_id: item_id
            }}
        ) )
        if (err){
            return err;
        } else {
            return "Item updated successfully";
        }   
    } else {
        return "Item not in cart";
    }
}

async function delete_Products( customer_id ) {
    let [err, result] = await to(db.cartModel.destroy({
            where: {
                customer_id: customer_id
            }
        }
    ));
    return result;
}

async function get_Total_Amount( customer_id ) {
    let [err, result] = await to( db.cartModel.findAll({
        where: {
            customer_id: customer_id
        }
    }) );
    if(result.length==0) {
        return "Cart is empty";
    } else {
        [err, result] = await to( db.cartModel.findAll({
            attributes: [[Sequelize.fn('sum', Sequelize.col('price')), 'total']],
            where:{
                customer_id: customer_id
            }
        }) );
        if (err){
            return err;
        } else {
            return result;
        }  
    }
}

async function delete_a_Product( product_id ) {
    let [err, result] = await to( db.cartModel.findAll({
        where: {
            product_id: product_id
        }
    }) );
    if(result.length==0) {
        return "Product not in cart";
    }
    if(result[0]['quantity'] > 1){
        quantity = result[0]['quantity'];
        quantity = quantity-1;
        let subtotal = result[0]['price'];
        subtotal = subtotal*quantity;
        [err, result] = await to (db.cartModel.update(
            { quantity: quantity,
            total: subtotal },
            {
            where:{
                product_id: product_id
            }}
        ) )
        if (err){
            return err;
        } else {
            return "Product removed successfully";
        }   
    } else{
        let [err, result] = await to(db.cartModel.destroy({
            where: {
                product_id: product_id
            }
        }
    ));
    return "Product removed successfully";
    }
}

module.exports = {
    get_products_by_id, add_Products, update_Product,
    delete_Products, get_Total_Amount, delete_a_Product
}