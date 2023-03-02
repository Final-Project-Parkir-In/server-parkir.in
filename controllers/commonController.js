const { ParkingSlot, ParkingTransaction } = require('../models/index');
class Controller {
  static async bookingSpot(req, res, next) {
    try {
      const { ParkingId } = req.params;
      const { id: UserId } = req.user;
      const { dateBooking } = req.body;
      const booking = await ParkingTransaction.create({
        UserId,
        ParkingId,
        dateBooking,
      });
      res.status(201).json({ message: 'successfully booking spots' });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async checkIn(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { ParkingId } = req.params;
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
