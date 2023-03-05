const { Mall, ParkingSlot } = require('../models/index.js');
class ControllerMall {
  static async getAllMalls(req, res, next) {
    try {
      const option = {}

      const searchTerm = req.query.term
      if (searchTerm) {
        option.where.name = {
          [Sequelize.Op.like]: `%${searchTerm}%`
        }
      }
      const allMall = await Mall.findAll(option);
      res.status(200).json(allMall);
    } catch (err) {
      res.status(500).json(err);
    }
  }


  static async getParkingSlots(req, res, next) {
    try {
      const { MallId } = req.params
      const data = await ParkingSlot.findAll({
        where: {
          MallId
        }
      })
      res.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerMall;
