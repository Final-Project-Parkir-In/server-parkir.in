const { Mall, ParkingSlot } = require("../models/index.js");
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

  ///malls mongodb
  static async addMalls(req, res, next) {
    try {
      const { name, location } = req.body;
      // if (!name) {
      //   throw { name:"BAD REQUEST" }
      // }
      console.log(name, location);
      await MallsMongodb.addMalls({
        name,
        location,
      });
      res.status(201).json({ message: "success" });
    } catch (err) {
      next(err);
    }
  }

  static async getNearestMalls(req, res, next) {
    try {
      const nearestMall = await MallsMongodb.getNearest();
      console.log(nearestMall);
      res.status(200).json(nearestMall);
    } catch (error) {
      next(error);
    }
  }

  static async getClosestMalls(req, res, next) {
    try {
      const malls = await Mall.findAll();

      const userPosition = {
        latitude: -6.262191092145527,
        longitude: 106.78205179473733,
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
