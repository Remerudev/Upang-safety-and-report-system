const express = require("express");
const router = express.Router();
const UserController = require("../controller/Usercontroller");
const authMiddleware = require("../middleware/authMiddleware");


// Login route
router.post("/login", UserController.loginUser);
router.post("/logout", UserController.logoutUser);
router.post("/signup", UserController.signupUser);
router.get("/profile", authMiddleware, UserController.getUserProfile);
router.get("/allusers", authMiddleware, UserController.getAllUsers);

module.exports = router;

