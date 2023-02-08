require("dotenv").config();

config = {
  database_url: process.env.DATABASE_URL,
  isProd: process.env.NODE_ENV === "production",
  google_credentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
};

module.exports = { config };
