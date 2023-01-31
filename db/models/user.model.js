const { Sequelize, Model, DataTypes } = require("sequelize");

const USER_TABLE = "users";

const UserSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Developer, {
      as: "dev",
      foreignKey: "userId",
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      timestamps: false,
      modelName: "User",
    };
  }
}

module.exports = {
  User,
  UserSchema,
  USER_TABLE,
};
