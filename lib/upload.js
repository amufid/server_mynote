const handleUpload = require("./cloudinary");
const multer = require("multer");

const handler = async (params) => {
   try {
      const b64 = Buffer.from(params.buffer).toString("base64");
      let dataURI = "data:" + params.mimetype + ";base64," + b64;

      const cldRes = await handleUpload(dataURI);

      return cldRes;
   } catch (error) {
      console.log(error);
   }
};

module.exports = handler;
