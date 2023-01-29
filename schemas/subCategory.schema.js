const joi = require("joi");

let id = joi.number().integer();
let category_id = joi.number.integer();
let name = joi.string().min(3).max(30);
let description = joi.string().min(25).max(140);

const createSubCategorySchema = joi.object({
  name: name.required(),
  description: description.required(),
  category_id: category_id.required(),
});

const getSubCategorySchema = joi.object({
  id: id.required(),
});

const updateSubCategorySchema = joi.object({
  name: name,
  description: description,
  category_id: category_id,

});

module.exports = {
  createSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
};
