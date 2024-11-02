const express = require("express");
const router = express.Router();
const status = require("./v1/status/status");
const statusV2 = require("./v1/status/status");
const user = require("./v1/user/user");
const label = require("./v1/label/label");
 

router.use("/v1/status", status);
router.use("/v2/status", statusV2);
router.use("/v1/user", user);
router.use("/v1/label", label);
 

module.exports = router;
