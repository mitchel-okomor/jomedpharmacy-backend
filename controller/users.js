const User = require("../models/user");

//create a user
const user = {
  addUser: async (req, res) => {
    const fName = req.body.fName.trim();
    const lName = req.body.lName.trim();
    const number = req.body.number.trim();
    const address = req.body.address.trim();
    const email = req.body.email.trim();

    //create a new instance of user
    const newUser = new User(fName, lName, number, address, email);

    try {
      newUser.addOne((result) => {
        if (result.insertId) {
          res.status(200).json({
            status: "success",
            message: "Record added successfuly",
            data: result.insertId,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "failed to add user",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  getUser: (req, res) => {
    console.log(req.params.id);
    const user = new User();

    try {
      user.getOne(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No user found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },

  getAllUsers: (req, res) => {
    console.log("request now in controller");
    const user = new User();

    try {
      user.getAll( (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No user found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },


deleteUser: (req, res)=>{
    const user = new User();
    try {
      user.deleteOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "user deleted successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No user found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},

updateUser: (req, res)=>{
    const name = req.body.name.trim();
    const number = req.body.number.trim();
    const address = req.body.address.trim();
    const email = req.body.email.trim();

    //create a new instance of user
    const user = new User(name, number, address, email);    
    try {
      user.updateOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "user updated successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "Failed to update user",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},



  

};

module.exports = user;
