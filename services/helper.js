const helper = {};
helper.populateParams = (req, res, next) =>{
    console.log(req.body.fName);
req.params.fName = req.body.fname  ;
req.params.lName =  req.body.lName ;
req.params.number= req.body.number  ;
req.params.username = req.body.email ;
req.params.password = req.body.password  ;
next();
};

module.exports = helper;

