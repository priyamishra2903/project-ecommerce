var express = require('express');
var app = express.Router();

const Cartroute = require('../controllers/cart');
const auth = require("../middleware/auth");

app.get("/:id", auth, Cartroute.get_products_by_id);

app.post("/add", auth, Cartroute.add_Products);

app.put("/update/:item_id", auth, Cartroute.update_Product);

app.delete("/empty", auth, Cartroute.delete_Products);

app.get("/totalAmount/:id", auth, Cartroute.get_Total_Amount);

app.delete("/removeProduct/:id", auth, Cartroute.delete_a_Product);

module.exports = app;