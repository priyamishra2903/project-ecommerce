const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../config');
const model = require('../modelconnect');

const productModel = connection.define( 'products', {
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discounted_price:{
        type: DataTypes.STRING,
        allowNull: true
    },
    category_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: 'categories',
            key: 'category_id'
        }
    }
});

module.exports = productModel;