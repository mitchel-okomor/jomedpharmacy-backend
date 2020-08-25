const Customer = require("../models/customers");
const jwt = require('jsonwebtoken');
const helper = require("../services/helper");
const bcrypt = require("bcrypt-nodejs");



//create a customer
const customers = {
  addCustomer: async (req, res) => {
    console.log(req.body.number);
    try {
    const name = req.body.fname.trim() + " " + req.body.lname.trim();
    const number = req.body.number.trim();
    const address = req.body.address.trim();
    const email = req.body.email.trim();

    //create a new instance of customer
    const newCustomer = new Customer(name, number, address, email);
      newCustomer.addOne((result) => {
        if (result.insertId) {
          res.status(200).json({
            status: "success",
            message: "Record added successfuly",
            data: result.insertId,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "failed to add customer",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  getCustomer: (req, res) => {
    console.log(req.params.id);
    const customer = new Customer();

    try {
      customer.getOne(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result[0],
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No customer found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },

  getAllCustomers: (req, res) => {
    const customer = new Customer();

    try {
      customer.getAll( (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No customer found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },


deleteCustomer: (req, res)=>{
    const customer = new Customer();
    try {
      customer.deleteOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "customer deleted successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No customer found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},

updateCustomer: (req, res)=>{
    const name = req.body.name.trim();
    const number = req.body.number.trim();
    const address = req.body.address.trim();
    const email = req.body.email.trim();

    //create a new instance of customer
    const newCustomer = new Customer(name, number, address, email);    
    try {
      newCustomer.updateOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "customer updated successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "Failed to update customer",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},




  resetPassword: (req, res)=>{
    console.log(req.body.email);
    const customer = new Customer();

    try {
      customer.getByEmail(req.body.email, (customer) => {

        if (customer) {
          let token = jwt.sign({ customer: customer.customer_id }, 'shhhhh',{ expiresIn: 60 * 60 });
        let url = `http://localhost:4000/confirmation/${token}`;
          let html = `please click on this link to change password<a href="${url}"> ${url}</a>`;
        
        helper.sendmail(customer.email, token, html);
          res.status(200).json({
            status: "success",
            message: "check your email for confirmation",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No customer found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },

  confirmEmail: (req, res)=>{

  helper.verifyToken(req.params.token, (err, result)=>{
if(err){
  res.status(400).send({
    status: "error",
    message: "Invalid or expeired token"
  });
}else{

     //hash password with bcrypt-nodejs
     let salt = bcrypt.genSaltSync(10);
     bcrypt.hash(req.body.password, salt, null, (error, hash) => {
          if (error) {
           console.log(error);
          }
        
      //get all user information, password has already been declared in function parameters and will be hashed below

      let password = hash;
  
      const newCustomer = new Customer(password);    
      try {
        newCustomer.updateOne(result.customer, (result) => {
          if (result.affectedRows > 0) {
            res.status(200).json({
              status: "success",
              message: "Password changed successfuly",
            });
          } else {
            res.status(501).json({
              status: "error",
              message: "Reset password failed",
            });
          }
        });
      } catch (err) {
          console.log(err);
      }
  
     });
}


  });
  }
};

module.exports = customers;
