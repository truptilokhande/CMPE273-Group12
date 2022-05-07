const { Router } = require("express");
const router = Router();
const userController = require("../controllers/user.controller");
const { authenticateUser } = require('../middleware/authMiddleware');
const { writeRequest } = require("../kafka/client");
const topic="user";
router.post("/register", (req, res) => {
    writeRequest(req, res, "user-register", topic);
  });
router.post("/login", (req, res) => {
    writeRequest(req, res, "user-login", topic);
  });

router.get("/getAllUsers", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-users", topic);
  });
router.get("/getUser/:id", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-user", topic);
  });
router.get("/getTopposts/:id", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-posts", topic);
  });
router.get("/getQuestions/:id", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-questions-id", topic);
  });
router.get("/getAnswers/:id", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-answers-id", topic);
  });
router.get("/getBookmarks/:id", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-bookmarks", topic);
  });
router.get("/signout", authenticateUser, (req, res) => {
    writeRequest(req, res, "user-signout", topic);
  });

module.exports = router;
