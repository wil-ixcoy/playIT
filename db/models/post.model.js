const { Sequelize, DataTypes, Model } = require("sequelize");
const { USER_TABLE } = require("./user.model");

const POST_TABLE = "posts";

const PostSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
    references: {
      model: USER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class Post extends Model {
  static associate(models) {
    /* this.hasMany(models.SubCategory, {
      as: "subCategories",
      foreignKey: "categoryId",
    }); */

    this.belongsTo(models.User, {
      as: "user",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: POST_TABLE,
      timestamps: false,
      modelName: "Post",
    };
  }
}

module.exports = {
  POST_TABLE,
  PostSchema,
  Post,
};
