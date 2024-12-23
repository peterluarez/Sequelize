const express = require("express");
const router = express.Router();
const userController = require("./userController");
const auth = require("../../../middlewares/auth")

router.get("/", auth.validateApp, auth.validateToken, userController.getAllUser);
router.post("/auth/sign-in", auth.validateApp, userController.signIn); 
router.post("/", auth.validateApp, userController.createUser); 
router.get("/:votersId", auth.validateApp, auth.validateToken, userController.getUser); 

module.exports = router;
