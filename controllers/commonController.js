var CronJob = require('cron/lib/job');
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
      var job = new CronJob(
        '* * * * * *',
        function() {
          console.log('You will see this message every second');
        },
        null,
        true,
        'America/Los_Angeles'
      );
      job.start()

      
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


  static async booking(req, res, next) {
    try {
      ///cek slot

      ///cek venue

      //booking

      //createBooking



    } catch (error) {
      
    }
  }
}

module.exports = Controller;
