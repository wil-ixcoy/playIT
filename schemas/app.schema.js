const joi = require("joi");

let id = joi.number().integer();
/* campos requeridos al crear la cuenta */
let devId = joi.number().integer();
let categoryId = joi.number().integer();
let subcategoryId = joi.number().integer();
let title = joi.string().min(3).max(30);
let devName = joi.string();
let devUsername = joi.string();
let language = joi.string();
let description = joi.string().min(40).max(800);
let platform = joi.string();
let price = joi.number();
let is_free = joi.boolean();

/* no requeridos */

const createAppSchema = joi.object({
  title: title.required(),
  devName: devName.required(),
  devUsername: devUsername.required(),
  language: language.required(),
  description: description.required(),
  platform: platform.required(),
  devId: devId.required(),
  categoryId: categoryId.required(),
  subcategoryId: subcategoryId.required(),
});

const getAppSchema = joi.object({
  id: id.required(),
});

const updateAppSchema = joi.object({
  title:title,
  devName: devName,
  devUsername: devUsername,
  language: language,
  description: description,
  platform: platform,
  price: price,
  is_free: is_free,
  devId: devId,
  categoryId: categoryId,
  subcategoryId: subcategoryId,
});

module.exports = {
  createAppSchema,
  getAppSchema,
  updateAppSchema,
};
