const boom = require("@hapi/boom");
const { storage } = require("../libs/firebase");
const bucket = storage.bucket("gs://playit-f3631.appspot.com/");

class FirebaseService {
  async uploadProfilePictureDeveloper() {}
  async uploadProfilePictureUser() {}
  async uploadImagePost() {}

  async uploadCoverCategory(category, image) {
    try {
      const extension = image.originalname.split(".").pop();

      const newImage = await bucket.upload(image.path, {
        destination: `category/${category}.${extension}`,
        resumable: true,
      });
      const url = `https://storage.googleapis.com/${bucket.name}/${newImage[0].name}`;
      return url;
    } catch (e) {
      boom.badRequest(e)
    }
  }

  async uploadCoverSubCategory(file) {}
}
module.exports = FirebaseService;
