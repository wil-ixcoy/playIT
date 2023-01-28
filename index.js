const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

const app = express();

const whitelist = ["http://localhost:8080"];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};
app.use(express.json());
app.use(cors(options));
indexRouter(app);

/* uso de middlewares de errores */
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);
app.use(ormErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
