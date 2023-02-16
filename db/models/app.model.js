const { Sequelize, DataTypes, Model } = require("sequelize");
const { CATEGORY_TABLE } = require("./category.model");
const { SUBCATEGORY_TABLE } = require("./subCategory.model");
const { DEVELOPER_TABLE } = require("./developer.model");

const APP_TABLE = "applications";

const AppSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  devId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "developer_id",
    references: {
      model: DEVELOPER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
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
  subcategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "subcategory_id",
    references: {
      model: SUBCATEGORY_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  devName: {
    type: DataTypes.STRING,
    field:"dev_name",
    allowNull: false,
  },
  devUsername: {
    type: DataTypes.STRING,
    field:"dv_username",
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cover_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(900),
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isfree: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  download_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  language: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  downloads: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  screenshots: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class App extends Model {
  static associate(models) {
    this.belongsTo(models.Category, {
      as: "category",
    });
    this.belongsTo(models.Developer, {
      as: "dev",
    });
    this.belongsTo(models.SubCategory, {
      as: "subcategory",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: APP_TABLE,
      timestamps: false,
      modelName: "App",
    };
  }
}

module.exports = {
  APP_TABLE,
  AppSchema,
  App,
};
