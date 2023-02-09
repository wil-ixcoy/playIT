const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../images/multer"));
  },
  filename: (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    callback(null, `${Date.now()}.${extension}`);
  },
});

const uploadImageHandler = multer({
  storage,
});

/* sharp */

const helperImage = async (filePat, fileName, width, height) => {
  const extension = filePat.split(".").pop();
  const resize = await sharp(filePat)
    .resize({
      width: width,
      height: height,
    })
    .toFile(
      path.join(__dirname, `../images/sharp/resized-${fileName}.${extension}`)
    );
  let filePath = path.join(
    __dirname,
    `../images/sharp/resized-${fileName}.${extension}`
  );

  const fileInfo = fs.statSync(filePath);
  const responseObject = {
    fieldname: "file",
    originalname: `${fileName}.${extension}`,
    encoding: "7bit",
    mimetype: "image/png",
    destination: path.dirname(filePath),
    filename: `resized-${fileName}.${extension}`,
    path: filePath,
    size: fileInfo.size,
  };
  return responseObject;
};

module.exports = {
  uploadImageHandler,
  helperImage,
};
