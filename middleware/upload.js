const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinaryConfig = require('./cloudinary.config.js');


cloudinary.config(cloudinaryConfig)

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "journal",
    format: async () => "pdf",
    public_id: (req, file) => file.filename
  }
})

const parser = multer({ storage });

export default parser;