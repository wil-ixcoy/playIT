const express = require("express");
const UserRouter = require("./user.router");
const DevRouter = require("./developer.router");
const CategoryRouter = require("./category.router");
const SubCategoryRouter = require("./sub.category.router");

function indexRouter(app) {
  const router = express.Router();
  app.use("/playit", router);
  router.use("/users", UserRouter);
  router.use("/developers", DevRouter);
  router.use("/categories", CategoryRouter);
  router.use("/sub-categories", SubCategoryRouter);
}

module.exports = indexRouter;
