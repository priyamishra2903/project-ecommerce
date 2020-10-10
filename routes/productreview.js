var express = require('express');
var app = express.Router();

const auth = require("../middleware/auth");
const Reviewroute = require('../controllers/product');


app.get("/:id/reviews", Reviewroute.get_Reviews);

app.post("/:id/reviews", auth, Reviewroute.add_Reviews);

module.exports = app;