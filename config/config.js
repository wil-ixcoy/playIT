require("dotenv").config();

config = {
  database_url: process.env.DATABASE_URL,
  isProd: process.env.NODE_ENV === "production",
};

module.exports = { config };
