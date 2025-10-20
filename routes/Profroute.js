const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ProfController = require("../controller/ProfController");

// Login route
router.post("/login", ProfController.loginProf);
router.post("/signup", ProfController.signupProf);
router.get("/profile", authMiddleware, ProfController.getProfProfile);
router.get("/allprofs", authMiddleware, ProfController.getAllProf);
router.post("/logout", ProfController.logoutProf);
module.exports = router;