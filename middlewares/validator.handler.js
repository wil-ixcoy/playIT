const boom = require("@hapi/boom");

const validatorHandler = (schema, property) => {
  return (req, res, next) => {
    const propiedad = req[property];
    const { error } = schema.validate(propiedad, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error.details[0].message));
    } else {
      next();
    }
  };
};

module.exports = validatorHandler;
