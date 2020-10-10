const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../config');
const model = require('../modelconnect');

const reviewModel = connection.define ( 'review',{
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    review:{
        type: DataTypes.STRING,
        allowNull: false
    },
    rating:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_id:{
        type: DataTypes.BIGINT(11),
        allowNull: false,
        references:{
            model: 'products',
            key: 'product_id'
        }
    }
});

module.exports = reviewModel;