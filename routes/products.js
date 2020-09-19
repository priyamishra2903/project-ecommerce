var error = require('../middleware/error');
const checkToken = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const configdata = require('../config')

module.exports = function(products, execute) {
    // to get all the products
    
products.get('/', (req, res) => {
        execute
            .select(
                'product_id',
                'name',
                'description',
                'price'
            )
            .from('product')
            .then((data) => {
                var wholeData = {
                    count: data.length,
                    rows: data
                }
                res.json(wholeData);
            })
            .catch((err) => {
                res.send(error.error500);
                console.log('there is an in your sql query');
            })
    })
    // to get a product by product id
    products.get('/:product_id', (req, res) => {
        execute
            .select('*')
            .from('product')
            .where('product.product_id', req.params.product_id)
            .then((data) => {
                res.json(data[0]);
            })
            .catch((err) => {
                res.send(error.error500);
                console.log('there is an in your sql query');
            })
    })
    // to search for a product
    // abhi not working 
products.get('/find/:name', (req, res) => {
     
        let sql = req.query.pro;
        execute
            .select(
                'product_id',
                'name',
                'description',
                'price'
            )
            .from('product')
            .where('name', 'like', '% ' + sql)
            .orWhere('name', 'like', sql + ' %')
            .orWhere('description', 'like', '%' + sql + '%')
            .orWhere('name', sql)
            .then((data) => {
                console.log('data sent by search!');
                return res.json(data);
            })
            .catch((err) => {
                console.log(err)
                return res.json(err);
            })
    })



   
}