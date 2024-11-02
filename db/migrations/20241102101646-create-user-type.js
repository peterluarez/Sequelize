"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("userType", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      identifier: {
        allowNull: false,
        type: Sequelize.STRING(256),
      }, 
      text: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("userType");
  },
};
