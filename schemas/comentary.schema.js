const joi = require("joi");

let id = joi.number().integer();
let userId = joi.number().integer();
let postId = joi.number().integer();
let content = joi.string().max(140);

const createComentarySchema = joi.object({
  content: content.required(),
  userId: userId.required(),
  postId: postId.required(),
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
