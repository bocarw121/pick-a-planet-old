const { db } = require("../../services/database");
const { addTestUser } = require("../testData/testModel.data");

global.loadUser = async (user) => {
  await addTestUser(user, (err, res) => {
    if (err) throw err;
  });
};

global.removeUser = (email) => {
  db.query(`DELETE FROM users WHERE email = '${email}'`, (err) => {
    if (err) throw err;
  });
};

