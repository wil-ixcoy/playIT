const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class CategoryService {
  async create(data) {
    const category = await models.Category.create(data);
    return category;
  }
  async findAll() {
    const allCategories = await models.Category.findAll();
    return allCategories;
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound("La categoria no existe");
    } else {
      return category;
    }
  }
  async update(id, data) {
    const category = await this.findOne(id);
    const updateCategory = await category.update(data);
    return updateCategory;
  }
  async delete(id) {
    const category = await this.findOne(id);
    category.destroy();

    return {
      message: "categoria eliminada",
    };
  }
}

module.exports = CategoryService;
