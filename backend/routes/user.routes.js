const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
// middleware TODO
// const { authenticateUser } = require('../middleware/authMiddleware');

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/getAllUsers", userController.getAllUsers);
router.get("/getUser/:id", userController.getUser);
router.get("/getTopposts/:id",userController.getTopposts);
//router.get("/getQuestions",userController.getQuestions);
//router.get("/getAnswers",userController.getAnswers);
//router.get("/getTopposts",userController.getTopposts);
router.get("/signout", userController.signout);

module.exports = router;
