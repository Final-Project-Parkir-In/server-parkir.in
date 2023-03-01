'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ParkingTransactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      ParkingId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'ParkingSlots',
          key: 'id',
        },
      },
      amountToPay: {
        type: Sequelize.INTEGER,
      },
      dateBooking: {
        type: Sequelize.DATE,
      },
      carIn: {
        type: Sequelize.DATE,
      },
      carOut: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ParkingTransactions');
  },
};
