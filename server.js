const express = require("express");
var app = express();
const bodyParser = require('body-parser');
const {to} = require('await-to-js');
const Sequelize = require('sequelize');
require('dotenv').config();

app.use("/customer", require("./routes/customer"));
app.use("/categories", require("./routes/category"));
app.use("/product", require("./routes/product"));
app.use("/shoppingcart", require("./routes/cart"));
app.use("/orders", require("./routes/order"));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
   
    console.log(`Server is running on PORT ${PORT}`);
});

module.exports = app;