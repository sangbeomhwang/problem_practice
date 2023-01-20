const fs = require("fs");
const path = require("path");

const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require("../config")["db"][env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// sequelize에 models 객체를 넣어줌
fs.readdirSync(__dirname)
  .filter((file) => file.indexOf("model") !== -1)
  .forEach((file) => {
    require(path.join(__dirname, file))(sequelize, Sequelize);
  });

// models 객체 안에서 관계 설정을 하기 위한 코드
const { models } = sequelize;
for (const key in models) {
  if (typeof models[key].associate !== "function") continue;
  models[key].associate(models);
}

module.exports = {
  Sequelize,
  sequelize,
};
