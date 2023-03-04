const { ParkingSlot, ParkingTransaction, User } = require('../models/index');
var cron = require('node-cron');
const { task } = require('../routes');
const base64 = require('base-64');

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
      // fix conflict

      res.status(201).json({ message: 'successfully booking spots' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  static async checkIn(req, res, next) {
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
        message: 'car checked in parking spot',
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async checkOut(req, res, next) {
    try {
      console.log('masuk cokk');
      const { ParkingTransactionId } = req.params;
      // mendapatkan semua data transaction
      const transaction = await ParkingTransaction.findAll({
        where: {
          id: ParkingTransactionId,
        },
        include: ParkingSlot,
      });
      // bandingkan waktu saat cek out dan cek in
      const checkInTime = new Date(transaction.checkIn);
      const checkOutTime = new Date();
      const diffInMs = checkOutTime - checkInTime; // Difference in milliseconds
      const hours = Math.ceil(diffInMs / (1000 * 60 * 60)); // Difference in hours
      //harga yang harus di bayar
      const price = hours * transaction.ParkingSlot.priceOfSpot;
      console.log(price, 'ini harga yang harus di bayar');

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
      // bentuk nya {redirect_url:'',token:''} untuk user redirect ke halam midtrans
      const redirToken = await response.json();
      res.status(200).json(redirToken);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = Controller;
