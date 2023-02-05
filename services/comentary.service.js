const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class ComentaryService {
  async create(data) {
    const newComment = await models.Comentary.create(data);
    return newComment;
  }
  async findAll() {
    const allComments = await models.Comentary.findAll();
    return allComments;
  }
  async findOne(id) {
    const comentary = await models.Comentary.findByPk(id, {
      include: ["user", "post"],
    });
    if (!comentary) {
      throw boom.notFound("El comentario no existe");
    } else {
      return comentary;
    }
  }
  async update(id, data) {
    const comentary = await this.findOne(id);
    const updateComment = comentary.update(data);
    return updateComment;
  }
  async delete(id) {
    const comentary = await this.findOne(id);
    comentary.destroy();
    return {
      message: "Comentario eliminado",
    };
  }
}
module.exports = ComentaryService;
