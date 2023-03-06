"use strict";
const { Model } = require("sequelize");
// ("use strict");
// const { hash } = require("bcryptjs");
const { hashPassword } = require("../helper/bcrypt"); // ini diubah karna requirenya hashnya gk nemu

// const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cars, {
        foreignKey: "UserId",
      });
      User.hasMany(models.ParkingTransaction, { foreignKey: "UserId" });
    } // tambahan from sam
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `email is required`,
          },
          notEmpty: {
            msg: `email is required`,
          },
          isEmail: {
            msg: `Email is not valid`,
          },
        },
        unique: {
          args: true,
          msg: "Email address already in use!",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: `password is required`,
          },
          notEmpty: {
            msg: `password is required`,
          },
          len: {
            args: [5, Infinity],
            msg: "Minimum 5 characters required in password",
          },
        },
      },
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      // modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
