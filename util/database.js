const mySql = require("mysql");
const { database } = require("../util/config");

const db = mySql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database,
});

const connectDatabase = () => {
  db.connect((error) => {
    if (error) {
      throw error;
    } else {
      console.log("Connected to the database");
    }
  });
};

module.exports = {
  db,
  connectDatabase,
};
