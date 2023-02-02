"use strict";
const {
  SubCategorySchema,
  SUBCATEGORY_TABLE,
} = require("../models/subCategory.model");
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(SUBCATEGORY_TABLE, SubCategorySchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(SUBCATEGORY_TABLE);
  },
};
