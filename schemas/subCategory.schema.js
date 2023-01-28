const joi = require("joi");
const { password } = require("pg/lib/defaults");

let id = joi.number().integer();
let category_id = joi.number.integer();
let name = joi.string().min(3).max(30);
let description = joi.string().min(25).max(140);
let cover = joi.string();

const createSubCategorySchema = joi.object({
  name: name.required(),
  description: description.required(),
  cover: cover.required(),
  category_id: category_id.required(),
});

const getSubCategorySchema = joi.object({
  id: id.required(),
});

const updateSubCategorySchema = joi.object({
  name: name,
  description: description,
  cover: cover,
  category_id: category_id,

});

module.exports = {
  createSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
};
