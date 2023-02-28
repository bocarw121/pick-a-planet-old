const { prisma } = require('../../db/prisma');
const { setPassword } = require('../../services/security');
const capitalize = require('../../utils/functions');

// Db calls for tests
const addTestUser = async (user, result) => {
  const { firstName, lastName, email, password } = user;
  const newUser = {
    firstName: capitalize(firstName),
    lastName,
    email,
    password: await setPassword(password),
  };

  const create = await prisma.users.create({
    data: {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      password: newUser.password,
    },
  });

  result(null, create);
};

module.exports = {
  addTestUser,
};
