const express = require("express");
const fs = require("fs-extra");
const CategoryService = require("../services/category.service");
const FirebaseService = require("../services/firebase.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  uploadImageHandler,
  helperImage,
} = require("../middlewares/image.handler");

const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require("../schemas/category.schema");

const router = express.Router();
const service = new CategoryService();
const firebaseService = new FirebaseService();

router.post(
  "/category/create",
  validatorHandler(createCategorySchema, "body"),
  uploadImageHandler.single("file"),
  async (req, res, next) => {

    const imageResize = await helperImage(req.file.path, `${req.body.name}`, 100, 100);

    const url = await firebaseService.uploadCoverCategory(req.body.name, imageResize);

    const data = {
      name: req.body.name,
      description: req.body.description,
      cover_photo: url,
    };
    await fs.unlink(req.file.path);
    await fs.unlink(imageResize.path);
    const category = await service.create(data);
    res.json(category);
    try {
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const allCategories = await service.findAll();
    res.json(allCategories);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/category/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const getCategory = await service.findOne(id);
      res.json(getCategory);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/category/update/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.body.params;
      const data = req.body.body;
      const updateCategory = await service.update(id, data);
      res.json(updateCategory);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/category/delete/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.body.params;
      const deleteCategory = await service.delete(id);
      res.json(deleteCategory);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
