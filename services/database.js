const mySql = require('mysql');

const {
  DATABASE,
  TEST_DATABASE,
  DEV_DATABASE,
  NODE_ENV,
} = require('../utils/config');

let config = {};

if (NODE_ENV === 'production') {
  config = {
    ...DATABASE,
  };
}
if (NODE_ENV === 'development') {
  config = {
    ...DEV_DATABASE,
  };
}

if (NODE_ENV === 'test') {
  config = {
    ...TEST_DATABASE,
  };
}

const db = mySql.createConnection(config);

const connectDatabase = () => {
  db.connect((error) => {
    if (error) {
      throw error;
    } else {
      console.log('Connected to the database');
    }
  });
};

const disconnectDatabase = () => {
  db.end((error) => {
    if (error) {
      console.log(error.message);
    }
  });
};

module.exports = {
  db,
  connectDatabase,
  disconnectDatabase,
};
