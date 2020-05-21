const CustomError = require('./../utilis/customError');

const sendErrorDev = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      stack: err.stack,
      message: err.message,
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: 'something went wrong',
    });
  }
};
// anything passed in the next means error and will go to error middleware directly
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  sendErrorDev(err, req, res);
};
