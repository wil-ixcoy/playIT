const express = require("express");
const AppService = require("../services/app.service");
const validatorHandler = require("../middlewares/validator.handler");

const {
  createAppSchema,
  getAppSchema,
  updateAppSchema,
} = require("../schemas/app.schema");

const service = new AppService();

const router = express.Router();

router.post(
  "/app/create",
  validatorHandler(createAppSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newApp = await service.create(data);
      res.json(newApp);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/app/:id",
  validatorHandler(getAppSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const app = await service.findOne(id);
      res.json(app);
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const allApps = await service.findAll();
    res.json(allApps);
  } catch (e) {
    next(e);
  }
});

router.patch(
  "/app/update/:id",
  validatorHandler(getAppSchema, "params"),
  validatorHandler(updateAppSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const app = await service.update(id, data);
      res.json(app);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/app/delete/:id",
  validatorHandler(getAppSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const app = await service.delete(id);
      res.json(app);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
