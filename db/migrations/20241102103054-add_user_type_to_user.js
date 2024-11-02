"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("user", "user_type", { 
        type: Sequelize.INTEGER,
        references: {
          model: "userType",
          key: "id", 
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("user", "user_type");
  },
};