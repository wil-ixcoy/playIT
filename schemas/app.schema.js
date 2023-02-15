const joi = require("joi");

let id = joi.number().integer();
/* campos requeridos al crear la cuenta */
let developerId = joi.number().integer();
let categoryId = joi.number().integer();
let subcategoryId = joi.number().integer();
let name = joi.string().min(3).max(30);
let developer_name = joi.string();
let developer_username = joi.string();
let language = joi.string();
let description = joi.string().min(40).max(800);
let platform = joi.string();
let price = joi.number();
let is_free = joi.boolean();

/* no requeridos */

const createAppSchema = joi.object({
  name: name.required(),
  developer_name: developer_name.required(),
  developer_username: developer_username.required(),
  language: language.required(),
  description: description.required(),
  platform: platform.required(),
  developerId: developerId.required(),
  categoryId: categoryId.required(),
  subcategoryId: subcategoryId.required(),
});

const getAppSchema = joi.object({
  id: id.required(),
});

const updateAppSchema = joi.object({
  name: name,
  developer_name: developer_name,
  developer_username: developer_username,
  language: language,
  description: description,
  platform: platform,
  price: price,
  is_free: is_free,
  developerId: developerId,
  categoryId: categoryId,
  subcategoryId: subcategoryId,
});

module.exports = {
  createAppSchema,
  getAppSchema,
  updateAppSchema,
};
