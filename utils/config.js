const DATABASE = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
};

const TEST_DATABASE = {
  host: process.env.DATABASE_HOST_TEST,
  user: process.env.DATABASE_USER_TEST,
  password: process.env.DATABASE_PASSWORD_TEST,
  database: process.env.DATABASE_TEST,
};

const DEV_DATABASE = {
  host: process.env.DATABASE_HOST_DEV,
  user: process.env.DATABASE_USER_DEV,
  password: process.env.DATABASE_PASSWORD_DEV,
  database: process.env.DATABASE_DEV,
};

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE,
  TEST_DATABASE,
  DEV_DATABASE,
  JWT: {
    JWT_PRIVATE: process.env.JWT_PRIVATE,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    JWT_COOKIE_EXPIRES: process.env.JWT_COOKIE_EXPIRES,
  },
  ENV_PORT: process.env.PORT,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
};
