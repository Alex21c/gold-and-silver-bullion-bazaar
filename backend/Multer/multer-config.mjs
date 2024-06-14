import multer from "multer";
import { nanoid } from "nanoid";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = nanoid(9) + "." + file.originalname.split(".").at(-1);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept files only if they are images
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 },
});

const uploadCB = upload.fields([
  {
    name: "primaryImage",
    maxCount: Number(process.env.MAX_ALLOWED_PRIMARY_IMAGES),
  },
  {
    name: "supportingImages",
    maxCount: Number(process.env.MAX_ALLOWED_SUPPORTING_IMAGES),
  },
]);

export default uploadCB;
