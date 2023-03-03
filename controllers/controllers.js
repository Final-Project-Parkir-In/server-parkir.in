const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models");

class ControllerUser {
  static async login(req, res, next) {
    console.log("Masuk Login");
    try {
      const { email, password } = req.body;

      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: 'InvalidCredentials' };

      const validate = comparePassword(password, user.password);

      if (!validate) throw { name: 'InvalidCredentials' };


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
      console.log(err);
      next(err);
    }
  }


  static async register(req, res, next) {
    console.log("Masuk");
    try {
      let { username, password } = req.body;
      let user = await User.create({
        username,
        password
      });
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

}
module.exports = ControllerUser;


///TEST MIGRATION REPO
