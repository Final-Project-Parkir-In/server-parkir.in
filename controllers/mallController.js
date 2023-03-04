const { Mall } = require("../models/index.js");
class ControllerMall {
  static async getAllMalls(req, res, next) {
    try {
      const allMall = await Mall.findAll();
      res.status(200).json(allMall);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ControllerMall;
