const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const { authenticateUser } = require('../middleware/authMiddleware')

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getProfile", authenticateUser, userController.getProfile);
router.get("/getAllUsers", authenticateUser, userController.getAllUsers);
router.get("/getUser", authenticateUser, userController.getUser);

module.exports = router;
