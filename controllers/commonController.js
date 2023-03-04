var CronJob = require('cron/lib/job');
const { initScheduledJobs } = require('../cron/cron');
const {
  ParkingSlot,
  ParkingTransaction,
  User,
  Cars,
} = require('../models/index');
var cron = require('node-cron');
const parkingtransaction = require('../models/parkingtransaction');

class Controller {
  static async checkIn(req, res, next) {
    try {
      const { ParkingTransactionId } = req.params;
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
        message: 'car checked in parking spot',
      });
    } catch (err) {
      console.log(err);
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
  static async checkOut(req, res, next) {
    try {
      // on production dont place the server key he
      // dont forget add ":" in the end of the string
      const serverKey = 'SB-Mid-server-eYv4NQeO2ODjMM6ywHr_YFX9:';
      const base64Key = base64.encode(serverKey);
      const orderID =
        'Your-Order-id' + Math.floor(100000000000 + Math.random() * 90000000);
      const url = 'https://app.sandbox.midtrans.com/snap/v1/transactions';
      const data = {
        transaction_details: {
          order_id: orderID,
          gross_amount: 20000,
        },
        item_details: [
          {
            id: 'PRODUCTID1',
            price: 20000,
            quantity: 1,
            name: 'spot 2',
            category: 'Clothes',
            merchant_name: 'Merchant',
          },
        ],
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: 'budi',
          last_name: 'pratama',
          email: 'budi.pra@example.com',
          phone: '08111222333',
        },
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Basic ' + base64Key,
        },
        body: JSON.stringify(data),
      });
      res.status(200).json(response);
    } catch (err) {}
  }
}

module.exports = Controller;
