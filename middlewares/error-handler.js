const { CustomApiError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  const path = req.originalUrl.split('/')[1];

  // TODO comeback to this
  if (path.includes('logout')) {
    return res.redirect('/');
  }

  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode)
      .render(path, { message: err.message, status: err.statusCode });
  }

  return res.status(500).render(path, {
    message: 'Something went wrong, please try again later',
    status: 500,
  });
};

module.exports = errorHandlerMiddleware;
