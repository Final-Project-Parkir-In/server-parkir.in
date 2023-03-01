'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingSlot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParkingSlot.init({
    spot: DataTypes.STRING,
    isAvailable: DataTypes.BOOLEAN,
    priceOfSpot: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ParkingSlot',
  });
  return ParkingSlot;
};