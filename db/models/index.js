const { User, UserSchema } = require("./user.model");
const { Developer, DeveloperSchema } = require("./developer.model");
const { Category, CategoySchema } = require("./category.model");
const { SubCategory, SubCategoySchema } = require("./category.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Developer.init(DeveloperSchema, Developer.config(sequelize));
  Category.init(CategoySchema, Category.config(sequelize));
  SubCategory.init(SubCategoySchema, SubCategory.config(sequelize));

  User.associate(sequelize.models);
  Developer.associate(sequelize.models);
  Category.associate(sequelize.models);
  SubCategory.associate(sequelize.models);
}

module.exports = { setupModels };
