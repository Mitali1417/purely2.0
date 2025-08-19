const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config/cloudinaryConfig");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "purely2.0",
    format: async (req, file) => "png",
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
