const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
// middleware TODO
// const { authenticateUser } = require('../middleware/authMiddleware');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/getProfile", userController.getProfile);
router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser", userController.getUser);
router.get("/signout", userController.signout);

module.exports = router;
