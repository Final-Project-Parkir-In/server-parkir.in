var CronJob = require('cron/lib/job');
const { task } = require('../cron/cron');
const { initScheduledJobs } = require('../cron/cron');
const {
  ParkingSlot,
  ParkingTransaction,
  User,
  Cars,
  Mall,
} = require('../models/index');
var cron = require('node-cron');
const parkingtransaction = require('../models/parkingtransaction');

class Controller {
  ///controller untuk mendapatkan ticket sesuai dengan user yang sedang login
  static async getAllTickets(req, res, next) {
    try {
      const UserId = req.user.id;
      const data = await ParkingTransaction.findAll({
        where: {
          UserId,
        },
        include: [
          {
            model: User,
            include: [Cars],
          },
        ],
        include: [
          {
            model: ParkingSlot,
            include: Mall,
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTicket(req, res, next) {
    try {
      const { ParkingTransactionId } = req.params;
      const data = await ParkingTransaction.findByPk(ParkingTransactionId, {
        attributes: ['id', 'createdAt'],
        include: [
          {
            model: User,
            attributes: ['email', 'name'],
            include: [
              {
                model: Cars,
                attributes: ['numberPlate', 'brand', 'type'],
              },
            ],
          },
          {
            model: ParkingSlot,
            attributes: ['spot'],
            include: {
              model: Mall,
            },
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
