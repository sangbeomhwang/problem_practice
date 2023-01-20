class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }

  async getMe(req, res, next) {
    try {
      if (!req.headers.authorization) throw new Error("Authorization 없음!!");
      const [type, token] = req.headers.authorization.split(" ");
      if (type !== "Bearer") throw new Error("Authorization Type Error");

      const user = await this.userService.me(token);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async postSignup(req, res, next) {
    console.log(req.body);
    try {
      const user = await this.userService.signup(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async postIdCheck(req, res, next) {
    try {
      const { userid } = req.body;
      const user = await this.userService.idCheck(userid);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async putProfile(req, res, next) {
    try {
      console.log(`controller`, req.body);
      const user = await this.userService.updateProfile(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
