const express = require('express');
const router = express.Router();
const products = require('../controller/products');

// get a product
router.get('/product');
// get all products
router.get('/products', (req, res) => {
  res.send('under construction');
  console.log('under construction');
});
// create a product
router.post('/product', products.addProduct);
// update a product
router.patch('/product', (req, res) => {
  res.send('under construction');
  console.log('under construction');
});
// delete a product
router.delete('/product', (req, res) => {
  res.send('under construction');
  console.log('under construction');
});


module.exports = router;
