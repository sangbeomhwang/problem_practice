const UserRepository = require("./user.repository");

describe("UserRepository", () => {
  let User, repository;

  // beforeEach: 아래 코드들이 하나 실행될 때마다 해당 함수(beforeEach)를 다시 실행시켜줌!
  beforeEach(() => {
    User = {
      create: jest.fn().mockResolvedValue({}),

      /*
      // 바로 위의 코드와 동일하게 동작함!(return 값이 promise 객체가 떨어짐)
      create: () => {
        return new Promise((resolve, reject) => {
          resolve({});
        });
      },
      */
    };

    repository = new UserRepository({ User }); // UserRepository의 return 값 = {User: {}}
    // console.log(repository);
  });

  it("UserRepository를 잘 가져오는가?", () => {
    expect(typeof UserRepository).toBe("function");
  });

  describe("addUser", () => {
    let payload = {
      userid: "hsb7722",
      userpw: "1234",
      username: "sangbeom",
    };

    it("[try] addUser 메서드 확인", async () => {
      const user = await repository.addUser(payload);
      // expect(User.create).toHaveBeenCalled();
      expect(User.create).toHaveBeenCalledWith(payload, { raw: true });
      expect(user).toEqual({});
    });

    it("[catch] create method가 reject가 발생되었을 때", async () => {
      User.create = jest.fn().mockRejectedValue({});
      await expect(
        async () => await repository.addUser(payload)
      ).rejects.toThrow();
    });
  });
});
