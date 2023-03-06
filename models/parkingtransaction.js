"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ParkingTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ParkingTransaction.belongsTo(models.User, { foreignKey: "UserId" });
      ParkingTransaction.belongsTo(models.ParkingSlot, {
        foreignKey: "ParkingId",
      });
    }
  }
  ParkingTransaction.init(
    {
      UserId: DataTypes.INTEGER,
      ParkingId: DataTypes.INTEGER,
      amountToPay: DataTypes.INTEGER,
      carIn: DataTypes.DATE,
      carOut: DataTypes.DATE,
      isExpired: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ParkingTransaction",
    }
  );
  ParkingTransaction.beforeCreate((transaction) => {
    transaction.isExpired = false;
  });
  return ParkingTransaction;
};
