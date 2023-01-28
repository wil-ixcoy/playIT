const express = require("express");

function indexRouter(app) {
  const router = express.Router();
  app.use("/playit", router);
}

module.exports = indexRouter;