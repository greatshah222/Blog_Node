// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = this.statusCode || 500;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, CustomError);
  }
}

module.exports = CustomError;
