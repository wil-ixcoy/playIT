const express = require("express");
const UserRouter = require("./user.router");
const DevRouter = require("./developer.router");

function indexRouter(app) {
  const router = express.Router();
  app.use("/playit", router);
  router.use("/users", UserRouter);
  router.use("/developers", DevRouter);
}

module.exports = indexRouter;
