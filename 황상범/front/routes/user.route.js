const express = require("express");
const router = express.Router();
const { userController: controller } = require("../src/user/user.controller");

router.get("/", (req, res, next) => controller.getIndex(req, res, next));
router.get("/signup", (req, res, next) => controller.getSignup(req, res, next));
router.post("/signup", (req, res, next) =>
  controller.postSignup(req, res, next)
);
router.get("/welcome", (req, res, next) =>
  controller.getWelcome(req, res, next)
);
router.get("/signin", (req, res, next) => controller.getSignin(req, res, next));
router.get("/profile", (req, res, next) =>
  controller.getProfile(req, res, next)
);
router.get("/modify", (req, res, next) =>
  controller.getProfileModify(req, res, next)
);
router.post("/modify", (req, res, next) =>
  controller.postProfileModify(req, res, next)
);
router.get("/kakao", (req, res, next) => controller.getKakao(req, res, next));

module.exports = router;
