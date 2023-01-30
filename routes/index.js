const express = require("express");
const UserRouter = require("./user.router");

function indexRouter(app) {
  const router = express.Router();
  app.use("/playit", router);
  router.use("/users", UserRouter);
}

module.exports = indexRouter;
