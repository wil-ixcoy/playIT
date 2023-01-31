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
  "/create",
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
  "/updateProfile",
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

module.exports = router;
