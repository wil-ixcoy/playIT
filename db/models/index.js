const { User, UserSchema } = require("./user.model");
const { Developer, DeveloperSchema } = require("./developer.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Developer.init(DeveloperSchema, Developer.config(sequelize));

  User.associate(sequelize.models);
  Developer.associate(sequelize.models);
}

module.exports = { setupModels };
