const express = require('express'),
configdata = require('./database/config'),

app = express()
const { DB_HOST, DB_USER, DB_NAME, DB_PASS, PORT } = configdata.envdata
app.use(express.json());
var execute = require('knex')({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        database: DB_NAME,
        password: DB_PASS
    }
});
var customers = express.Router();
//var departments = express.Router();;
var products = express.Router();

require('./routes/customers')(customers, execute);
//require('./routes/departments')(departments, execute);
require('./routes/products')(products, execute);

app.use('/customers', customers)
//app.use('/departments', departments);
app.use('/products', products);


app.listen(PORT || 3000, () => {
    console.log(`your app is listening at ${PORT}`);
})
