const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const UserService = require("./user.service");

const userService = new UserService();

class DeveloperService {
  async create(data) {
    let rol = "developer";
    let user = {
      name: data.name,
      last_name: data.last_name,
      username: data.username,
      email: data.email,
      password: data.password,
      country: data.country,
      role: rol,
    };
    const userCreate = await userService.create(user);
    await userService.update(userCreate.id, { role: rol });
    const newDev = await models.Developer.create({
      ...data,
      userId: userCreate.id,
    });
    return newDev;
  }

  async updateDevProfile(data) {
    let rol = "developer";
    await userService.update(data.userId, { role: rol });
    const newDev = await models.Developer.create(data);
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
  async delete(id) {
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
