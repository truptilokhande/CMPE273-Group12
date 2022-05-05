const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const { authenticateUser } = require('../middleware/authMiddleware');

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/getAllUsers", authenticateUser, userController.getAllUsers);
router.get("/getUser/:id", authenticateUser, userController.getUser);
router.get("/getTopposts/:id", authenticateUser, userController.getTopposts);
router.get("/getQuestions/:id", authenticateUser, userController.getQuestions);
router.get("/getAnswers/:id", authenticateUser, userController.getAnswers);
router.get("/getBookmarks/:id", authenticateUser, userController.getBookmarks);
router.get("/signout", authenticateUser, userController.signout);

module.exports = router;
