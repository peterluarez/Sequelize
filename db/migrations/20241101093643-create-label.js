"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("label", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING(256),
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
    await queryInterface.dropTable("label");
  },
};
