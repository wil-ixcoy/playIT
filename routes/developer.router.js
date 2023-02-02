const express = require("express");
const validatorHandler = require("../middlewares/validator.handler");

const DeveloperService = require("../services/developer.service");

const devService = new DeveloperService();

const {
  createDeveloperSchema,
  updateDeveloperProfileSchema,
  getDeveloperSchema,
  updateDeveloperSchema,
} = require("../schemas/developer.schema");

const router = express.Router();

router.post(
  "/developer/create",
  validatorHandler(createDeveloperSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;

      const newDev = await devService.create(data);
      res.json(newDev);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/developer/updateProfile",
  validatorHandler(updateDeveloperProfileSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;

      const newDev = await devService.updateDevProfile(data);
      res.json(newDev);
    } catch (e) {
      next(e);
    }
  }
);
router.get("/", async (req, res, next) => {
  try {
    const newDev = await devService.findAll();
    res.json(newDev);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/developer/:id",
  validatorHandler(getDeveloperSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const getDev = await devService.findOne(id);
      res.json(getDev);
    } catch (e) {
      next(e);
    }
  }
);
router.patch(
  "/developer/update/:id",
  validatorHandler(getDeveloperSchema, "params"),
  validatorHandler(updateDeveloperSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const dev = await devService.update(id, data);
      res.json(dev);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
