var CronJob = require("cron/lib/job");
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
