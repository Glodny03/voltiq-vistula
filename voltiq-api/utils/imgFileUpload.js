import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEFAULT_UPLOAD_PATH = path.join(__dirname, "../public/img/files");
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const IMAGE_EXTENSION_REGEX = /\.(jpeg|jpg|png)$/i;

const fileFilter = (req, file, callback) => {
  const fileExtension = path.extname(file.originalname);

  if (IMAGE_EXTENSION_REGEX.test(fileExtension)) {
    return callback(null, true);
  }

  return callback("Error: Images only!");
};

const createStorage = (uploadPath) =>
  multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadPath || DEFAULT_UPLOAD_PATH);
    },
    filename: (req, file, callback) => {
      callback(null, `${Date.now()}_${file.originalname}`);
    },
  });

const createUploadMiddleware = (uploadPath) =>
  multer({
    storage: createStorage(uploadPath),
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter,
  });

export default createUploadMiddleware;
