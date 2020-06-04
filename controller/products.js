const Product = require('../models/products');


//create a product
const products = {
    addProduct: (req, res)=>{
const name = req.body.name;
const price = req.body.price;
const category = req.body.category;

console.log(name);
//create a new instance of product
const newProduct = new Product(name, price, category);
    try{
        console.log(newProduct.name);
  const result = newProduct.addOne();
    console.log(result);  
res.status(200).json({
    'message': 'success',
    'data': result

});
    }  catch(err){
        console.log(err);
    }

    }
  


}

module.exports = products;