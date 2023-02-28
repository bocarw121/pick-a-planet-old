const { promisify } = require('util');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { JWT } = require('../utils/config');

const { JWT_COOKIE_EXPIRES, JWT_EXPIRES_IN, JWT_PRIVATE } = JWT;

const setCookie = (id) => {
  // create unique tokens for user
  const token = jwt.sign({ id: id }, JWT_PRIVATE, {
    expiresIn: JWT_EXPIRES_IN,
  });
  const cookieSettings = {
    expires: new Date(Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  // Set cookie up in browser
  return { cookie: 'userId', token, cookieSettings };
};

const verifyToken = async (req) => {
  return await promisify(jwt.verify)(req.cookies.userId, JWT_PRIVATE);
};

const removeCookie = (res) => {
  res.cookie('userId', '', {
    expires: new Date(Date.now() + 2 * 1000),
    httpOnly: true,
  });
};

const setPassword = async (password) => {
  let encryptedPassword = await argon2.hash(password);
  return encryptedPassword;
};

const verifyPassword = async (user, password) => {
  const verified = await argon2.verify(user.password, password);
  return verified;
};

module.exports = {
  setCookie,
  removeCookie,
  verifyToken,
  setPassword,
  verifyPassword,
};
