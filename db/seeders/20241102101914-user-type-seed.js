"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Truncate the table and reset identity before inserting
    await queryInterface.sequelize.query('TRUNCATE TABLE "userType" RESTART IDENTITY CASCADE');
    await queryInterface.bulkInsert("userType", [
      { 
        identifier: "VOTER",
        text: "Voter",
      },
      { 
        identifier: "ADMIN",
        text: "Admin",
      },
      { 
        identifier: "STAFF_VOLUNTER",
        text: "Staff Volunter",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Bulk delete and reset identity
    await queryInterface.bulkDelete("userType", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true
    });
  },
};
