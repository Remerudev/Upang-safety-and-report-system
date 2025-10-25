const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usercontroller");
const authMiddleware = require("../middleware/authMiddleware");
const bcrypt = require('bcryptjs');

router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.post("/signup", UserController.signupUser);
router.get("/profile", authMiddleware, UserController.getUserProfile);

router.get("/", (req, res, next) => {
	console.log(`GET /users called from ${req.ip} origin=${req.headers.origin}`);
	next();
}, UserController.getAllUsers);

router.get("/allusers", (req, res, next) => {
	console.log(`GET /user/allusers called from ${req.ip} origin=${req.headers.origin}`);
	next();
}, UserController.getAllUsers);

router.get("/allusers-protected", authMiddleware, UserController.getAllUsers);

module.exports = router;