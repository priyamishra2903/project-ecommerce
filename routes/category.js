var express = require('express');
var app = express.Router();

const Categoryroute = require('../controllers/category');

app.get("/", Categoryroute.get_categories );

app.get("/:id", Categoryroute.get_categories_by_id );

app.get("/inProduct/:product_id", Categoryroute.get_Categories_In_Product );

module.exports = app;