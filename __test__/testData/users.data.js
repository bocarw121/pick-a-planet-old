const firstTestUser = {
  firstName: "firstuser",
  lastName: "first",
  email: "firstuser@testuser.ca",
  password: "123456",
  passwordConfirm: "123456",
};

const secondTestUser = {
  firstName: "seconduser",
  lastName: "second",
  email: "seconduser@testuser.ca",
  password: "123456",
  passwordConfirm: "123456",
};

const profileTestUser = {
  firstName: "profileuser",
  lastName: "profile",
  email: "profileuser@testuser.ca",
  password: "123456",
  passwordConfirm: "123456",
};

const registerTestUser = {
  firstName: "registeruser",
  lastName: "register1",
  email: "registeruser@testuser.ca",
  password: "123456",
  passwordConfirm: "123456",
};

const registerTestUser2 = {
  firstName: "registeruser2",
  lastName: "register2",
  email: "registeruser2@testuser.ca",
  password: "123456",
  passwordConfirm: "123456",
};

const passwordNotMatch = {
  firstName: "newUser",
  lastName: "nomatch",
  email: "registerNewUser@testuser.ca",
  password: "123456",
  passwordConfirm: "1234567",
};

const invalidLogin = {
  email: "invaliduser@testuser.ca",
  password: "1234567",
};

const firstUserLogin = {
  email: "firstuser@testuser.ca",
  password: "123456",
};

const profileTestUserPassword = {
  update: {
    currentPassword: "123456",
    password: "1234567",
    passwordConfirm: "1234567",
  },
};

const profileTestUserEmail = {
  update: {
    email: "testuser123@testuser.ca",
    emailConfirm: "testuser123@testuser.ca",
  },
};

module.exports = {
  firstTestUser,
  secondTestUser,
  profileTestUser,
  registerTestUser,
  registerTestUser2,
  passwordNotMatch,
  firstUserLogin,
  invalidLogin,
  profileTestUserEmail,
  profileTestUserPassword,
};
