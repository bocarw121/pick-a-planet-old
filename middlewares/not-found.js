const { StatusCodes } = require('http-status-codes');

function notFound(req, res) {
  const path = req.originalUrl.split('/')[1];
  // TODO - add a 404 page
  res.redirect('/');
}

module.exports = notFound;
