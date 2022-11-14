import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Allow images only of extensions jpeg|jpg|png !");
  }
};

const maxSize = 82428800;
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: maxSize },
});

export { upload };
