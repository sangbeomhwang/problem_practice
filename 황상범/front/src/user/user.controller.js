const axios = require("axios");
const request = axios.create({
  baseURL: "http://127.0.0.1:3001",
  withCredentials: true,
});

class UserController {
  async getIndex(req, res, next) {
    try {
      console.log("main page", req.user);
      // console.log(req.cookies);
      // payload를 뽑아온 뒤 해당 string 값을 "JSON.parse()"를 써서 객체로 만든 뒤 userid와 userpw 값을 가져옴
      if (req.user === undefined) return res.render("index.html");
      const { userid, username } = req.user;

      res.render("index.html", {
        userid,
        username,
      });
    } catch (e) {
      next(e);
    }
  }

  async getSignup(req, res, next) {
    try {
      res.render("user/signup.html");
    } catch (e) {
      next(e);
    }
  }

  async postSignup(req, res, next) {
    try {
      console.log(req.body);
      // POST 127.0.0.1:3000/users

      const response = await request.post("/users", {
        ...req.body,
      });
      console.log(`response`, response);

      const { userid, userpw, username } = response.data;

      res.redirect(
        `/welcome?userid=${userid}&username=${username}&userpw=${userpw}`
      );
    } catch (e) {
      next(e);
    }
  }

  async getWelcome(req, res, next) {
    try {
      const { userid, userpw, username } = req.query;
      res.render("user/welcome.html", {
        userid,
        userpw,
        username,
      });
    } catch (e) {
      next(e);
    }
  }

  async getSignin(req, res, next) {
    try {
      res.render("user/signin.html");
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req, res, next) {
    try {
      res.render("user/profile.html", { ...req.user });
    } catch (e) {
      next(e);
    }
  }

  async getProfileModify(req, res, next) {
    try {
      res.render("user/profileModify.html", { ...req.user });
    } catch (e) {
      next(e);
    }
  }

  async postProfileModify(req, res, next) {
    try {
      console.log(`front modify`, req.body);
      await request.put("/users", { ...req.body });

      res.redirect("/");
    } catch (e) {
      next(e);
    }
  }

  async getKakao(req, res, next) {
    try {
      // kauth.kakao.com
      // /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
      const redirectURI = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      res.redirect(redirectURI);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

module.exports = {
  userController,
};
