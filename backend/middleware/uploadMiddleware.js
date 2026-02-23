import multer from "multer"; // Importing multer for handling file uploads

// Setting up multer storage configuration

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

export default upload;
