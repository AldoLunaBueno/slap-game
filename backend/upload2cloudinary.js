import cloudinary from "cloudinary"
import fs from "fs"
import "dotenv/config"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folderPath = './local_images/body'; // Path to images

fs.readdirSync(folderPath).forEach(async (file) => {
  const filePath = `${folderPath}/${file}`;
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'slap_game' // organize images in Cloudinary
  });
  console.log(`${file} ${result.secure_url}`);
});
