const { Router } = require("express");
const router = Router();
const topic = "message";
const { writeRequest } = require("../kafka/client");
const messageController = require("../controllers/message.controller.js");
const { authenticateUser } = require('../middleware/authMiddleware');

router.post("/getMessages", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-message", topic);
  });
router.post("/sendMessage", authenticateUser,(req, res) => {
    writeRequest(req, res, "send-message", topic);
  });
router.post("/getChatrooms", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-chat", topic);
  });
router.post("/getreceivernames", authenticateUser, (req, res) => {
    writeRequest(req, res, "get-name", topic);
  });

module.exports = router;
