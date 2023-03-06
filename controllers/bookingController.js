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
const {
  ParkingSlot,
  ParkingTransaction,
  User,
  Cars,
} = require("../models/index");
var cron = require("node-cron");
const base64 = require("base-64");
const parkingtransaction = require("../models/parkingtransaction");
const { CronJob } = require("cron");

class BookingController {
  static async bookingSpot(req, res, next) {
    try {
      const { ParkingId } = req.params;
      const { id: UserId } = req.user;
      //cek slot parking availability
      const checkSlot = await ParkingSlot.findOne({
        where: {
          id: ParkingId,
        },
      });
      if (!checkSlot) {
        throw { msg: "parking slot not found" };
      }
      //membuat transaksi
      const ticket = await ParkingTransaction.create({
        UserId,
        ParkingId,
      });
      // Function cron untuk menghitung mundur 1 jam setelah booking terbuat. Akan memeriksa carIn pada table booking, jika masih false setelah 1 jam (customer belum check-in) maka booking tersebut akan dihapus

      let counter = 0;

      const task = cron.schedule("* 1 * * * *", () => {
        counter++;
        if (counter === 1) {
          ParkingTransaction.update(
            {
              isExpired: true,
            },
            {
              where: {
                id: ticket.id,
              },
            }
          );

          console.log("running a task only once");
          task.destroy(); // destroy the task after it runs once
        }
      });

      task.start();

      res.status(201).json({ message: "successfully booking spots" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async checkIn(req, res, next) {
    try {
      const { ParkingTransactionId } = req.params;
      const { isExpired } = await ParkingTransaction.findByPk(
        ParkingTransactionId
      );
      if (isExpired) {
        res.status(400).json({
          message: "Your ticket is already expired",
        });
        return;
      }
      await ParkingTransaction.update(
        {
          carIn: new Date(),
        },
        {
          where: {
            id: ParkingTransactionId,
          },
        }
      );
      res.status(200).json({
        message: "car checked in parking spot",
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async checkOut(req, res, next) {
    try {
      const { ParkingTransactionId } = req.params;
      // mendapatkan semua data transaction
      const transaction = await ParkingTransaction.findOne({
        where: {
          id: ParkingTransactionId,
        },
        include: [ParkingSlot, User],
      });
      // bandingkan waktu saat cek out dan cek in
      const checkInTime = new Date(transaction.carIn);
      const checkOutTime = new Date();
      const diffInMs = Math.ceil(
        Math.abs(checkInTime.getTime() - checkOutTime.getTime()) / 3600000
      ); // Difference in milliseconds
      // console.log(diffInMs);
      const hours = Math.ceil(diffInMs / (1000 * 60 * 60)); // Difference in hours
      //harga yang harus di bayar
      const price = hours * transaction.ParkingSlot.priceOfSpot;
      console.log(
        price,
        hours,
        diffInMs,

        "ini cui"
      );

      // on production dont place the server key he
      // dont forget add ":" in the end of the string
      const serverKey = "SB-Mid-server-eYv4NQeO2ODjMM6ywHr_YFX9:";
      const base64Key = base64.encode(serverKey);
      const orderID =
        "Your-Order-id" + Math.floor(100000000000 + Math.random() * 90000000);
      const url = "https://app.sandbox.midtrans.com/snap/v1/transactions";
      const data = {
        transaction_details: {
          order_id: orderID,
          gross_amount: price,
        },
        item_details: [
          {
            id: "SPOT-ID-" + transaction.ParkingSlot.id,
            price: price,
            quantity: 1,
            name: "Parking slot at Pondok Indah",
            category: "spot parking",
            merchant_name: "Merchant",
          },
        ],
        credit_card: {
          secure: true,
        },
        customer_details: {
          name: transaction.User.name || "Uhui",
          email: transaction.User.email,
          phone: transaction.User.phoneNumber || "0822981928",
        },
      };
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Basic " + base64Key,
        },
        body: JSON.stringify(data),
      });
      const redirToken = await response.json();
      res.status(200).json(redirToken);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
      // next(err);
    }
  }
}

module.exports = BookingController;
