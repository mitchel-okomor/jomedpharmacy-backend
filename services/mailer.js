const nodemailer = require("nodemailer");

const sendmail = (email, text, html)=>{

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

    export default sendmail;