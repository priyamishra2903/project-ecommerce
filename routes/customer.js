var express = require('express');
var app = express.Router();
const Customerroute = require('../controllers/customer');
const auth = require("../middleware/auth");

app.get("/:id", Customerroute.get_customer_by_id);

app.post('/signup', Customerroute.signup);

app.post('/login', Customerroute.login);

app.put("/:id/update", auth, Customerroute.update_Number);

app.put("/:id/creditcard", auth, Customerroute.update_CreditCard);

app.put("/:id/address", auth, Customerroute.update_Address);

module.exports = app;