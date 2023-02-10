const express = require("express");
const fs = require("fs-extra");
const CategoryService = require("../services/sub.category.service");
const validatorHandler = require("../middlewares/validator.handler");
const FirebaseService = require("../services/firebase.service");

const {
  createSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} = require("../schemas/sub.category.schema");

const {
  uploadImageHandler,
  helperImage,
} = require("../middlewares/image.handler");

const router = express.Router();
const service = new CategoryService();
const firebaseService = new FirebaseService();

router.post(
  "/sub-category/create",
  uploadImageHandler.single("file"),
  validatorHandler(createSubCategorySchema, "body"),
  async (req, res, next) => {
    const imageResize = await helperImage(
      req.file.path,
      `${req.body.name}`,
      300,
      300
    );

    const url = await firebaseService.uploadCoverSubCategory(
      req.body.name,
      imageResize
    );
    const data = {
      categoryId:req.body.categoryId,
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
    const allSubCategories = await service.findAll();
    res.json(allSubCategories);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/sub-category/:id",
  validatorHandler(getSubCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const getSubCategory = await service.findOne(id);
      res.json(getSubCategory);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/sub-category/update/:id",
  validatorHandler(getSubCategorySchema, "params"),
  validatorHandler(updateSubCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const updateSubCategory = await service.update(id, data);
      res.json(updateSubCategory);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/sub-category/delete/:id",
  validatorHandler(getSubCategorySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteSubCategory = await service.delete(id);
      res.json(deleteSubCategory);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
