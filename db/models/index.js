const { User, UserSchema } = require("./user.model");
const { Developer, DeveloperSchema } = require("./developer.model");
const { Category, CategorySchema } = require("./category.model");
const { SubCategory, SubCategorySchema } = require("./subCategory.model");
const { Post, PostSchema } = require("./post.model");
const { Comentary, ComentarySchema } = require("./comentary.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Developer.init(DeveloperSchema, Developer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  SubCategory.init(SubCategorySchema, SubCategory.config(sequelize));
  Post.init(PostSchema, Post.config(sequelize));
  Comentary.init(ComentarySchema, Comentary.config(sequelize));

  User.associate(sequelize.models);
  Developer.associate(sequelize.models);
  Category.associate(sequelize.models);
  SubCategory.associate(sequelize.models);
  Post.associate(sequelize.models);
  Comentary.associate(sequelize.models);
}

module.exports = { setupModels };
