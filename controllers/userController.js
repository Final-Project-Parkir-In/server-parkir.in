const { comparePassword } = require("../helper/bcrypt");
const { createToken } = require("../helper/jwt");
const { User } = require("../models");

class ControllerUser {
  static async login(req, res, next) {
    // console.log("Masuk Login");
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "email is required" };
      if (!password) throw { name: "Password is require" };

      const user = await User.findOne({
        where: { email },
      });

      if (!user) throw { name: "Invalid Email or Password" };

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
      console.log(err, `<<<`);
      next(err);
    }
  }

  static async register(req, res, next) {
    // console.log("Masuk");
    let { email, password } = req.body; // ini di ubah aja ya pak sesuai database username jdi email
    try {
      let user = await User.create({
        email,
        password,
      });
      res.status(201).json({ id: user.id, email: user.email }); // ini di ubah supaya password gk kelihatan
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
module.exports = ControllerUser;

///TEST MIGRATION REPO
