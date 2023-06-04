
import multer from "multer";
import {GridFsStorage} from "multer-gridfs-storage";
import dotenv from "dotenv";
dotenv.config();

const db = process.env.DB_URL;

const storage = new GridFsStorage({
  url: db,
  options: {useNewUrlParser: true},
  file: (req,file) => {
    const match = ["image/png","image/jpg"];
    if(match.indexOf(file.mimetype) === -1){
      return `${Date.now()}-blog-${file.originalname}`;
      
    }
    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`
    }
  }
});

export default multer({storage});