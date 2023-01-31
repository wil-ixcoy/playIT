const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class DeveloperService {
  async create(data) {
    let rol = "developer";
    const newDev = await models.Developer.create({
      ...data,
      role: rol,
    });

    return newDev;
  }

  async findOne(id) {
    const dev = await models.Developer.findByPk(id);
    if (!dev) {
      throw boom.notFound("El Developer no existe");
    } else {
      return dev;
    }
  }
  async findAll() {
    const allDevs = await models.Developer.findAll();
    return allDevs;
  }
  async update(id, data) {
    const Developer = await this.findOne(id);
    if (!Developer) {
      throw boom.notFound("El Developer no existe");
    } else {
      const newData = await Developer.update(data);
      return newData;
    }
  }
  async delte(id) {
    const Developer = await this.findOne(id);
    if (!Developer) {
      throw boom.notFound("El Developer no existe");
    } else {
      Developer.destroy();
      return {
        message: "Developer eliminado",
      };
    }
  }
}

module.exports = DeveloperService;
