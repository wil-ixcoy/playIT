const { ValidationError } = require("sequelize");

const logErrors = (error, req, res, next) => {
  console.log(error);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    error: {
      message: error.message,
    },
    stack: error.stack,
  });
  next(error);
};

const boomErrorHandler = (error, req, res, next) => {
  if (error.isBoom) {
    const out = error;
    res.status(out.output.statusCode).json({
      error: {
        message: out.message,
        statusCode: out.output.statusCode,
        stack: out.stack,
      },
    });
    next(error);
  }
};

const ormErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    res.status(409).json({
      message: error.errors[0].message,
    });
  }
  next(error);
};

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
};
