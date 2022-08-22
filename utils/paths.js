const path = require('path');

const views = [
  path.join(__dirname, '../views'),
  path.join(__dirname, '../views/planets'),
  path.join(__dirname, '../views/members-area'),
];

const mainDirectory = path.join(__dirname, '../');

module.exports = {
  views,
  mainDirectory,
};
