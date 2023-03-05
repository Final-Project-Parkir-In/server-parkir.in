<<<<<<< HEAD
"use strict";
const { Model } = require("sequelize");
=======
'use strict';
const { Model } = require('sequelize');
>>>>>>> checkOut-upnormal
module.exports = (sequelize, DataTypes) => {
  class ParkingSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
<<<<<<< HEAD
      ParkingSlot.belongsTo(models.Mall, { foreignKey: "MallId" });
=======
      ParkingSlot.belongsTo(models.Mall, { foreignKey: 'MallId' });
      // ParkingSlot.hasOne(models.ParkingTransaction);
      ParkingSlot.hasOne(models.ParkingTransaction, {
        foreignKey: 'ParkingId',
      });
>>>>>>> checkOut-upnormal
    }
  }
  ParkingSlot.init(
    {
      spot: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
      priceOfSpot: DataTypes.INTEGER,
      MallId: DataTypes.STRING,
    },
    {
      sequelize,
<<<<<<< HEAD
      modelName: "ParkingSlot",
=======
      modelName: 'ParkingSlot',
>>>>>>> checkOut-upnormal
    }
  );
  return ParkingSlot;
};
