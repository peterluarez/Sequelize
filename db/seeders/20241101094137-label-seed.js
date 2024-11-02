"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Truncate the table and reset identity before inserting
    await queryInterface.sequelize.query('TRUNCATE TABLE "label" RESTART IDENTITY CASCADE');
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
    // Bulk delete and reset identity
    await queryInterface.bulkDelete("label", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  },
};
