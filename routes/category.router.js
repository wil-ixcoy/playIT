const express = require("express");
const CategoryService = require("../services/category.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} = require("../schemas/category.schema");

const router = express.Router();
const service = new CategoryService();

router.post(
  "/category/create",
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    const data = req.body;
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
      const { id } = req.params;
      const data = req.body;
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
      const { id } = req.params;
      const deleteCategory = await service.delete(id);
      res.json(deleteCategory);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
