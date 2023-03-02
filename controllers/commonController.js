const CronJob = require('cron/lib/job');
const { ParkingSlot, ParkingTransaction, User } = require('../models/index');

class Controller {
  static async bookingSpot(req, res, next) {
    try {
      const { ParkingId } = req.params;
      const { id: UserId } = req.user;
      const { dateBooking } = req.body;

      const booking = await ParkingTransaction.create({
        UserId,
        ParkingId,
      });
      //// >>>> cron here
      var job = new CronJob('* 10 * * * *', function () {
        const d = new Date();
        console.log('At Ten Minutes:', d);
      });
      
      job.start();

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
