const { ExtractJwt, Strategy } = require('passport-jwt');
const User = require('../model/user.js');
const GeneralInfo = require("../model/generalInfo")
module.exports = function(passport){
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWTPRIVATEKEY;
passport.use(new Strategy(opts, async function(jwt_payload, done){
  
try {
    let users = await GeneralInfo.findByPk(jwt_payload.id, { password: 0 });
   
    if(users) {
        return done(null, users);
    }else{
      return done(null, false);
    }
  } catch (error) {
    return done(null, false);
  }
}));


return passport
}