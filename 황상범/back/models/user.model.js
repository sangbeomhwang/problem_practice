module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
    static initialize() {
      return this.init(
        {
          userid: {
            type: Sequelize.STRING(16),
            primaryKey: true,
            validate: {
              is: /^[A-Za-z0-9]{6,16}$/,
            },
          },
          username: {
            type: Sequelize.STRING(16),
            allowNull: false,
            validate: {
              is: /^[A-Za-z가-힣0-9]{2,16}$/,
            },
          },
          userpw: {
            type: Sequelize.STRING(64),
            allowNull: false,
          },
          gender: {
            type: Sequelize.ENUM("male", "female"),
            defaultValue: "male",
            allowNull: false,
          },
          birth: {
            type: Sequelize.DATEONLY,
            validate: {
              isAfter: "1900-01-01",
              isBefore: "2009-12-31",
            },
          },
          phoneNumber: {
            type: Sequelize.STRING(11),
            validate: {
              is: /^010[0-9]{8}$/,
            },
          },
          email: {
            type: Sequelize.STRING(30),
            validate: {
              isEmail: true,
            },
          },
          provider: {
            type: Sequelize.ENUM("local", "kakao"),
            allowNull: false,
            defaultValue: "local",
          },
          snsId: {
            type: Sequelize.STRING(30),
            allowNull: true,
          },
        },
        {
          sequelize,
        }
      );
    }
    // static associate(models) {
    //   this.hasMany(models.Board, {
    //     foreignKey: "userid",
    //   });
    //   this.hasMany(models.Comment, {
    //     foreignKey: "userid",
    //   });
    //   this.belongsToMany(models.Board, {
    //     through: "Liked",
    //     foreignKey: "userid",
    //   });
    // }
  }
  User.initialize();
};
