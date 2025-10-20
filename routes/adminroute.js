const express = require("express");
const router = express.Router();
const AdminController = require("../controller/AdminController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", AdminController.loginAdmin);
router.patch("/update-password/:id", authMiddleware, AdminController.updatePassword);
router.post("/logout", AdminController.logoutAdmin);

module.exports = router;