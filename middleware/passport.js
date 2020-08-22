const bcrypt = require ('bcrypt-nodejs');
const jwt = require ('jsonwebtoken');
const User = require('../models/user');
const Customer = require('../models/customers');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
 const JWTstrategy = require('passport-jwt').Strategy,
  ExtractJWT = require('passport-jwt').ExtractJwt;
 require('dotenv').config();



  //register a user
passport.use('register', new LocalStrategy({usernameField:'email',
passwordField:'password',
passReqToCallback : true},
(req, username, password, done)=> {

   //hash password with bcrypt-nodejs
   let salt = bcrypt.genSaltSync(10);
   bcrypt.hash(req.body.password, salt, null, (error, hash) => {
        if (error) {
         console.log(error);
        }
      
    //get all user information, password has already been declared in function parameters and will be hashed below
    const fName = req.body.fName.trim();
    const lName = req.body.lName.trim();
    const number = req.body.number.trim();
    const address = req.body.address.trim();
    const email = req.body.email.trim();
    let newPassword = hash;

//create new user
try{
  const newUser = new User(fName, lName, number, address, email, newPassword);
  newUser.addOne ((userId)=> {
    if (!userId) {
      return done(null, false, { message: 'user not registered' });
    }
    if (userId) {
      console.log("passport strategy "+userId);
      return done(null, userId, { message: 'user successfully created',
  data: userId});
    }
    return done(null, userId);
  });
}
catch(err){
if(err){
  throw err;
}
}

   });

  }
)
);

//login a user
passport.use('login', new LocalStrategy({usernameField:'email',
passwordField:'password',
passReqToCallback : true},
  function(req, username, password, done) {
    console.log("Strategy "+username);
      const userObj = new User();
    userObj.getOne(username, function (user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
     else{
       //compare user imputed password with database password
        bcrypt.compare (password, user.password,  (error, valid) => {
          if(error){console.log(error);}
         else if (!password ||!valid) {
            return done(null, false, { message: 'Incorrect username or password' });
          }
        else{ 
          const token = jwt.sign ({
            userId: user.id,
          },
        'JWT_KEY',
          {expiresIn: '24h'}
        );

            console.log("passport strategy "+user.firstname);
        return done(null, user, { message: 'logged in', user, token }); 
        }
        });
      }
    });
  }
)
);


  //register a customer
  passport.use('registercustomer', new LocalStrategy({usernameField:'email',
  passwordField:'password',
  passReqToCallback : true},
  (req, username, password, done)=> {
  
     //hash password with bcrypt-nodejs
     let salt = bcrypt.genSaltSync(10);
     bcrypt.hash(req.body.password, salt, null, (error, hash) => {
          if (error) {
           console.log(error);
          }
        
      //get all customer information, password has already been declared in function parameters and will be hashed below
      const name = req.body.fName.trim() + " " +req.body.lName.trim();
      const number = req.body.number.trim();
      const address = req.body.address.trim();
      const email = req.body.email.trim();
      let newPassword = hash;
  
  //create new customer
  try{
    const newCustomer = new Customer(name, number, address, email, newPassword);
    
          //add to database
    newCustomer.addOne ((customerId)=> {
      if (!customerId) {
        return done(null, false, { message: 'Customer not registered' });
      }
      if (customerId) {
        console.log("passport strategy "+customerId);
        return done(null, customerId, { message: 'user successfully created',
    data: customerId});
      }
      return done(null, customerId);
    });
  }
  catch(err){
  if(err){
    throw err;
  }
  }
  
     });
  
    }
  )
  );

//login a customer
passport.use('logincustomer', new LocalStrategy({usernameField:'email',
passwordField:'password',
passReqToCallback : true},
  function(req, username, password, done) {
      const customerObj = new Customer();
      
      //search database for user
    customerObj.getByEmail(username, function (customer) {
      if (!customer) {
        return done(null, false, { message: 'Incorrect username or password' });
      }
     else{
       //compare user imputed password with database password
        bcrypt.compare (password, customer.password,  (error, valid) => {
          if(error){console.log(error);}
         else if (!password ||!valid) {
            return done(null, false, { message: 'Incorrect username or password' });
          }
        else{ 
          const token = jwt.sign ({
            userId: customer.customer_id,
          },
        'JWT_KEY',
          {expiresIn: '6h'}
        );
        return done(null, customer, { message: 'success', token }); 
        }
        });
      }
    });
  }
)
);



//verify a user token
const opts ={jwtFromRequest: ExtractJWT.fromHeader('authorization'),
secretOrKey: 'JWT_KEY'
};
passport.use('jwt',  new JWTstrategy(opts, (jwt_payload, done)=>{
  try {
    console.log("JWT passport: "+jwt_payload.userId);
    //Pass the user details to the next middleware
    return done(null, jwt_payload.userId);
  } catch (error) {
    done(error,false);
  }
} 
)
);
module.exports = passport;