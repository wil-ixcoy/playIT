const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const FirebaseService = require("./firebase.service");
const fs = require("fs-extra");
const { helperImage } = require("../middlewares/image.handler");
const service = new FirebaseService();
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

  async images(title, files) {
    const icon = await helperImage(
      files[1].path,
      `${files[1].originalname}`,
      150,
      150
    );

    const cover = await helperImage(
      files[2].path,
      `${files[2].originalname}`,
      1500,
      500
    );

    let Urls = await service.uploadApp(title, files[0], icon, cover);
    const links = [];

    for (let i = 3; i < files.length; i++) {
      const image = await helperImage(
        files[i].path,
        `${files[i].originalname}`,
        570,
        960
      );

      let link = await service.uploadAppImages(title, image);
      links.push(link);
      console.log(image);
    }

    await fs.unlink(icon.path);
    await fs.unlink(cover.path);
    return {
      Urls,
      links,
    };
  }
}

module.exports = AppService;
