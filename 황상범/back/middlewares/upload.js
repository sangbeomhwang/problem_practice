const multer = require("multer");
const path = require("path");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, done) => {
      done(null, "uploads/");
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname); // .jpg
      const basename = path.basename(file.originalname, ext);
      const filename = `${basename}_${Date.now()}${ext}`;
      done(null, filename);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 1024 byte는 1KB이고, 1KB가 1024개 있으면 1MB(메가 바이트)이고, 최종적으로 1MB가 5개 있으므로 5MB이다!
});

module.exports = upload;
