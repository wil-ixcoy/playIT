const boom = require("@hapi/boom");
const { storage } = require("../libs/firebase");
const bucket = storage.bucket("gs://playit-f3631.appspot.com/");

class FirebaseService {
  async uploadProfilePictureDeveloper() {}
  async uploadProfilePictureUser() {}

  async uploadImagePost(post,image) {
    try {
      const extension = image.originalname.split(".").pop();

      let nombre = post.split(" ").join("_")
      

      const uploadImage = await bucket.upload(image.path, {
        destination: `posts/${nombre}.${extension}`,
        resumable: true,
      });
      const url = `https://storage.googleapis.com/${bucket.name}/${uploadImage[0].name}`;
      return url;
    } catch (e) {
      boom.badRequest(e);
    }
  }

  async uploadCoverCategory(category, image) {
    try {
      const extension = image.originalname.split(".").pop();
      let nombre = category.split(" ").join("_")
      
      const uploadImage = await bucket.upload(image.path, {
        destination: `category/${nombre}.${extension}`,
        resumable: true,
      });
      const url = `https://storage.googleapis.com/${bucket.name}/${uploadImage[0].name}`;
      return url;
    } catch (e) {
      boom.badRequest(e);
    }
  }

  async uploadCoverSubCategory(subCategory, image) {
    try {
      const extension = image.originalname.split(".").pop();

      let nombre = subCategory.split(" ").join("_")
      

      const uploadImage = await bucket.upload(image.path, {
        destination: `sub_category/${nombre}.${extension}`,
        resumable: true,
      });
      const url = `https://storage.googleapis.com/${bucket.name}/${uploadImage[0].name}`;
      return url;
    } catch (e) {
      boom.badRequest(e);
    }
  }
}
module.exports = FirebaseService;
