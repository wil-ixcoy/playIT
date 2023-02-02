const express = require("express");
const CategoryService = require("../services/sub.category.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createSubCategorySchema,
  getSubCategorySchema,
  updateSubCategorySchema,
} = require("../schemas/sub.category.schema");

const router = express.Router();
const service = new CategoryService();

router.post(
  "/sub-category/create",
  validatorHandler(createSubCategorySchema, "body"),
  async (req, res, next) => {
    const data = req.body;
    const subCategory = await service.create(data);
    res.json(subCategory);
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
