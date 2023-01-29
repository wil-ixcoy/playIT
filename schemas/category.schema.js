const joi = require("joi");

let id = joi.number().integer();
let name = joi.string().min(3).max(30);
let description = joi.string().min(25).max(140);


const createCategorySchema = joi.object({
  name: name.required(),
  description: description.required(),
});

const getCategorySchema = joi.object({
  id: id.required(),
});

const updateCategorySchema = joi.object({
  name: name,
  description: description,
});

module.exports = {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
};
