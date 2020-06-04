const express = require('express');
const router = express.Router();
const products = require('../controller/products');

// get a product
router.get('/product/:id', products.getProduct);
// get all products
router.get('/products', products.getAllProducts);
// create a product
router.post('/product', products.addProduct);
// update a product
router.patch('/product/:id',products.updateProduct);
// delete a product
router.delete('/product/:id', products.deleteProduct);


module.exports = router;
