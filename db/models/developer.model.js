const { Sequelize, Model, DataTypes } = require("sequelize");

const DEVELOPER_TABLE = "developers";

const DeveloperSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  years_experiencie: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  job_availability: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  date_of_birth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  technologies: {
    type: DataTypes.ARRAY,
    allowNull: false,
  },

  /* datos extras para el perfil */
  photo_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  about: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  web_page: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  youtube_channel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitch__channel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  discord_channel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  linkedin_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  github_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  instagram_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  facebook_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  twitter_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  tiktok_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
};

class Developer extends Model {
  static associate(models) {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: DEVELOPER_TABLE,
      timestamps: false,
      modelName: "Developer",
    };
  }
}

module.exports = {
  Developer,
  DeveloperSchema,
  DEVELOPER_TABLE,
};
