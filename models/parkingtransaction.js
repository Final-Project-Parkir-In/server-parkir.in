'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParkingTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingTransaction.belongsTo(models.User, { foreignKey: "UserId" })
      ParkingTransaction.hasOne(models.ParkingSlot, {
        foreignKey: 'ParkingId',
      });
    }
  }
  ParkingTransaction.init(
    {
      UserId: DataTypes.INTEGER,
      ParkingId: DataTypes.INTEGER,
      amountToPay: DataTypes.INTEGER,
      dateBooking: DataTypes.DATE,
      carIn: DataTypes.DATE,
      carOut: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'ParkingTransaction',
    }
  );
  return ParkingTransaction;
};
