const joi = require("joi");

let id = joi.number().integer();
let categoryId = joi.number().integer();
let name = joi.string().min(3).max(30);
let description = joi.string().min(25).max(140);


const createSubCategorySchema = joi.object({
  name: name,
  description: description,
  categoryId: categoryId,
});

const getSubCategorySchema = joi.object({
  id: id.required(),
});

const updateSubCategorySchema = joi.object({
  name: name,
  description: description,
  categoryId: categoryId,

});

module.exports = {
  createSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
};
