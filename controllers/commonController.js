var CronJob = require("cron/lib/job");
const { task } = require("../cron/cron");
const { initScheduledJobs } = require("../cron/cron");
const {
  ParkingSlot,
  ParkingTransaction,
  User,
  Cars,
} = require("../models/index");
var cron = require("node-cron");
const parkingtransaction = require("../models/parkingtransaction");

class Controller {
  static async bookingSpot(req, res, next) {
    // testing ini belum selesai
    try {
      const { ParkingId } = req.params;
      const { id: UserId } = req.user;
      const { dateBooking } = req.body;

      const booking = await ParkingTransaction.create({
        UserId,
        ParkingId,
      });

      ///Function untuk menghitung mundur 1 jam setelah booking terbuat. Akan memeriksa carIn pada table booking, jika masih false setelah 1 jam (customer belum check-in) maka booking tersebut akan dihapus
      cron.schedule("1 * * * * *", async () => {
        ///cek kondisi carin
        const customerCar = await ParkingTransaction.findByPk(booking.id);
        if (!customerCar.carIn) {
          await ParkingTransaction.destroy({
            where: {
              id: customerCar.id,
            },
          });
          console.log("succes deleting" + " " + booking.id);
        }
      });
      res.status(201).json({ message: "successfully booking spots" });
    } catch (err) {
      console.log(err, `<<<<`);
      res.status(500).json(err);
    }
  }

  static async checkIn(req, res, next) {
    //testing ini belum selesai
    try {
      const { ParkingTransactionId } = req.params;
      await ParkingTransaction.update(
        {
          carIn: new Date(),
        },
        {
          where: ParkingTransactionId,
        }
      );
      res.status(200).json({
        message: "car checked in parking spot",
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getAllTickets(req, res, next) {
    try {
      const data = await ParkingTransaction.findAll({
        include: [{ model: User, include: [Cars] }],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;
