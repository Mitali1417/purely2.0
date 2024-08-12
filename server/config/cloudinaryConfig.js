const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "duju3bhds",
  api_key: "153348868921222",
  api_secret: "Z9YdPTO32j48KcOUujSLWVKyluw",
});

const uploadImage = async (filepath) => {
  try {
    const result = await cloudinary.uploader.upload(filepath);
    console.log(result);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { cloudinary, uploadImage };