"use strict";
const {
  DEVELOPER_TABLE,
  DeveloperSchema,
} = require("../models/developer.model");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(DEVELOPER_TABLE, DeveloperSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(DEVELOPER_TABLE);
  },
};
