class UserService {
  constructor({ userRepository, jwt }) {
    this.userRepository = userRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
  }

  async signup(userData) {
    try {
      const { userid, userpw, username, ...rest } = userData;
      if (!userid || !userpw || !username) throw "내용 없음!!";
      const hash = this.crypto
        .createHmac("sha256", "hsb7722")
        .update(userpw)
        .digest("hex");

      const user = await this.userRepository.addUser({
        userid,
        username,
        userpw: hash,
        ...rest,
      });

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async me(token) {
    try {
      const { userid } = this.jwt.verify(token, "web7722");
      const user = await this.userRepository.getUserById(userid);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async idCheck(userid) {
    try {
      const user = await this.userRepository.getUserById(userid);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProfile(userData) {
    try {
      console.log(`service`, userData);

      const { userpw, ...rest } = userData;
      const hash = this.crypto
        .createHmac("sha256", "hsb7722")
        .update(userpw)
        .digest("hex");
      const user = await this.userRepository.updateUser({
        userpw: hash,
        ...rest,
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = UserService;
