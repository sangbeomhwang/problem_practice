class AuthRepository {
  constructor({ User }) {
    this.User = User;
  }

  async getUserByInfo({ userid, userpw }) {
    try {
      const user = await this.User.findOne({
        raw: true,
        attributes: { exclude: ["userpw"] }, // attributes는 field를 지정해주는 역할을 하는 속성
        where: {
          userid,
          userpw,
        },
      });

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = AuthRepository;
