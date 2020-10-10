var express = require('express');
var app = express.Router();

const departmentroute = require('../controllers/department');

app.get("/", departmentroute.get_Departments );

app.get("/:id", departmentroute.get_Departments_By_Id );

app.get("/inProduct/:product_id", departmentroute.get_Departments_In_Product );

module.exports = app;