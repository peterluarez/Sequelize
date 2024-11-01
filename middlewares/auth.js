"use strict";

const rekuire = require("rekuire");
const Errors = rekuire("Errors");
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
      let errors = Errors.raise("UNAUTHORIZED_ACCESS");
      errors.error.details = e.message || {};
      res.error(errors);
    }
  },
  validateToken: (req, res, next) => {
    let authHeader = req.headers["authorization"] || "";

    try {
      if (!authHeader) {
        throw new Error("Authorization header is missing.");
      }

      if (authHeader.startsWith("Bearer ")) {
        authHeader = authHeader.split(" ")[1];
      }

      req.token = authHeader;
      next();
    } catch (e) {
      let errors = Errors.raise("UNAUTHORIZED_ACCESS");
      errors.error.details = e.message || {};
      res.error(errors);
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
