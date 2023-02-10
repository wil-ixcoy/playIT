"use strict";
const { APP_TABLE, AppSchema } = require("../models/app.model");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(APP_TABLE, AppSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(APP_TABLE);
  },
};
