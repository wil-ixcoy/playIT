const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class AppService {
  async create(data) {
    const uploadApp = await models.App.create(data);
    return uploadApp;
  }

  async findOne(id) {
    const app = await models.App.findByPk(id);
    if (!app) {
      throw boom.notFound("La aplicación no existe");
    } else {
      return app;
    }
  }

  async findAll() {
    const allapps = await models.App.findAll();
    return allapps;
  }

  async update(id, data) {
    const App = await this.findOne(id);

    if (!App) {
      throw boom.notFound("La aplicación no existe");
    } else {
      const newData = await App.update(data);
      return newData;
    }
  }

  async delete(id) {
    const App = await this.findOne(id);

    if (!App) {
      throw boom.notFound("La aplicación no existe");
    } else {
      App.destroy();
      return {
        message: "Aplicación eliminada",
      };
    }
  }
}

module.exports = AppService;
