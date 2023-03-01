'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cars.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  Cars.init({
    numberPlate:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: true,
        msg: "plat is already on list",
      },
      validate: {
        notNull: {
          msg: "plat is required",
        },
        notEmpty: {
          msg: "plat is required",
        },
      },
    },
    brand: DataTypes.STRING,
    type: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cars',
  });
  return Cars;
};