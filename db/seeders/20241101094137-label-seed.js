"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("label", [
      {
        type: "missionText",
        identifier: "HOME",
        text: "Home",
      },
      {
        type: "missionText",
        identifier: "ABOUT_US",
        text: "About Us",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("label", {
      identifier: ["HOME", "ABOUT_US"],
    });
  },
};

