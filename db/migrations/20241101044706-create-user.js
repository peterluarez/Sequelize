"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }, 
      first_name: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      middle_name: {
        allowNull: true,
        type: Sequelize.STRING(256),
      },
      last_name: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(256),
        unique: true,
      },
      mobile_number: {
        allowNull: false,
        type: Sequelize.STRING(12),
        unique: true,
      },
      voters_id_number: {
        allowNull: false,
        type: Sequelize.STRING(100),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(256),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("user");
  },
};
