const geolib = require("geolib");
const { Mall, ParkingSlot } = require("../models/index.js");
const geolib = require("geolib");
class ControllerMall {
  static async getAllMalls(req, res, next) {
    try {
      const option = {};

      const searchTerm = req.query.term;
      if (searchTerm) {
        option.where.name = {
          [Sequelize.Op.like]: `%${searchTerm}%`,
        };
      }
      const allMall = await Mall.findAll(option);
      res.status(200).json(allMall);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getMallById(req, res, next) {
    try {
      const { id } = req.params;
      const mallDetail = await Mall.findOne({
        where: {
          id,
        },
      });
      if (!mallDetail) throw { name: "Mall not found" }; // ini gw tambahni supaya % nya nambah
      res.status(200).json(mallDetail);
    } catch (err) {
      res.status(500).json(err);
      next(err);
    }
  }

  static async getParkingSlots(req, res, next) {
    try {
      const { MallId } = req.params;
      const data = await ParkingSlot.findAll({
        where: {
          MallId,
        },
      });
      if (data.length === 0) throw { name: "slot parking not found" };
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async getClosestMalls(req, res, next) {
    try {
      const { lat, long } = req.body; //revieving user position from FE

      const malls = await Mall.findAll();

      const userPosition = {
        latitude: lat,
        longitude: long,
      };

      const data = malls.filter((mall) => {
        const mallLongLat = { latitude: mall.lat, longitude: mall.long };
        const distance = geolib.getDistance(userPosition, mallLongLat);
        return distance < 5000;
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerMall;
