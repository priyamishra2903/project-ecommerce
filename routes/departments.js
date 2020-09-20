var error = require('../middleware/error');
const checkToken = require('../middleware/middleware');
const jwt = require('jsonwebtoken');
const configdata = require('../database/config')

module.exports = function(departments, execute) {
   
departments.get('/', (req, res) => {
        execute.select('*').from('department')
            .then((departmentList) => {
                console.log('data read success');
                res.json(departmentList);
            })
            .catch((error) => {
                console.log('Error in execution', error);
            })
    })

departments.get('/:department_id', (req, res) => {
        execute.select('*').from('department').where('department_id', req.params.department_id)
            .then((departbyid) => {
                console.log('data success');
                if (departbyid.length == 0) {
                    return res.json(err.err400);
                }
                return res.json(departbyid[0]);
            })
            .catch((error) => {
                console.log('Error in execution', error);
            })
    })
}
