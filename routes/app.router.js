const express = require("express");
const AppService = require("../services/app.service");
const FirebaseService = require("../services/firebase.service");
const validatorHandler = require("../middlewares/validator.handler");
const fs = require("fs-extra");
const { uploadAppHandler } = require("../middlewares/app.handler");
const {
  uploadImageHandler,
  helperImage,
} = require("../middlewares/image.handler");
const {
  createAppSchema,
  getAppSchema,
  updateAppSchema,
} = require("../schemas/app.schema");

const service = new AppService();
const firebaseService = new FirebaseService();

const router = express.Router();

router.post(
  "/app/create",
  uploadImageHandler.array("files",3),
  async (req, res, next) => {
    try {
      const reqData = req.body;

      const icon = await helperImage(req.files[1].path, `${req.files[1].originalname}`, 150, 150);
      const cover = await helperImage(req.files[2].path,`${req.files[2].originalname}`,800,500);
      
      const Urls = await firebaseService.uploadApp(req.body.title, req.files[0], icon, cover);
    
      const data = {
        ...reqData,
        download_link: Urls.urlApp,
        icon: Urls.urlIcon,
        cover_photo: Urls.urlCover
      };

      const newApp = await service.create(data);
      res.json(newApp);
      
      await fs.unlink(req.files[0].path);
      await fs.unlink(req.files[1].path);
      await fs.unlink(req.files[2].path);
      await fs.unlink(cover.path);
      await fs.unlink(icon.path);
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
