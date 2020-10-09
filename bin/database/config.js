const Sequelize = require('sequelize');
require('dotenv').config();

const connection = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host : process.env.HOST,
        dialect : 'mysql'
    }
)

module.exports = connection;