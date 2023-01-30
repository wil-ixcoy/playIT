const express = require("express");
const UserService = require("../services/user.service");
const validatorHandler = require("../middlewares/validator.handler");

const {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} = require("../schemas/user.schema");

const service = new UserService();

const router = express.Router();

router.post(
  "/create",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await service.create(data);
      res.json(newUser);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const allUsers = await service.findAll();
    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.patch(
  "/update/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
      const user = await service.update(id, data);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/delete/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.delete(id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
