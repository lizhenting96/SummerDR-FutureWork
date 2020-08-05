const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db")
// middleware
app.use(cors());
app.use(express.json());

// routes
app.get("/select", async (req, res) => {
   try {
      
      
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
         const results = await pool.query(queryStr)
         res.json(results.rows)
      // console.log(JSON.stringify(results))
      }
      
   } catch (err) {
      console.error(err.message)
   }
})

app.get("/columns", async (req, res) => {
   try {
      var tablename = req.query.tablename
      if (typeof tablename == 'undefined' || tablename == '') {
         // tablename = "sonarqube_count_combined_issues_uni"
         res.json([])
      }
      else {
         // console.log(`tablename in column is ${tablename}`)
         const results = await pool.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' and table_name='${tablename}';`)
         // console.log(results.rows)
         res.json(results.rows)
      }

   } catch (err) {
      console.error(err.message)
   }
})

app.get("/tables", async (req, res) => {
   try {
      const results = await pool.query(`SELECT tablename FROM pg_tables WHERE schemaname='public'`)
      res.json(results.rows)
   } catch (err) {
      console.error(err.message)
   }
})

app.listen(5000, () => {
   console.log("server is listening on port 5000");
});