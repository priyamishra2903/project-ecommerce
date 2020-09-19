const dotenv = require('dotenv');
const mysql = require('mysql');
const result = dotenv.config();

if (result.error) {
    throw result.error;
}

const { parsed: envs } = result;
module.exports = {
    envdata: envs,
    secretkey: process.env.SECRET_KEY
}
