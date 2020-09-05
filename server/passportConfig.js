const LocalStrategy = require("passport-local").Strategy;
const { userPool } = require("./db");
const bcrypt = require("bcrypt");

function initialize(passport) {
   const authenticateUser = async (email, password, done) => {
      // console.log('email: ', email);
      // console.log('password: ', password);
      const results = (await userPool.query(`SELECT * FROM users WHERE email = $1`, [email])).rows
      if (results.length > 0) {
         const user = results[0];
         bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
               throw err;
            }
            if (isMatch) {
               return done(null, user);
            }
            else {
               return done(null, false, {message: "Password is not correct"});
            }
         })
      }
      else {
         return done(null, false, {message: "Email not registered"});
      }
   }

   passport.use(new LocalStrategy({
      usernameField: "email",
      passwordField: "password"
   }, authenticateUser));

   passport.serializeUser((user, done) => done(null, user.id));

   passport.deserializeUser((id, done) => {
      userPool.query(`SELECT * FROM users, WHERE id = $1`, [id], (err, results) => {
         if (err) {
            throw err;
         }
         return done(null, results.rows[0]);
      })
   })
}

module.exports = initialize;