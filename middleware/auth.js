const jwt = require('jsonwebtoken');
require('dotenv').config();
const {to} = require('await-to-js');
const db = require('../bin/database/modelconnect');

let salt = process.env.salt;

const auth = async (req, res, next) => {
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    let data;
    try {
        data = jwt.verify(token, salt);
    } catch (error) {
        return res.status(401).send({ data: null, error: "Token is Invalid" });
    }
    req.password = data.password;
    next();
};

module.exports = auth;