
var express = require('express');
var app = express.Router();

const auth = require("../middleware/auth");
const Productroute = require('../controllers/product');

app.get("/", Productroute.get_all_Products);

app.get("/:id", Productroute.get_Products_By_Id);

app.get("/search/:name", Productroute.search_Products);

app.get("/inCategory/:category_id", Productroute.get_Products_In_Category);

app.get("/:id/detail", Productroute.get_Details_By_Id);

app.get("/:id/reviews", Productroute.get_Reviews);

app.post("/:id/reviews", auth, Productroute.add_Reviews);
module.exports = app;