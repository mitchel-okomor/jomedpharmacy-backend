const passport = require("./passport");

const auth ={
  //register a user
register:  (req, res, next) => {
  passport.authenticate('register', {session:false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info);
      res.send(info);
    } else {
      res.send(info);
    }
  })(req, res, next);
},

//login user
login: (req, res, next) => {
  passport.authenticate('login', {session:false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("login No user: "+info);
      res.send(info);
    } else {
  res.send({info, user});
    }
  })(req, res, next);
},

  //register a customer
  registerCustomer:  (req, res, next) => {
    passport.authenticate('registercustomer', {session:false}, function (err, customer, info) {
      if (err) {
        return next(err);
      }
      if (!customer) {
        console.log(info);
        res.send(info);
      } else {
        res.send(info);
      }
    })(req, res, next);
  },

//login customer
logincustomer: (req, res, next) => {
  passport.authenticate('logincustomer', {session:false}, function (err, customer, info) {
    if (err) {
      return next(err);
    }
    if (!customer) {
      console.log(customer);
      console.log("login No customer: "+info);
      res.send(info);
    } else {
  res.send({info, customer});
    }
  })(req, res, next);
},

jwt: (req, res, next) => {
  passport.authenticate('jwt',{session:false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.send(info);
    } else {
      next();
    }
  })(req, res, next);
}
};
module.exports = auth;
