const express = require("express");
const router = express.Router();
const status = require("./v1/status/status");
const user = require("./v1/user/user");
 

router.use("/v1/status", status);
router.use("/v2/status", status);
router.use("/v1/user", user);
 

module.exports = router;
