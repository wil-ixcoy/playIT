const joi = require("joi");

let id = joi.number().integer();
let user_id = joi.number().integer();
let post_id = joi.number().integer();
let content = joi.string().max(140);

const createComentarySchema = joi.object({
  content: content.required(),
  user_id: user_id.required(),
  post_id: post_id.required(),
});

const getComentarySchema = joi.object({
  id: id.required(),
});

const updateComentarySchema = joi.object({
  content: content,
});

module.exports = {
  createComentarySchema,
  getComentarySchema,
  updateComentarySchema,
};
