const express = require('express');
const router = express.Router();

//get a product
router.get('/product', (req, res, next)=>{
    res.send('under construction');
    console.log("under construction");});
//get all products
router.get('/products', (req, res)=>{
    res.send('under construction');
    console.log("under construction");});
//create a product
router.post('/product', (req, res)=>{
    res.send('under construction');
    console.log("under construction");});
//update a product
router.patch('/product', (req, res)=>{
    res.send('under construction');
    console.log("under construction");});
//delete a product
router.delete('/product', (req, res)=>{
    res.send('under construction');
    console.log("under construction");});


module.exports=router;