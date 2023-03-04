/**README !!!!
 * Controller for handling all booking and payment proccess
 * 1. Book Parking slot
 * 2. Check-in
 * 3. CheckOut-including payment
 * 
 * Don't touch this message
 * 
 * update: Sat, 3 PM => User can do booking through this controller
 */


const { initScheduledJobs } = require("../cron/cron");
const {
  ParkingSlot,
  ParkingTransaction,
  User,
  Cars,
} = require("../models/index");
var cron = require("node-cron");
const parkingtransaction = require("../models/parkingtransaction");


class BookingController {
  static async bookingSpot(req, res, next) {
    try {
      const { ParkingId } = req.params;
      const { id: UserId } = req.user;
      const { dateBooking } = req.body;

      if (new Date(dateBooking) < new Date()) {
        throw {
          name: "invalid_validation",
          msg: "Invalid date",
        };
      }
      ///cek slot parking availability
      const checkSlot = await ParkingSlot.findOne({
        where: {
          id: ParkingId,
        },
      });
      if (!checkSlot) {
        throw { msg: "parking slot not found" };
      }
      ///membuat transaksi
      const ticket = await ParkingTransaction.create({
        UserId,
        ParkingId,
        dateBooking,
      });
      //Function cron untuk menghitung mundur 1 jam setelah booking terbuat. Akan memeriksa carIn pada table booking, jika masih false setelah 1 jam (customer belum check-in) maka booking tersebut akan dihapus
      cron.schedule("1 * * * * *", async () => {
        console.log('enter the cron')
        const {carIn} = await ParkingTransaction.findByPk(ticket.id);
        if (!carIn) {
          await ParkingTransaction.update(
            {
              isExpired: true,
            },
            {
              where: {
                id: ticket.id,
              },
            }
          );
          cron.stop()
        }
      });
      //cron end
      res.status(201).json({ message: "successfully booking spots" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async checkIn(req, res, next) {
    try {
      const { ParkingTransactionId } = req.params;
      ///check isexpire first
      const {isExpired} = await ParkingTransaction.findByPk(ParkingTransactionId)
      if(isExpired) {
        res.status(400).json({
          message: "Your ticket is already expired",
        });
      }
      await ParkingTransaction.update(
        {
          carIn: new Date(),
        },
        {
          where: {
            id: ParkingTransactionId,
          }
        }
      );
      res.status(200).json({
        message: "car checked in parking spot",
      });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }
}


module.exports = BookingController;