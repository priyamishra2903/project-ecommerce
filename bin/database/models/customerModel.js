const {Sequelize, DataTypes} = require('sequelize');
const connection = require('../config');
const model = require('../modelconnect');

const customerModel = connection.define( 'customers', {
    customer_id: {
       type: DataTypes.BIGINT(11),
       autoIncrement:true,
       allowNull:false,
       primaryKey:true 
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    address:{
        type: DataTypes.STRING,
        allowNull: true
    },
    card_number:{
        type: DataTypes.BIGINT(11),
        allowNull: true
    },
    phone_number:{
        type: DataTypes.BIGINT(11),
        allowNull: false
    },
    encryptedPassword:{
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = customerModel;