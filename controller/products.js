const Product = require("../models/products");

//create a product
const products = {
  addProduct: async (req, res) => {
    const name = req.body.name.trim();
    const price = req.body.price.trim();
    const category = req.body.category.trim();
    const imagePath = req.filename? req.file.filename : ''; 

    //create a new instance of product
    const newProduct = new Product(name, price, category, imagePath);

    try {
      newProduct.addOne((result) => {
        if (result.insertId) {
          res.status(200).json({
            status: "success",
            message: "Record added successfuly",
            data: result.insertId,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "failed to add product",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  getProduct: (req, res) => {
    console.log(req.params.id);
    const product = new Product();

    try {
      product.getOne(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No product found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },

  getAllProducts: (req, res) => {
    const product = new Product();

    try {
      product.getAll( (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No product found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },


deleteProduct: (req, res)=>{
    const product = new Product();
    try {
      product.deleteOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "Product deleted successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No product found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},

updateProduct: (req, res)=>{
    const name = req.body.name.trim();
    const price = req.body.price.trim();
    const category = req.body.category.trim();

    //create a new instance of product
    const newProduct = new Product(name, price, category);    
    try {
      newProduct.updateOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "Product updated successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "Failed to update product",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
}

};

module.exports = products;
