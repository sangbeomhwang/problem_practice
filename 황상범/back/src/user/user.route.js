const express = require("express");
const router = express.Router();
const { userController: controller } = require("./user.module");
const upload = require("../../middlewares/upload");

router.post("/", upload.single("upload"), (req, res, next) =>
  controller.postSignup(req, res, next)
);
router.get("/me", (req, res, next) => controller.getMe(req, res, next));
router.post("/idcheck", (req, res, next) =>
  controller.postIdCheck(req, res, next)
);
router.put("/", (req, res, next) => controller.putProfile(req, res, next));

module.exports = router;
