const Order = require("../models/orders");


//create a order
const orders = {
  addOrder: async (req, res) => {
      const customer_id =req.customerId;
    const products = req.body.products;
    const amount = req.body.amount; 
const isPaid = req.body.isPaid;
    //create a new instance of order
    const newOrder = new Order(customer_id, products, amount, isPaid);

    try {
      newOrder.addOne((result) => {
        console.log(result);
        if (result.insertId) {
          res.status(200).json({
            status: "success",
            message: "Record added successfuly",
            data: result.insertId,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "failed to add order",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  getOrder: (req, res) => {
    console.log(req.params.id);
    const order = new Order();

    try {
      order.getOne(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No order found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },

  getAllOrder: (req, res) => {
    const order = new Order();

    try {
      order.getAll( (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No order found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },


deleteOrder: (req, res)=>{
    const order = new Order();
    try {
      order.deleteOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "order deleted successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No order found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},

updateOrder: (req, res)=>{
    const customer_id =req.customerId;
    const products = req.body.products;
    const amount = req.body.amount; 
const isPaid = req.body.isPaid;
    //create a new instance of order
    const newOrder = new Order(customer_id, products, amount, isPaid);
       try {
      newOrder.updateOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "order updated successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "Failed to update order",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},


getStandingOrders: (req,res)=>{
  console.log(req.params.id);
  const orders = new Order();

    try {
      orders.getStandingOrders(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } 
        else if(result.length <1){
          res.status(200).json({
            status: "success",
            message: "No standing order",
          });
        }
        else {
          res.status(501).json({
            status: "error",
            message: "No record found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},


getOrderHistory: (req,res)=>{
  console.log(req.params.id);
  const orders = new Order();

    try {
      orders.getOrderHistory(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } 
        else if(result.length <1){
          res.status(200).json({
            status: "success",
            message: "No orders yet",
          });
        }
        else {
          res.status(501).json({
            status: "error",
            message: "No record found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
}

};

module.exports = orders;
