const { Sequelize, DataTypes, Model } = require("sequelize");
const { CATEGORY_TABLE } = require("./category.model");

const SUBCATEGORY_TABLE = "sub_categories";

const SubCategorySchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "category_id",
    references: {
      model: CATEGORY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cover_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class SubCategory extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: "Category",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: SUBCATEGORY_TABLE,
      timestamps: false,
      modelName: "Category",
    };
  }
}

module.exports = {
  SUBCATEGORY_TABLE,
  SubCategorySchema,
  SubCategory,
};
