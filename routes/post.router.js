const express = require("express");
const PostService = require("../services/post.service");
const {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
} = require("../schemas/post.schema");
const validatorHandler = require("../middlewares/validator.handler");

const service = new PostService();
const router = express.Router();

router.post(
  "/post/create",
  validatorHandler(createPostSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newPost = await service.create(data);
      res.json(newPost);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/post/:id",
  validatorHandler(getPostSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const getPost = await service.findOne(id);
      res.json(getPost);
    } catch (e) {
      next(e);
    }
  }
);
router.get("/", async (req, res, next) => {
  try {
    const allPosts = await service.findAll();
    res.json(allPosts);
  } catch (e) {
    next(e);
  }
});
router.delete(
  "/post/delete/:id",
  validatorHandler(getPostSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deletePost = await service.delete(id);
      res.json(deletePost);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
