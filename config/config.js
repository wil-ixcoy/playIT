require("dotenv").config();

config = {
  database_url: process.env.DATABASE_URL,
};

module.exports = { config };
