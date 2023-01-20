/*
const sum = (a, b) => a + b;
const obj = {
  userid: "hsb7722",
  userpw: "1234",
};

describe("JWT class test", () => {
  it("decode", () => {
    console.log("hello~~");
  });

  it("encode", () => {});

  it("2+2 = 4 이다!", () => {
    const result = sum(2, 2);
    expect(result).toBe(4);
  });

  it("객체 테스트", () => {
    expect(obj).toEqual({
      userid: "hsb7722",
    });
  });
});
*/

const JWT = require("./jwt");
const crypto = require("crypto");

describe("lib/jwt.js", () => {
  let jwt;
  it("constructor", () => {
    expect(typeof JWT).toBe("function"); // "function"으로 적었지만 실제로는 "class"를 체크하기 위함!(Javascript에서는 class의 type이 function이기 때문!)
    jwt = new JWT({ crypto }); // {crypto: {...}}
    expect(typeof jwt.crypto).toBe("object");
  });

  it("encode", () => {
    expect(typeof jwt.encode).toBe("function");
    const value = { foo: "bar" };
    const base64 = jwt.encode(value);
    expect(base64).toBe("eyJmb28iOiJiYXIifQ");
  });
});
