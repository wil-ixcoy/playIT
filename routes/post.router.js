const express = require("express");
const fs = require("fs-extra");
const PostService = require("../services/post.service");
const FirebaseService = require("../services/firebase.service");
const {
  createPostSchema,
  getPostSchema,
  updatePostSchema,
} = require("../schemas/post.schema");
const {
  uploadImageHandler,
  helperImage,
} = require("../middlewares/image.handler");
const validatorHandler = require("../middlewares/validator.handler");

const service = new PostService();
const firebaseService = new FirebaseService();
const router = express.Router();

router.post(
  "/post/create",
  validatorHandler(createPostSchema, "body"),
  uploadImageHandler.single("file"),
  async (req, res, next) => {
    try {
      let randomName = Math.random().toString(36).substring(7);

      const imageResize = await helperImage(req.file.path, randomName, 1080, 1080);
      const url = await firebaseService.uploadImagePost(randomName,imageResize);

      const data = {
        userId:req.body.userId,
        content: req.body.content,
        photo: url,
      };
  
      await fs.unlink(req.file.path);
      await fs.unlink(imageResize.path);
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
