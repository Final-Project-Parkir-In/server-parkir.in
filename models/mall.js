'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Mall.hasMany(models.ParkingSlot, {foreignKey: "MallId"})
    }
  }
  Mall.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      long: DataTypes.STRING,
      lat: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Mall',
    }
  );
  return Mall;
};
