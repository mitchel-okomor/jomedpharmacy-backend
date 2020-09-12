const express = require('express');
const router = express.Router();
const products = require('../controller/products');
const customers = require('../controller/customers');
const prescriptions = require('../controller/prescriptions');
const users = require('../controller/users');
const upload = require('../middleware/upload');
const helper = require('../services/helper');
const auth = require('../middleware/auth');
const orders = require('../controller/orders');




// get a product
router.get('/product/:id', products.get);
// get all products
router.get('/products', products.getAll);
// create a product
router.post('/product', upload.single('image'), products.add);
// update a product
router.patch('/product/:id',products.update);
// delete a product
router.delete('/product/:id', products.delete);
// delete a product
router.get('/search/', products.search);


// get a customer
router.get('/customer/:id', auth.jwt, customers.getCustomer);
// get all customers
router.get('/customers', customers.getAllCustomers);
// create a customer
router.post('/customer', helper.populateParams, auth.registerCustomer);
// update a customer record
router.patch('/customer/:id', customers.updateCustomer);
// delete a customer record
router.delete('/customer/:id', customers.deleteCustomer);
//login a customer
router.post('/logincustomer', helper.populateParams, auth.logincustomer);

//standing orders
router.post('/order', orders.addOrder);
router.get('/standingorders/:id', orders.getStandingOrders);
router.get('/standingprescriptions/:id', prescriptions.getStandingPrescriptions);
router.get('/orderhistory/:id', orders.getOrderHistory);
router.get('/prescriptionhistory/:id', prescriptions.getPrescriptionHistory);
router.post('/confirmation', customers.confirmEmail);
router.post('/resetpassword/:token', customers.resetPassword);
router.get('/verifytoken/:token', customers.verifyToken);

// get a user
router.get('/user/:id',auth.jwt, users.getUser);
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

module.exports = router;
