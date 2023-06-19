const express = require("express");
const AppService = require("../services/app.service");
const validatorHandler = require("../middlewares/validator.handler");
const fs = require("fs-extra");
const {
  uploadImageHandler,
} = require("../middlewares/image.handler");
const {
  createAppSchema,
  getAppSchema,
  updateAppSchema,
} = require("../schemas/app.schema");

const service = new AppService();

const router = express.Router();

router.post(
  "/app/create",
  uploadImageHandler.array("files", 13),
  validatorHandler(createAppSchema, "body"),
  async (req, res, next) => {
    try {
      const reqData = req.body;

      const files = req.files;

      const firebaseLinks = await service.images(req.body.title, files);

      const data = {
        ...reqData,
        download_link: firebaseLinks.Urls.urlApp,
        icon: firebaseLinks.Urls.urlIcon,
        cover_photo: firebaseLinks.Urls.urlCover,
        screenshots: firebaseLinks.links,
      };

      const newApp = await service.create(data);
      res.json(newApp);

      for (let i = 0; i < req.files.length; i++) {
        await fs.unlink(req.files[i].path);
      }
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
