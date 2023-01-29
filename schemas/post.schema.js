const joi = require("joi");

let id = joi.number().integer();
let user_id = joi.number().integer();
let content = joi.string().max(140);

const createPostSchema = joi.object({
  content: content.required(),
  user_id: user_id,
  user_id: user_id,
});

const getPostSchema = joi.object({
  id: id.required(),
});

const updatePostSchema = joi.object({
  content: content,
});

module.exports = {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
};
