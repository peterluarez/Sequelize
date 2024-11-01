const express = require("express");
const router = express.Router();
const statusController = require("./statusController");

router.get("/", statusController.checkStatus); 

module.exports = router;
