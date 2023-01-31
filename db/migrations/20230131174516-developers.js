"use strict";
const {
  DEVELOPER_TABLE,
  DeveloperSchema,
} = require("./20230131174516-developers");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(DEVELOPER_TABLE, DeveloperSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(DEVELOPER_TABLE);
  },
};
