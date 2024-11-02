const express = require("express");
const router = express.Router();
const libraryController = require("./labelController");

router.get("/", libraryController.getAllLabel); 

module.exports = router;
