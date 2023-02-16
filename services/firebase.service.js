const boom = require("@hapi/boom");
const { storage } = require("../libs/firebase");
const bucket = storage.bucket("gs://playit-f3631.appspot.com/");

class FirebaseService {
  async uploadProfilePictureDeveloper() {}
  async uploadProfilePictureUser() {}

  async uploadImagePost(post, image) {
    try {
      const extension = image.originalname.split(".").pop();

      let nombre = post.split(" ").join("_");

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
      let nombre = category.split(" ").join("_");

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

      let nombre = subCategory.split(" ").join("_");

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

  async uploadApp(nameApp, app, icon, cover) {
    try {
      const extensionApp = app.originalname.split(".").pop();
      const extensionIcon = icon.originalname.split(".").pop();
      const extensionCover = cover.originalname.split(".").pop();

      let nombre = nameApp.split(" ").join("_");

      const uploadApplication = await bucket.upload(app.path, {
        destination: `apps/${nombre}/${nombre}-app.${extensionApp}`,
        resumable: true,
      });

      const uploadIcon = await bucket.upload(icon.path, {
        destination: `apps/${nombre}/${nombre}-icon.${extensionIcon}`,
        resumable: true,
      });

      const uploadCover = await bucket.upload(cover.path, {
        destination: `apps/${nombre}/${nombre}-cover.${extensionCover}`,
        resumable: true,
      });
      const urlApp = `https://storage.googleapis.com/${bucket.name}/${uploadApplication[0].name}`;
      const urlIcon = `https://storage.googleapis.com/${bucket.name}/${uploadIcon[0].name}`;
      const urlCover = `https://storage.googleapis.com/${bucket.name}/${uploadCover[0].name}`;
      return {
        urlApp,
        urlIcon,
        urlCover,
      };
    } catch (e) {
      boom.badRequest(e);
    }
  }
}
module.exports = FirebaseService;
