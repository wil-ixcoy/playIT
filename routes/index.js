const express = require("express");
const UserRouter = require("./user.router");
const DevRouter = require("./developer.router");
const CategoryRouter = require("./category.router");
const SubCategoryRouter = require("./sub.category.router");
const PostRouter = require("./post.router");
const ComentaryRouter = require("./comentary.router");
const AppRouter = require("./app.router");

function indexRouter(app) {
  const router = express.Router();
  app.use("/playit", router);
  router.use("/users", UserRouter);
  router.use("/developers", DevRouter);
  router.use("/categories", CategoryRouter);
  router.use("/sub-categories", SubCategoryRouter);
  router.use("/posts", PostRouter);
  router.use("/comments", ComentaryRouter);
  router.use("/apps", AppRouter);
}

module.exports = indexRouter;
