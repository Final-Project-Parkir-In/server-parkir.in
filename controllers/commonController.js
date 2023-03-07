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
        include: [
          {
            model: ParkingSlot,
            include: Mall,
          },
          {
            model: User,
            include: Cars,
          },
        ],
        order: [
          ["id", "DESC"],
          ["createdAt", "DESC"],
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getTicket(req, res, next) {
    try {
      console.log("masuk");
      const { id } = req.params;
      const data = await ParkingTransaction.findOne({
        attributes: ["id", "createdAt", "carIn", "isExpired"],
        include: [
          {
            model: User,
            attributes: ["email", "name", "phoneNumber"],

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
              attributes: ["name", "address", "imgUrl"],
            },
          },
        ],
        where: {
          id,
        },
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
      console.log("masuk");
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
