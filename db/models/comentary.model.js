const { Sequelize, DataTypes, Model } = require("sequelize");
const { POST_TABLE } = require("./post.model");
const { USER_TABLE } = require("./user.model");
const COMENTARY_TABLE = "Comentaries";

const ComentarySchema = {
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
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "post_id",
    references: {
      model: POST_TABLE,
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

class Comentary extends Model {
  static associate(models) {
    this.belongsTo(models.User, {
      as: "user",
    });
    this.belongsTo(models.Post, {
      as: "post",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: COMENTARY_TABLE,
      timestamps: false,
      modelName: "Comentary",
    };
  }
}

module.exports = {
  COMENTARY_TABLE,
  ComentarySchema,
  Comentary,
};
