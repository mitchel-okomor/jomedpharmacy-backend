const Product = require('../models/products');


//create a product
const products = {
    addProduct: async (req, res)=>{
const name = req.body.name;
const price = req.body.price;
const category = req.body.category;

//create a new instance of product
const newProduct = new Product(name, price, category);
  
try{
  newProduct.addOne((result)=>{
console.log(result)
  if(result.insertId){ 
res.status(200).json({
    'status': 'success',
    'message': "Record added successfuly",
    data: result.insertId
}); 

  }
  else{
    res.status(501).json({
        status: 'error',
        message: "failed to add product"
    });   
  }
 
  });
  
    }  catch(err){
        console.log(err);
    }

    }
  


}

module.exports = products;