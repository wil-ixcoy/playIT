const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class CategoryService {
  async create(data) {
    const subCategory = await models.SubCategory.create(data);
    return subCategory;
  }
  async findAll() {
    const allSubCategories = await models.SubCategory.findAll();
    return allSubCategories;
  }
  async findOne(id) {
    const subCategory = await models.SubCategory.findByPk(id);
    if (!subCategory) {
      throw boom.notFound("La sub categoria no existe");
    } else {
      return subCategory;
    }
  }
  async update(id, data) {
    const subCategory = await this.findOne(id);
    const updateSubCategory = await subCategory.update(data);
    return updateSubCategory;
  }
  async delete(id) {
    const subCategory = await this.findOne(id);
    subCategory.destroy();

    return {
      message: "categoria eliminada",
    };
  }
}
