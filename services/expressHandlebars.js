const path = require('path');
const hbs = require('express-handlebars');

const config = {
  extname: 'hbs',
  defaultLayout: false,
  layoutsDir: path.join(__dirname, '../views'),
  partialsDir: path.join(__dirname, '../views/partials'),
};

const hbsConfig = hbs(config);

module.exports = {
  hbsConfig,
};
