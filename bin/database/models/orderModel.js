const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../config');
const model = require('../modelconnect');

const orderModel = connection.define('orders', {
    order_id: {
        type: DataTypes.BIGINT(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: 'customers',
            key: 'customer_id'
        }
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: 'products',
            key: 'product_id'
        }
    },
    attributes:{
        type: DataTypes.STRING,
        allowNull: false
    },
    product_name:{
        type: DataTypes.STRING,
        allowNull: false,
        references:{
            model: 'products',
            key: 'name'
        }
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total:{
        type: DataTypes.INTEGER,
        allowNull: true
    },
    shipped_on:{
        type: DataTypes.DATE,
        allowNull: true
    },
    status:{
        type: DataTypes.ENUM,
        values: ['paid', 'pending', 'shipped', 'delivered'],
        allowNull: true
    }
});

module.exports = orderModel;