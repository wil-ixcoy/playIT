const boom = require("@hapi/boom");
const { storage } = require("../libs/firebase");

class FirebaseService {
  async uploadProfilePictureDeveloper() {}
  async uploadProfilePictureUser() {}
  async uploadImagePost() {}

  async uploadCoverCategory(category, image) {
    const bucket = storage.bucket("gs://playit-f3631.appspot.com/");

    const extension = image.originalname.split(".").pop();

    const newImage = await bucket.upload(image.path, {
      destination: `category/${category}.${extension}`,
      resumable: true,
    });
    const file = await bucket.file(`category/${category}.${extension}`);
    const urlImage = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2130",
    });
    console.log(urlImage);
    console.log(urlImage[0]);
    return urlImage[0];
  }
  async uploadCoverSubCategory() {}
}
module.exports = FirebaseService;
/*   const file = await bucket.file(`category/${category}.${extension}`);
    const urlImage = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2130",
    });
    console.log(urlImage);
    console.log(urlImage[0]);
    return urlImage[0]; */
