const Customer = require("../models/customers");

//create a customer
const customers = {
  addCustomer: async (req, res) => {
    const name = req.body.name.trim();
    const number = req.body.number.trim();
    const address = req.body.address.trim();
    const email = req.body.email.trim();

    //create a new instance of customer
    const newCustomer = new Customer(name, number, address, email);

    try {
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
}

};

module.exports = customers;
