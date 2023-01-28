const joi = require("joi");
const { password } = require("pg/lib/defaults");

let id = joi.number().integer();
let name = joi.string().min(3).max(30);
let last_name = joi.string().min(3).max(30);
let username = joi.string().min(3).max(20);
let email = joi.string().email();
let password = joi.string().min(8).max(30);
let photo = joi.string();
let country = joi.string();

const createUserSchema = joi.object({
  name: name.required(),
  last_name: last_name.required(),
  username: username.required(),
  email: email.required(),
  password: password.required(),
});

const getUserSchema = joi.object({
  id: id.required(),
});

const updateUserSchema = joi.object({
  name: name,
  last_name: last_name,
  username:username,
  photo: photo,
  country: country,
});

module.exports = {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
};
