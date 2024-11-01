"use strict";
const environment = process.env.NODE_ENV;
const User = require("../../../db/models/user");
const Errors = require("../../../util/Errors");
const Utility = require("../../../util/utility");

module.exports = {
  getUser: async (req, res) => {
    try {
      const id = req.params.id;

      const checkUser = await User.findOne({
        where: { id: id },
      });

      if (!checkUser) {
        const errors = Errors.raise("NOT_FOUND");
        return res.status(errors.status).json(errors);
      }

      return res.status(200).json({
        status: "Success",
        data: {
          firstName: checkUser.firstName || null,
          middleName: checkUser.middleName || null,
          lastName: checkUser.lastName || null,
          email: checkUser.email || null,
          mobileNumber: checkUser.mobileNumber || null,
          votersIdNumber: checkUser.votersIdNumber || null,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: environment === "development" ? error.message : null,
      });
    }
  },
  createUser: async (req, res) => {
    try {
      const {
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        votersIdNumber,
        password,
      } = req.body;

      const missingFields = Utility.validateRequiredFields({
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        votersIdNumber,
        password,
      });

      if (missingFields.length > 0) {
        const errors = Errors.raise("REQUIRED_FIELDS");
        errors.error.fields = missingFields;

        return res.status(errors.status).json(errors);
      }

      const checkUser = await User.findOne({
        where: { votersIdNumber: votersIdNumber },
      });

      if (checkUser) {
        const errors = Errors.raise("EXISTING_USER");
        return res.status(errors.status).json(errors);
      }

      await User.create({
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        votersIdNumber,
        password,
      });

      return res
        .status(200)
        .json({ status: "Success", message: "User created successfully" });
    } catch (error) {
      res.status(500).json({
        error: environment === "development" ? error.message : null,
      });
    }
  },
};
