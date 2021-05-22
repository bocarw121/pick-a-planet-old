const { db } = require("../services/database");
const { verifyPassword, setPassword } = require("../services/security");
const reset = require("../utils/reset");
const capitalize = require("../utils/functions");

const checkIfUserExists = (email, result) => {
  db.query("SELECT email FROM users WHERE email = ?", [email], (error, res) => {
    if (error) {
      return result({ db: error }, null);
    }

    if (res.length > 0) {
      return result({ db: null }, { id: res.length }, null);
    }
    return result({ db: null }, { id: null }, { newUser: true });
  });
};

const addUser = async (user, result) => {
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

const getUser = (email, password, result) => {
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, res) => {
      if (error) {
        // send error message
        result(error, null, null);
      }

     
      else if (res.length == 0 || !(await verifyPassword(res, password))) {
        result(null, { invalidInfo: true }, null);
      } // successful login
      else {
        const id = res[0].id;
        result(null, null, id);
      }
    }
  );
};

const getUserById = (decoded, result) => {
  db.query("SELECT * FROM users WHERE id = ?", [decoded.id], (error, res) => {
    if (error) {
      throw new Error("Error in the Database", error.message);
    }
    if (!res) {
      return;
    }

    result(res[0]);
  });
};

const updateUserEmail = (email, decoded, result) => {
  db.query(
    "UPDATE users SET email = ? WHERE id = ?",
    [email, decoded.id],
    (error, res) => {
      if (error) {
        return result(error, null);
      } else {
        return result(null, res.affectedRows);
      }
    }
  );
};

const validateUserPassword = (password, decoded, result) => {
  db.query(
    "SELECT * FROM users WHERE id = ?",
    [decoded.id],
    async (error, res) => {
      if (error) {
        return result(error, { validated: null });
      }

      if (!(await verifyPassword(res, password))) {
        return result(null, { validated: false });
      }
  
      return result(null, { validated: true });
    }
  );
};

const updateUserPasswordById = async (password, decoded, result) => {
  let encryptedPassword = await setPassword(password);
  db.query(
    "UPDATE `users` SET `password` = ? WHERE users.id = ?",
    [encryptedPassword, decoded.id],
    (error, res) => {
      if (error) {
      
        return result({ error }, null);
      } else {
        return result(null, res);
      }
    }
  );
};

const updateUserPasswordByEmail = async (email, result) => {
  // randomly generate password
  const update = reset();
  let encryptedPassword = await setPassword(update);
  db.query(
    "UPDATE users SET password = ? WHERE email = ?",
    [encryptedPassword, email],
    (error, res) => {
      if (error) {
        return result(error, null);
      }
      result(null, { reset: res.affectedRows, update });
    }
  );
};

module.exports = {
  addUser,
  checkIfUserExists,
  getUser,
  getUserById,
  updateUserEmail,
  validateUserPassword,
  updateUserPasswordById,
  updateUserPasswordByEmail,
};
