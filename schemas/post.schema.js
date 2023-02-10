const joi = require("joi");

let id = joi.number().integer();
let userId = joi.number().integer();
let content = joi.string().max(160);

const createPostSchema = joi.object({
  content: content,
  userId: userId,
});

const getPostSchema = joi.object({
  id: id,
});

const updatePostSchema = joi.object({
  content: content,
});

module.exports = {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
};
