const express = require('express');
const router = express.Router();
const products = require('../controller/products');
const customers = require('../controller/customers');
const prescriptions = require('../controller/prescriptions');
const users = require('../controller/users');
const orders = require('../controller/orders');
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

// get a user
router.get('/user/:id', users.getUser);
// get all users
router.get('/users', auth.jwt, users.getAllUsers);
// create a user
router.post('/user', helper.populateParams, auth.register);
//login a user
router.post('/login', helper.populateParams, auth.login);
// update a user record
router.patch('/user/:id', auth.jwt, users.updateUser);
// delete a user record
router.delete('/user/:id', auth.jwt, users.deleteUser);



// get a prescription
router.get('/prescription/:id', prescriptions.getPrescription);
// get all prescriptions
router.get('/prescriptions', prescriptions.getAllPrescription);
// create a prescription
router.post('/prescription', prescriptions.addPrescription);
// update a prescription
router.patch('/prescription/:id', prescriptions.updatePrescription);
// delete a prescription
router.delete('/prescription/:id', prescriptions.deletePrescription);

// get an order
router.get('/order/:id', orders.getOrder);
// get all orders
router.get('/orders', orders.getAllOrder);
// create an order
router.post('/order', orders.addOrder);
// update an order
router.patch('/order/:id', orders.updateOrder);
// delete an order
router.delete('/order/:id', orders.deleteOrder);

module.exports = router;
