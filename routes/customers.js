var error = require('../middleware/error');
const jwt = require('jsonwebtoken');

const configdata = require('../database/config')
const checkToken = require('../middleware/middleware')


module.exports = function(customers, execute) {

    // for signing up for new user
customers.post('/', (req, res) => {
        const { body } = req;
        const { name, email, password } = body;

       execute
            .select('email', 'password')
            .from('customer')
            .where('customer.email', email)
            .andWhere('customer.password', password)
            .then((data) => {

                if (data.length == 0) {
                   execute
                        .insert(body)
                        .into('customer')
                        .then((data) => {
                            jwt.sign(body, configdata.secretkey, { expiresIn: '1h' }, (err, token) => {
                                if (err) {
                                    return res.send(err);
                                }
                              execute
                                    .select(
                                        'customer_id',
                                        'name',
                                        'email',
                                        'address',                                      
                                        'phone',
                                        'credit_card'
                                    )
                                    .from('customer')
                                    .where('customer.email', email)
                                    .then((data) => {
                                        responseData = {
                                            'customer': data[0],
                                            'accessToken': 'Bearer ' + token,
                                            'expires_in': '1h'
                                        }
                                        console.log('data sent');
                                        return res.json(responseData);
                                    })
                            })

                        }).catch((err) => {
                            console.log('error in your jwt token', err);
                            res.json('error');
                        })
                } else {
                    console.log('this user is already registered!')
                    res.json('this user is already registered!');
                }
            })
            .catch((error) => {
                console.log(error.emailsignup);
            })
    })

// for signing in for existing user
customers.post('/login', (req, res) => {
        const { body } = req;
        const { email, password } = body;

       execute
            .select('customer.email', 'customer.password')
            .from('customer')
            .where('customer.email', email)
            .andWhere('customer.password', password)
            .then((data) => {

                if (data.length > 0) {
                    jwt.sign(body, configdata.secretkey, { expiresIn: '1h' }, (err, token) => {
                        if (err) {
                            return res.send(err);
                        }
                       execute
                            .select(
                                'customer_id',
                                'name',
                                'email',
                                'address',                                      
                                'phone',
                                'credit_card'
                            )
                            .from('customer')
                            .where('customer.email', email)
                            .then((data) => {
                                responseData = {
                                    'customer': data[0],
                                    'accessToken': 'Bearer ' + token,
                                    'expires_in': '1h'
                                }
                                console.log('data sent');
                                return res.json(responseData);
                            })
                    })
                } else {
                    console.log('this user doesn\'t exist. Please sign up!');
                    res.json(error.emaillogin);
                }
            })
            .catch((error) => {
                console.log(error);
                return res.json('error sent!');
            })
    })

// update a customer
customers.put('/', checkToken, (req, res) => {
        jwt.verify(req.token, configdata.secretkey, (err, authData) => {
            if (!err) {

                const { body } = req;
                const {
                    name,
                    email,
                    password,
                    mob_phone,
                } = body;

                execute('customer')
                    .update({
                        'name': name,
                        'email': email,
                        'password': password,
                        'phone': mob_phone,
                    })
                    .where('customer.email', authData.email)
                    .then(() => {
                        console.log('customer updated!');
                        return res.json({ customerUpdate: 'customer updated!' });
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.send({ error: 'error sent to console! :D' });
                    })
            } else {
                console.log({ error_name: err.message, tokenExpiredAt: err.expiredAt });
                return res.sendStatus(403)
            }
        })
    })

// to update the address of the customer
customers.put('/address', checkToken, (req, res) => {
        jwt.verify(req.token, configdata.secretkey, (err, authData) => {
            if (!err) {

                const { body } = req;
                const {
                    address,
                } = body;

                execute('customer')
                    .update({
                        'address': address,
                    })
                    .where('customer.email', authData.email)
                    .then(() => {
                        console.log('address updated!');
                        return res.json({ customerAddUpdate: 'customer updated!' });
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.send({ error: 'error sent to console! :D' });
                    })
            } else {
                console.log({ error_name: err.message, tokenExpiredAt: err.expiredAt });
                return res.sendStatus(403)
            }
        })
    })

// to update the customer's credit card
customers.put('/creditCard', checkToken, (req, res) => {
        jwt.verify(req.token, configdata.secretkey, (err, authData) => {
            if (!err) {
                const { body } = req;
                const { credit_card } = body;

                execute('customer')
                    .update('customer.credit_card', credit_card)
                    .where('customer.email', authData.email)
                    .then(() => {
                        console.log('credit card detail updated!');
                        return res.json({ creditCardUpdate: 'credit card updated!' });
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.send({ error: 'error sent to console! :D' });
                    })
            } else {
                console.log({ error_name: err.message, tokenExpiredAt: err.expiredAt });
                return res.sendStatus(403);
            }
        })
    })

// get a customer by its token (user-key)
customers.get('/', checkToken, (req, res) => {
        jwt.verify(req.token, configdata.secretkey, (err, authData) => {
            if (!err) {
                execute
                    .select('*')
                    .from('customer')
                    .where('customer.email', authData.email)
                    .then((data) => {
                        console.log('data by token sent!');
                        return res.send(data);
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.send(error.accessUnauth)
                    })
            } else {
                console.log({ error_name: err.message, tokenExpiredAt: err.expiredAt });
                return res.sendStatus(403);
            }
        })
    })
}