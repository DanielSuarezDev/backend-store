function logErrors (err, req, res, next) {
  next(err)
}

function errorHandler(err, req, res) {
  res.status(500).json({
    message: err,
    stack: err.stack
  })
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output: { statusCode, payload } } = err;
    res.status(statusCode).json(payload);
    return
  }
  next(err);
}



module.exports = {logErrors, errorHandler, boomErrorHandler}
