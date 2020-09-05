const express = require("express");
const app = express();
const cors = require("cors");
const { tablePool, userPool } = require("./db");
const bcrypt = require("bcrypt");
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const initializePassport = require('./passportConfig')

initializePassport(passport)

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(session({
   secret: 'secret',
   resave: false,
   saveUninitialized: false
}));
app.use(flash())
app.use(passport.initialize());
app.use(passport.session());


// sign-up and log-in routes
app.post("/sign-up", async (req, res) => {
   try {
      // if (req.isAuthenticated()) {
      //    console.log("sign up authed")
      // }
      let { firstName, lastName, email, password, password2 } = req.body;
      // console.log({ firstName, lastName, email, password, password2});

      let messages = {success: false}
      // form validation on server side
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
         messages.email = 'Invalid Email'
      }
      if (password !== password2) {
         messages.password2 = 'Password Not Match'
      }
      if (password.length < 8) {
         messages.password = 'Password should be at least 6 digits'
      }
      else if (!password.match(/([a-z])+/)) {
         messages.password = 'Password should contain at least one lowercase letter'
      }
      else if (!password.match(/([A-Z])+/)) {
         messages.password = 'Password should contain at least one uppercase letter'
      }

      if (Object.keys(messages).length > 1) {
         res.json(messages)
      }
      else {
         let hashedPassword = await bcrypt.hash(password, 10);
         const results = (await userPool.query(`SELECT * FROM users WHERE email = $1`, [email])).rows
         if (results.length > 0) { 
            messages.email = 'Email already registered'
            res.json(messages)
         }
         else {
            userPool.query(
               `INSERT INTO users (firstname, lastname, email, password)
               VALUES ($1, $2, $3, $4)`,
               [firstName, lastName, email, hashedPassword]
            )
            messages.success = true
            res.json(messages)
         }
      }
   
   } catch (err) {
      console.error(err.message)
   }
})

app.post("/log-in",
   function (req, res, next){
      // if (req.isAuthenticated()) {
      //    console.log("before log in authed")
      // }
      // before auth
      // console.log('req.body:', req.body);
      next()
   } ,
   passport.authenticate('local', {
      failureFlash: true
   }),
   (req, res) => {
      // after auth
      // if (req.isAuthenticated()) {
      //    console.log("after log in authed!")
      // }
      res.json({success: true})
   })

app.get("/log-out", (req, res) => {
   req.logOut()
   let messages = {successLogOut: true};
   res.json(messages);
})

// other routes
app.get("/select", async (req, res) => {
   try {
      // if (req.isAuthenticated()) {
      //    console.log("select authed")
      // }
      const { filter, sort, take, skip } = req.query;
      var tablename = req.query.tablename
      // console.log(tablename)
      // console.log(filter)
      // console.log(sort);
      // console.log(take);
      // console.log(skip);
      // if (typeof sort != 'undefined') {
      //    console.log(JSON.parse(sort)[0]['selector'])
      // }
      if (typeof tablename == 'undefined' || tablename == '') {
         // tablename = "sonarqube_count_combined_issues_uni"
         res.json([])
      }
      else {
         // console.log(filter.length)
         // console.log(`tablename in select is ${tablename}`)
         var queryStr = `SELECT *, count(*) OVER() AS full_count FROM ${tablename}`
         if (filter.length > 0) queryStr += " WHERE " + filter

         if (typeof sort != 'undefined') queryStr += " ORDER BY " + JSON.parse(sort)[0]['selector'] + " " + (JSON.parse(sort)[0]['desc'] ? "DESC" : "ASC")
         queryStr += ` LIMIT ${take} OFFSET ${skip}`
         // console.log(queryStr)
         const results = await tablePool.query(queryStr)
         res.json(results.rows)
      // console.log(JSON.stringify(results))
      }
      
   } catch (err) {
      console.error(err.message)
   }
})

app.get("/columns", async (req, res) => {
   try {
      // if (req.isAuthenticated()) {
      //    console.log("col authed")
      // }
      var tablename = req.query.tablename
      if (typeof tablename == 'undefined' || tablename == '') {
         // tablename = "sonarqube_count_combined_issues_uni"
         res.json([])
      }
      else {
         // console.log(`tablename in column is ${tablename}`)
         const results = await tablePool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' and table_name='${tablename}';`)
         // console.log(results.rows)
         res.json(results.rows)
      }

   } catch (err) {
      console.error(err.message)
   }
})

app.get("/tables", async (req, res) => {
   try {
      const results = await tablePool.query(`SELECT tablename FROM pg_tables WHERE schemaname='public'`)
      res.json(results.rows)
   } catch (err) {
      console.error(err.message)
   }
})

// app.get("/auth", checkAuth, (req, res) => {
//    res.json({auth: false})
// })

// function checkAuth(req, res, next) {
//    if (req.isAuthenticated()) {
//       console.log("hi")
//       return res.json({auth: true})
//    }
//    next()
// }

app.listen(5000, () => {
   console.log("server is listening on port 5000");
});