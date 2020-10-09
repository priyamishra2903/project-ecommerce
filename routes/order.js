var express = require('express');
var app = express.Router();

const auth = require("../middleware/auth");
const Ordersroute = require('../controllers/order')

app.post("/", auth, Ordersroute.place_your_Order);

app.post("/buyNow", auth, Ordersroute.buy_Now);

app.get("/:id", auth, Ordersroute.get_Order_By_Id);

app.get("/inCustomer/:customer_id",auth, Ordersroute.get_Orders_In_Customer);

app.get("/shortDetail/:id",auth, Ordersroute.get_Short_Detail);

module.exports = app;