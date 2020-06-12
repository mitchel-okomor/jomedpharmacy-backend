const express = require('express');
const router = express.Router();
const products = require('../controller/products');
const customers = require('../controller/customers');
const users = require('../controller/users');
const uplaod = require('../middleware/upload');
const helper = require('../services/helper');
const auth = require('../middleware/auth');



// get a product
router.get('/product/:id', products.getProduct);
// get all products
router.get('/products', products.getAllProducts);
// create a product
router.post('/product', uplaod.single('image'), products.addProduct);
// update a product
router.patch('/product/:id',products.updateProduct);
// delete a product
router.delete('/product/:id', products.deleteProduct);



// get a customer
router.get('/customer/:id', customers.getCustomer);
// get all customers
router.get('/customers', customers.getAllCustomers);
// create a customer
router.post('/customer', customers.addCustomer);
// update a customer record
router.patch('/customer/:id', customers.updateCustomer);
// delete a customer record
router.delete('/customer/:id', customers.deleteCustomer);

// get a customer
router.get('/user/:id', users.getUser);
// get all customers
router.get('/users', users.getAllUsers);
// create a customer
router.post('/user', helper.populateParams, auth.register);
// update a customer record
router.patch('/user/:id', users.updateUser);
// delete a customer record
router.delete('/user/:id', users.deleteUser);

module.exports = router;
