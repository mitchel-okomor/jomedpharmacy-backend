const Product = require("../models/products");

//create a product
const products = {
  add: async (req, res) => {
    const name = req.body.name.trim();
    const price = req.body.price.trim();
    const category = req.body.category.trim();
    const description = req.body.description.trim();
    const imagePath = req.file? req.file.filename : ''; 

    console.log(name, price, category, description, imagePath);
    //create a new instance of product
    const newProduct = new Product(name, price, category, imagePath, description);

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

  get: (req, res) => {
    console.log(req.params.id);
    const product = new Product();

    try {
      product.getOne(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result[0],
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

  getAll: (req, res) => {
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


delete: (req, res)=>{
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

update: (req, res)=>{
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
},

 search: (req, res) => {
  console.log(req.query.value);
  const product = new Product();

  try {
    product.search(req.query.value, (result) => {
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
}

};

module.exports = products;
