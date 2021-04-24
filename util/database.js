const mySql = require("mysql");
const { database } = require("../util/config");

const db = mySql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database,
});

module.exports = db;



