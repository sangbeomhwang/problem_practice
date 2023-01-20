/*
class JWT {
  constructor({ crypto }) {
    this.crypto = crypto;
  }

  encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
    // return; --> undefined가 반환됨
  }
}

module.exports = JWT;
*/

class JWT {
  constructor({ crypto }) {
    this.crypto = crypto;
  }

  sign(data, options = {}) {
    const header = this.encode({ tpy: "JWT", alg: "HS256" }); //base64url
    const payload = this.encode({ ...data, ...options }); //base64url
    const signature = this.createSignature([header, payload]);

    // return `${header}.${payload}.${signature}`;
    return [header, payload, signature].join(".");
  }

  // token: string, salt: string
  verify(token, salt) {
    // eyJ0cHkiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyaWQiOiJ3ZWI3NzIyIiwidXNlcm5hbWUiOiJpbmdvbyJ9.uMiI-vrtl0X_u2hg64YZGCOvvlogEYBOwradyX6duyU
    // header, payload --> hash 진행
    // 기존 hash와 새로운 hash를 비교하여 true인지 아닌지 체크
    const [header, payload, signature] = token.split(".");
    const newSignature = this.createSignature([header, payload], salt);
    if (newSignature !== signature) {
      throw new Error("토큰이 이상함! 누가 변조한 것 같음!");
    }

    return this.decode(payload);
  }

  encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString("base64url");
  }

  decode(base64) {
    return JSON.parse(Buffer.from(base64, "base64").toString("utf-8")); // 객체를 반환함!
  }

  createSignature(base64urls, salt = "web7722") {
    // header.payload .join
    const data = base64urls.join(".");
    return this.crypto
      .createHmac("sha256", salt)
      .update(data)
      .digest("base64url");
  }
}

module.exports = JWT;
