const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const allowedFormats = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const fileFormat = file.mimetype.split("/")[1];
    if (!allowedFormats.includes(fileFormat)) {
      throw new Error("Invalid file format");
    }
    return {
      folder: "uploads",
      format: fileFormat,
      public_id: file.originalname.split(".")[0],
    };
  },
});

const upload = multer({ storage });

module.exports = upload;