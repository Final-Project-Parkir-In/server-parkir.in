const { ParkingSlot } = require('../models');
class ControllerSpot {
  static async getAllSpots(req, res, next) {
    try {
      console.log('masuk booking?');
      const { MallId } = req.params;
      const allSpots = await ParkingSlot.findAll({
        where: {
          MallId,
        },
      });
      res.status(200).json(allSpots);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = ControllerSpot;
