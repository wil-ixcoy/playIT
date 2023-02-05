const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class PostService {
  async create(data) {
    const newPost = await models.Post.create(data);
    return newPost;
  }
  async findAll() {
    const allPosts = await models.Post.findAll();
    return allPosts;
  }
  async findOne(id) {
    const post = await models.Post.findByPk(id, { include: ["user","comentaries"] });
    if (!post) {
      throw boom.notFound("El post no existe");
    } else {
      return post;
    }
  }
  async update(id, data) {
    const post = await this.findOne(id);
    const updatePost = post.update(data);
    return updatePost;
  }
  async delete(id) {
    const post = await this.findOne(id);
    post.destroy();
    return {
      message: "Post eliminado",
    };
  }
}
module.exports = PostService;
