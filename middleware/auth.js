const passport = require("./passport");

const auth ={
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
