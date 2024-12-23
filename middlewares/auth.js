"use strict";

const Errors = require("../util/Errors");
const expressFileUpload = require("express-fileupload");
const rateLimit = require("express-rate-limit");

const Auth = {
  validateApp: (req, res, next) => {
    /* Env Values */
    let _clientid = process.env.APP_CLIENT_ID;
    let _clientSecret = process.env.APP_CLIENT_SECRET;

    /* User Values */
    let clientid = req.headers["x-client-id"] || "";
    let clientsecret = req.headers["x-client-secret"] || "";

    try {
      if (!clientid) {
        throw new Error("Client Id is missing.");
      }
      if (!clientsecret) {
        throw new Error("Client Secret is missing");
      }
      if (_clientid !== clientid) {
        throw new Error("Invalid Client Id.");
      }
      if (_clientSecret !== clientsecret) {
        throw new Error("Invalid Client Secret");
      }
      next();
    } catch (e) {
      const errors = Errors.raise("UNAUTHORIZED_CLIENT_ID_SECRET");
      return res.status(errors.status).json(errors);
    }
  },
  validateToken: (req, res, next) => {
    let authHeader = req.headers["authorization"] || "";

    try {
      if (!authHeader) {
        const errors = Errors.raise("MISSING_TOKEN_FIELD");
        return res.status(errors.status).json(errors);
      }

      if (authHeader.startsWith("Bearer ")) {
        authHeader = authHeader.split(" ")[1];
      }

      req.token = authHeader;
      next();
    } catch (e) {
      const errors = Errors.raise("UNAUTHORIZED_ACCESS");
      return res.status(errors.status).json(errors);
    }
  },
  forgotPasswordLimiter: rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: Errors.get("INVALID_REQUEST_MAXED_OUT"),
  }),
  emailSendOtpLimiter: rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: Errors.get("INVALID_REQUEST_MAXED_OUT"),
  }),
  validateFileUpload: expressFileUpload(),
};

module.exports = Auth;
