class UserRepository {
  constructor({ User }) {
    this.User = User;
  }

  async addUser(payload) {
    console.log(payload);
    try {
      const user = await this.User.create(payload, { raw: true });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserById(userid) {
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          userid,
        },
      });

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateUser(userData) {
    console.log(`repository`, userData);

    try {
      const user = await this.User.update(userData, {
        where: { userid: userData.userid },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = UserRepository;
