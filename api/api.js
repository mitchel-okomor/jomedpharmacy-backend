const express = require('express');
const router = express.Router();
const products = require('../controller/products');
const customers = require('../controller/customers');
const uplaod = require('../middleware/upload');



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
router.post('/customers', customers.addCustomer);
// update a customer record
router.patch('/customer/:id', customers.updateCustomer);
// delete a customer record
router.delete('/customer/:id', customers.deleteCustomer);
module.exports = router;
