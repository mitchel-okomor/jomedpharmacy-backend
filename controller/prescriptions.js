const Prescription = require("../models/prescriptions");
const randomId = require("../services/helper");


//create a prescription
const prescriptions = {
  addPrescription: async (req, res) => {
      const id =randomId.idGenerator();
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const number = req.body.number.trim();
    const description = req.body.description.trim(); 
const isAnswered = req.body.isAnswered;
    //create a new instance of prescription
    const newPrescription = new Prescription(id, name, email, number, description, isAnswered);

    try {
      newPrescription.addOne((result) => {
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
            message: "failed to add prescription",
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  },

  getPrescription: (req, res) => {
    console.log(req.params.id);
    const prescription = new Prescription();

    try {
      prescription.getOne(req.params.id, (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No prescription found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },

  getAllPrescription: (req, res) => {
    const prescription = new Prescription();

    try {
      prescription.getAll( (result) => {
        if (result.length > 0) {
          res.status(200).json({
            status: "success",
            data: result,
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No prescription found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
  },


deletePrescription: (req, res)=>{
    const prescription = new Prescription();
    try {
      prescription.deleteOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "prescription deleted successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "No prescription found",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
},

updatePrescription: (req, res)=>{
    const name = req.body.name.trim();
    const email = req.body.email.trim();
    const number = req.body.number.trim();
    const description = req.body.description.trim(); 
const isAnswered = req.body.isAnswered;

    //create a new instance of prescription
    const newPrescription = new Prescription(name, email, number, description, isAnswered);    
    try {
      newPrescription.updateOne(req.params.id, (result) => {
        if (result.affectedRows > 0) {
          res.status(200).json({
            status: "success",
            message: "prescription updated successfuly",
          });
        } else {
          res.status(501).json({
            status: "error",
            message: "Failed to update prescription",
          });
        }
      });
    } catch (err) {
        console.log(err);
    }
}

};

module.exports = prescriptions;
