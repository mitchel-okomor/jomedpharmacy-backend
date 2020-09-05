const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();



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



helper.sendmail = (email, text, html)=>{

    console.log("Inside Node Mailer");
  
  
    //create transport
  
     let transporter = nodemailer.createTransport({
       service: "Gmail",
       auth: {
         user: "jomedpharmacy@gmail.com",
         pass: "08074460432"
       },
       tls:{
         rejectUnauthorized: false,
       } 
     });
     
  
  const message ={
    from: "jomedpharmacy@gmail.com",
    to: email,
    subject: "Testing mail",
    text: text,
    html:html
  };
  
   transporter.sendMail(message, (error, response)=>{
    if(error){
      console.log(error);
      console.log("mail sent");
     
    }
    else{
      console.log("mail sent");
     return response;
    }
  });
   
  return transporter;
    };


  helper.verifyToken = (token, callback) => {
  
      try {
        const decodedToken = jwt.verify(token, 'shhhhh');
        const userId = decodedToken.customer;
        console.log(userId);
        jwt.verify(token, 'shhhhh', function(err, decoded) {
          if(err){
            callback(err);
          }
            console.log("jwt verify: "+decoded); // bar
    
   callback(null,decoded, userId);
          });
           
    
       
      }catch(err){
    console.log("catch block: "+ err);
    callback(err, null);

      }
      
    };

module.exports = helper;

