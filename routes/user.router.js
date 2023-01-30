const express = require("express");
const UserService = require("../services/user.service");
const validatorHandler = require("../middlewares/validator.handler");

const { createUserSchema, getUserSchema } = require("../schemas/user.schema");

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

module.exports = router;