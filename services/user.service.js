const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const { models } = require("../libs/sequelize");

class UserService {
  async create(data) {
    const hashPassword = await bcrypt.hash(data.password, 10);

    const newUser = await models.User.create({
      ...data,
      password: hashPassword,
      role: "user",
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id,{include:["dev"]});
    if (!user) {
      throw boom.notFound("El usuario no existe");
    }
    delete user.dataValues.password;
    return user;
  }

  async findAll() {
    const allUsers = await models.User.findAll();
    for (const user of allUsers) {
      delete user.dataValues.password;
    }
    return allUsers;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound("El usuario no existe");
    } else {
      const userUpdated = await user.update(data);
      delete userUpdated.dataValues.password;
      return userUpdated;
    }
  }

  async delete(id) {
    const user = await this.findOne(id);
    if (!user) {
      throw boom.notFound("El usuario no existe");
    } else {
      user.destroy();
      return {
        message: "Usuario eliminado",
      };
    }
  }
}

module.exports = UserService;
