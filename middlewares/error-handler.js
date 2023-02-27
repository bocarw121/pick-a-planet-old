const { CustomApiError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, _req, res) => {
  if (err instanceof CustomApiError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, status: err.statusCode });
  }

  return res.status(500).json({
    message: 'Something went wrong, please try again later',
    status: 500,
  });
};

module.exports = errorHandlerMiddleware;
