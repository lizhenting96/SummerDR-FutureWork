const {Pool} = require("pg")
const tablePool = new Pool({
   user: "postgres",
   password: "password",
   host: "localhost",
   port: 5432,
   database: "SummerDR"
})

const userPool = new Pool({
   user: "postgres",
   password: "password",
   host: "localhost",
   port: 5432,
   database: "NodeLogin"
})

module.exports = { tablePool, userPool };