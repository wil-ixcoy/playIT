const express = require("express");
const ComentaryService = require("../services/comentary.service");
const {
  createComentarySchema,
  getComentarySchema,
  updateComentarySchema,
} = require("../schemas/comentary.schema");
const validatorHandler = require("../middlewares/validator.handler");

const service = new ComentaryService();
const router = express.Router();

router.post(
  "/comentary/create",
  validatorHandler(createComentarySchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newComment = await service.create(data);
      res.json(newComment);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/comentary/:id",
  validatorHandler(getComentarySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const getComment = await service.findOne(id);
      res.json(getComment);
    } catch (e) {
      next(e);
    }
  }
);
router.get("/", async (req, res, next) => {
  try {
    const allComments = await service.findAll();
    res.json(allComments);
  } catch (e) {
    next(e);
  }
});
router.delete(
  "/comentary/delete/:id",
  validatorHandler(getComentarySchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const deleteComment = await service.delete(id);
      res.json(deleteComment);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
