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
      res.status(501).send(info);
    } else {
      res.status(500).send(info);
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
      res.status(401).send(info);
    } else {
      res.status(200).send({info, user});
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
        res.status(501).send(info);
      } else {
        res.status(200).send(info);
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
      console.log("login No customer: "+info);
      res.status(401).send(info);
    } else {
  res.status(200).send({info, customer});
    }
  })(req, res, next);
},


//verify token in header
jwt: (req, res, next) => {
  passport.authenticate('jwt',{session:false}, function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      res.status(401).send(info);
    } else {
      next();
    }
  })(req, res, next);
}
};
module.exports = auth;
