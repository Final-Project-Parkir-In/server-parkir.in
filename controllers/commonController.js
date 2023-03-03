var CronJob = require('cron/lib/job');
const { task } = require('../cron/cron');
const { initScheduledJobs } = require('../cron/cron');
const { ParkingSlot, ParkingTransaction, User } = require('../models/index');
var cron = require('node-cron');

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
      
      ///Function untuk menghitung mundur 1 jam setelah booking terbuat. Akan memeriksa carIn pada table booking, jika masih false setelah 1 jam (customer belum check-in) maka booking tersebut akan dihapus
      cron.schedule('1 * * * * *', async () => {
        console.log('cron run')
        ///cek kondisi carin 
        const customerCar = await ParkingTransaction.findByPk(booking.id)
        if (!customerCar.carIn) {
          await ParkingTransaction.destroy({
            where: {
              id: customerCar.id
            }
          })
          console.log("succes deleting" + " " + booking.id)
        }
        console.log('gajadi hapus')
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
