'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('userss', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Users', 'name', Sequelize.TEXT);
    await queryInterface.addColumn('Users', 'phoneNumber', Sequelize.TEXT);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('userss');
     */
    await queryInterface.removeColumn('Users', 'name');
    await queryInterface.removeColumn('Users', 'phoneNumber');
  },
};
