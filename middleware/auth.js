const passport = require("./passport");

const auth ={
register:  (req, res, next) => {
  passport.authenticate('register', function (err, user, info) {
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

login: (req, res, next) => {
  passport.authenticate('login', function (err, user, info) {
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
jwt: (req, res, next) => {
  passport.authenticate('jwt', function (err, user, info) {
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
}
};
module.exports = auth;
