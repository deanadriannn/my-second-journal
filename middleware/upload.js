import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinaryConfig from './cloudinary.config.js';

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