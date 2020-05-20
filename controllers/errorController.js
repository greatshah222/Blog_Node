const sendErrorDev = (err, req, res) => {
  if (err.isOperatinal) {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      stack: err.stack,
      message: err.message,
    });
  }
};
// anything passed in the next means error and will go to error middleware directly
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  sendErrorDev(err, req, res);
};
