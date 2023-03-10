const geolib = require('geolib');
const redis = require('../config/redisConfig.js');
const { Mall, ParkingSlot } = require("../models/index.js");
class ControllerMall {
  static async getAllMalls(req, res, next) {
    try {
      const cachedMalls = await redis.get("malls");
      if (cachedMalls) {
        return res.status(200).json(JSON.parse(cachedMalls));
      }
      const option = {};
      const searchTerm = req.query.term;
      if (searchTerm) {
        option.where.name = {
          [Sequelize.Op.like]: `%${searchTerm}%`,
        };
      }
      const allMall = await Mall.findAll(option);
      await redis.set("malls", JSON.stringify(allMall));
      res.status(200).json(allMall);
    } catch (err) {
      next(err)
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
      await redis.set("mall", JSON.stringify(mallDetail));
      res.status(200).json(mallDetail);
    } catch (err) {
      res.status(500).json(err);
      next(err);
    }
  }

  static async getParkingSlots(req, res, next) {
    try {
      const { MallId } = req.params;
      const cachedParkingSlots = await redis.get("slots");
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
      const { lat, long } = req.body //revieving user position from FE

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
