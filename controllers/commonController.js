const {
  ParkingSlot,
  ParkingTransaction,
  User,
  Cars,
  Mall,
} = require("../models/index");
var cron = require("node-cron");

class Controller {
  ///controller untuk mendapatkan ticket sesuai dengan user yang sedang login
  static async getAllTickets(req, res, next) {
    try {
      const UserId = req.user.id;
      const data = await ParkingTransaction.findAll({
        where: {
          UserId,
        },
        attributes: {exclude: ['createdAt', 'updatedAt']},
        include: [
          {
            model: User,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: [Cars],
          },
        ],
        include: [
          {
            model: ParkingSlot,
            attributes: {exclude: ['createdAt', 'updatedAt']},
            include: {
              model:Mall,
              attributes: {exclude: ['createdAt', 'updatedAt']}
            },
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getTicket(req, res, next) {
    try {
      const { id } = req.params;
      const data = await ParkingTransaction.findByPk(id, {
        attributes: ["id", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["id","email"],
            include: {
              model: Cars,
              where: {
                isDefault: true,
              },
              attributes: ["numberPlate", "brand", "type"],
            },
          },
          {
            model: ParkingSlot,
            attributes: ["spot"],
            include: {
              model: Mall,
              attributes: ["name"],
            },
          },
        ],
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async checkOut(req, res, next) {
    try {
      const { ParkingTransactionId } = req.params;
      const data = await ParkingTransaction.findByPk(ParkingTransactionId, {
        attributes: ["id", "createdAt"],
        include: [
          {
            model: User,
            attributes: ["email", "name"],
            include: [
              {
                model: Cars,
                attributes: ["numberPlate", "brand", "type"],
              },
            ],
          },
          {
            model: ParkingSlot,
            attributes: ["spot"],
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
