class AuthService {
  constructor({ authRepository, jwt, config }) {
    this.authRepository = authRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
    this.HttpException = config.exception.HttpException;
  }

  // 전달받은 데이터를 암호화하여 hash 값을 만들어야 함
  // repository에 user가 존재하는지 체크해야 됨
  // 그 후 존재한다고 확인되면 return 값으로 token을 보냄
  async token({ userid, userpw }) {
    try {
      if (!userid || !userpw) throw "내용 없음!!";
      const hash = this.crypto
        .createHmac("sha256", "hsb7722")
        .update(userpw)
        .digest("hex");
      const user = await this.authRepository.getUserByInfo({
        userid,
        userpw: hash,
      });

      // user가 존재하는지 안하는지 체크해야 됨
      // user가 존재하면 token을 생성함
      if (!user) throw "아이디와 패스워드가 일치하지 않습니다!";

      const token = this.jwt.sign(user);
      return token;
    } catch (e) {
      throw new this.HttpException(e);
    }
  }
}

module.exports = AuthService;
