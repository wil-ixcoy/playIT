const express = require("express");
const cors = require("cors");
const indexRouter = require("./routes/index");

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

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening on port: " + port);
});
