const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const Users = require("./user");

// Setup work and export for the JWT passport strategy
var opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret key",
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, callback) => {

    const user_id = jwt_payload._id;
    Users.findById(user_id, (err, results) => {
      if (err) {
        return callback(err, false);
      }
      if (results) {
        callback(null, results);
      } else {
        callback(null, false);
      }
    });
  })
);

exports.checkAuth = passport.authenticate("jwt", { session: false });
