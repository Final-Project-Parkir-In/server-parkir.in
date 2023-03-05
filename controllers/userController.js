const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User, Cars } = require("../models");

class ControllerUser {
  static async login(req, res, next) {
    // console.log("Masuk Login");
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "invalid_credentials<<" };

      const validate = comparePassword(password, user.password);

      if (!validate) throw { name: "invalid_credentials" };

      const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        email: payload.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    console.log("Masuk");
    try {
      let { email, password } = req.body;
      let dataUser = await User.create({
        email,
        password,
      });
      res.status(201).json(dataUser);
    } catch (error) {
      next(error);
    }
  }

  static async getCars(req, res, next) {
    try {
      const UserId = req.user.id
      let cars = await Cars.findAll({
        where: {
          UserId
        }
      })
      res.status(200).json(cars)
    } catch (error) {
      next(error)
    }
  }

  static async addCar(req, res, next) {
    try {
      const UserId = req.user.id
      const { numberPlate, brand, type } = req.body
      const car = await Cars.create(
        {
          UserId,
          numberPlate,
          brand,
          type,
          isDefault: true
        },
        {
          hooks: false
        }
      )
      res.status(201).json({ car, msg: "Car succefully created" })
    } catch (error) {
      next(error)
    }
  }

  static async addSecondCar (req, res, next) {
    try {
      const UserId = req.user.id
      const { numberPlate, brand, type } = req.body
      const car = await Cars.create(
        {
          UserId,
          numberPlate,
          brand,
          type,
        }
      )
      res.status(201).json({ car, msg: "Car succefully created" })
    } catch (error) {
      next(error)
    }
  }
}
module.exports = ControllerUser;

///TEST MIGRATION REPO
