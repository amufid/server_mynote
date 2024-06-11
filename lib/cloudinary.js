require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => {
      // Mengambil ekstensi file gambar
      const ext = file.originalname.split('.').pop().toLowerCase();

      // Menentukan format berdasarkan ekstensi file
      if (ext === 'jpg' || ext === 'jpeg') {
        return 'jpg';
      } else if (ext === 'png') {
        return 'png';
      } else {
        // Jika bukan format yang diizinkan, lewati file
        throw new Error('Format gambar tidak didukung.');
      }
    },
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
