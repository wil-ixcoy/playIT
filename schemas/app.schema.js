const joi = require("joi");

let id = joi.number().integer();
/* campos requeridos al crear la cuenta */
let developer_id = joi.number().integer();
let category_id = joi.number().integer();
let subcategory_id = joi.number().integer();
let name = joi.string().min(3).max(30);
let dev_name = joi.string();
let dev_username = joi.string();
let language = joi.string();
let description = joi.string(40).max(800);
let platform = joi.string();
let price = joi.number();
let is_free = joi.boolean();

/* no requeridos */

const createAppSchema = joi.object({
  name: name.required(),
  dev_name: dev_name.required(),
  dev_username: dev_username.required(),
  language: language.required(),
  description: description.required(),
  platform: platform.required(),
  price: price.required(),
  is_free: is_free.required(),
  developer_id: developer_id.required(),
  category_id: category_id.required(),
  subcategory_id: subcategory_id.required(),
});

const getAppSchema = joi.object({
  id: id.required(),
});

const updateAppSchema = joi.object({
  name: name,
  dev_name: dev_name,
  dev_username: dev_username,
  language: language,
  description: description,
  platform: platform,
  price: price,
  is_free: is_free,
  developer_id: developer_id,
  category_id: category_id,
  subcategory_id: subcategory_id,
});

module.exports = {
  createAppSchema,
  getAppSchema,
  updateAppSchema,
};
