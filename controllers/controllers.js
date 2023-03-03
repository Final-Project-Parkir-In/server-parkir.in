const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models");

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
      console.log(err);
      next(err);
    }
  }

  static async register(req, res, next) {
    console.log("Masuk");
    try {
      const { email, password } = req.body;
      const data = await User.create({ email, password });
      res
        .status(201)
        .json({ email: data.email, message: `Succes add Customer` });
    } catch (error) {
      console.log(error, `DARI SERVER`);
      next(error);
    }
  }
}
module.exports = ControllerUser;
