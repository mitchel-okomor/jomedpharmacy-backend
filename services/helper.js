const helper = {};
helper.populateParams = (req, res, next) =>{
req.params.fName = req.body.fname  ;
req.params.lName =  req.body.lName ;
req.params.number= req.body.number  ;
req.params.username = req.body.email ;
req.params.password = req.body.password  ;
next();
};

helper.idGenerator = ()=>{
  
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        return '_' + Math.random().toString(36).substr(2, 9);
      };

module.exports = helper;

