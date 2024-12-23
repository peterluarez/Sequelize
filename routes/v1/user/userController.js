"use strict";
const environment = process.env.NODE_ENV;
const User = require("../../../db/models/user");
const Errors = require("../../../util/Errors");
const Utility = require("../../../util/utility");
const UserType = require("../../../db/models/userType");
const config = require("../../../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
  signIn: async (req, res) => {
    try {
      const { votersIdNumber, password } = req.body;

      const missingFields = Utility.validateRequiredFields({
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

      if (!checkUser) {
        const errors = Errors.raise("NOT_FOUND");
        return res.status(errors.status).json(errors);
      }

      if (!checkUser.authenticate(password)) {
        const errors = Errors.raise("INVALID_ID_OR_PASSWORD");
        return res.status(errors.status).json(errors);
      }

      const id = checkUser.id;

      const tokenSignIn = jwt.sign(
        { id, votersIdNumber },
        config.development.secret,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        result: {
          message: "Sign-in success",
          token: tokenSignIn,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: environment === "development" ? error.message : null,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const checkToken = jwt.verify(req.token, config.development.secret);
      if (!checkToken) {
        const errors = Errors.raise("INVALID_TOKEN");
        return res.status(errors.status).json(errors);
      }

      const votersId = req.params.votersId;

      const checkUser = await User.findOne({
        include: [
          {
            model: UserType,
            as: "userTypeId",
            attributes: ["id", "identifier", "text"],
          },
        ],
        where: { votersIdNumber: votersId },
      });

      if (!checkUser) {
        const errors = Errors.raise("NOT_FOUND");
        return res.status(errors.status).json(errors);
      }

      return res.status(200).json({
        message: "Success",
        data: {
          firstName: checkUser.firstName || null,
          middleName: checkUser.middleName || null,
          lastName: checkUser.lastName || null,
          email: checkUser.email || null,
          mobileNumber: checkUser.mobileNumber || null,
          votersIdNumber: checkUser.votersIdNumber || null,
          userType: checkUser.userTypeId || [],
        },
      });
    } catch (error) {
      res.status(500).json({
        error: environment === "development" ? error.message : null,
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      const checkToken = jwt.verify(req.token, config.development.secret);
      if (!checkToken) {
        const errors = Errors.raise("INVALID_TOKEN");
        return res.status(errors.status).json(errors);
      }

      const page = parseInt(req.query?.page) || 1;
      const size = parseInt(req.query?.size) || 10;

      const queryOptions = {
        include: [
          {
            model: UserType,
            as: "userTypeId",
            attributes: ["id", "identifier", "text"],
          },
        ],
        limit: size,
        offset: (page - 1) * size,
      };

      const checkUser = await User.findAndCountAll(queryOptions);

      const totalPages = Math.ceil(checkUser.count / size);

      const formattedData = checkUser.rows.map((user) => ({
        id: user.id,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        votersIdNumber: user.votersIdNumber,
        userType: user.userTypeId
          ? {
              id: user.userTypeId.id,
              identifier: user.userTypeId.identifier,
              text: user.userTypeId.text,
            }
          : [],
      }));

      return res.status(200).json({
        message: "Success",
        data: formattedData,
        page: page,
        size: size,
        total: checkUser.count,
        pages: totalPages,
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
        userType,
        firstName,
        middleName,
        lastName,
        email,
        mobileNumber,
        votersIdNumber,
        password,
      } = req.body;

      const missingFields = Utility.validateRequiredFields({
        userType,
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
        userType,
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
        .json({ message: "Success", details: "User created successfully" });
    } catch (error) {
      res.status(500).json({
        error: environment === "development" ? error.message : null,
      });
    }
  },
};
