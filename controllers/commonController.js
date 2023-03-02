const { ParkingSlot, ParkingTransaction, User } = require('../models/index');
class Controller {
  static async bookingSpot(req, res, next) {
    try {
      ///date booking harusnya tidak perlu karena sudah bisa memakai created at
      const { ParkingId } = req.params;
      const { id: UserId } = req.user;
      const { dateBooking } = req.body;

      
      const booking = await ParkingTransaction.create({
        UserId,
        ParkingId,
      });
      res.status(201).json({ message: 'successfully booking spots' });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

  static async checkIn(req, res, next) {
    try {
      const { id: UserId } = req.user;
      const { ParkingId } = req.params;
      const foundUser = User.findOne({
        where: id
      })
      console.log(foundUser)
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
