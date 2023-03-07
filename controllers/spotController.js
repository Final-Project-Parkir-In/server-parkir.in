const { ParkingSlot } = require('../models');
class ControllerSpot {
  static async getAllSpots(req, res, next) {
    try {
      const { MallId } = req.params;
      const allSpots = await ParkingSlot.findAll({
        where: {
          MallId,
        },
      });
      res.status(200).json(allSpots);
    } catch (err) {
      console.log(err, `INI ERORNYA`); ///
      res.status(500).json(err);
    }
  }
  static async addSlot(req, res, next) {
    try {
      let { spot, isAvailable = true, priceOfSpot, MallId } = req.body;
      let data = await ParkingSlot.create({
        spot,
        isAvailable,
        priceOfSpot,
        MallId,
      });
      res.status(201).json({ name: `Success add Spot` });
    } catch (error) {
      console.log(error, `<<<`);
      next(error);
    }
  }
}

module.exports = ControllerSpot;
