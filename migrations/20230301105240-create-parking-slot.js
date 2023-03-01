'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkingSlots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      spot: {
        type: Sequelize.STRING
      },
      isAvailable: {
        type: Sequelize.BOOLEAN
      },
      priceOfSpot: {
        type: Sequelize.INTEGER
      },
      MallId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Malls',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ParkingSlots');
  }
};