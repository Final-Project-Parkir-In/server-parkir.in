const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User, Cars } = require("../models");

class ControllerUser {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: 'email is required' };
      if (!password) throw { name: 'Password is require' };

      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: 'Invalid Email or Password' };


      const validate = comparePassword(password, user.password);

      if (!validate) throw { name: "invalid_credentials" };

      const payload = {
        id: user.id,
        email: user.email,
      };

      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        email: payload.email,
        phoneNumber: user.phoneNumber,
        username: user.name,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      let { email, password, phoneNumber, name } = req.body;
      let dataUser = await User.create({
        email,
        password,
        phoneNumber,
        name,
      });
      res.status(201).json({ id: dataUser.id, email: dataUser.email }); // ini di ubah supaya password gk kelihatan
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getCars(req, res, next) {
    try {
      const UserId = req.user.id;
      let cars = await Cars.findAll({
        where: {
          UserId,
        },
      });
      res.status(200).json(cars);
    } catch (error) {
      next(error);
    }
  }

  static async addCar(req, res, next) {
    try {
      const {UserId} = req.params;
      const { numberPlate, brand, type } = req.body;
      const car = await Cars.create(
        {
          UserId,
          numberPlate,
          brand,
          type,
          isDefault: true,
        },
        {
          hooks: false,
        }
      );
      res.status(201).json({ car, msg: 'Car succefully created' });
    } catch (error) {
      next(error);
    }
  }

  static async addSecondCar(req, res, next) {
    try {
      const UserId = req.user.id;
      const { numberPlate, brand, type } = req.body;
      const car = await Cars.create({
        UserId,
        numberPlate,
        brand,
        type,
      });

      res.status(201).json({ car, msg: 'Car succefully created' });

    } catch (error) {
      next(error);
    }
  }

  static async changeDefaultCar(req, res, next) {
    try {
      const { carId } = req.params
      const UserId = req.user.id;

      ///changging previous cars default status to false
      await Cars.update(
        { isDefault: false },
        {
          where: {
            UserId,
            isDefault: true
          }
        }
      )

      //updating new car status
      await Cars.update(
        { isDefault: true },
        {
          where: {
            id: carId
          }
        }
      )
      res.status(200).json('Default car has been changed')
    } catch (error) {
      next(error)
    }
  }
}
module.exports = ControllerUser;

///TEST MIGRATION REPO
