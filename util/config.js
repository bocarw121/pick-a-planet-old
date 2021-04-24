// loading .env file content into processenv

module.exports = {
  environments: process.env.NODE_ENV,
  database: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
  JWT: {
    JWT_PRIVATE: process.env.JWT_PRIVATE,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES: process.env.JWT_COOKIE_EXPIRES,
  },
  port: process.env.PORT,
  nodemailerKey: process.env.NODEMAILER_KEY,
};
