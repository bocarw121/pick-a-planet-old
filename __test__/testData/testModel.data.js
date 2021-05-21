const { db } = require("../../services/database");
const { setPassword } = require("../../services/security");
const capitalize = require("../../utils/functions");

const addTestUser = async (user, result) => {
  const { firstName, lastName, email, password } = user;
  const newUser = {
    firstName: capitalize(firstName),
    lastName,
    email,
    password: await setPassword(password),
  };

  db.query("INSERT INTO users SET ?", newUser, (error, res) => {
    if (error) {
      result(error, null);
      return;
    }
    result(null, { id: res.insertId });
  });
};

module.exports = {
  addTestUser,
};
