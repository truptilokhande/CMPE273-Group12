const { Router } = require("express");
const router = Router();
const messageController = require("../controllers/message.controller.js");
const { authenticateUser } = require('../middleware/authMiddleware');

router.post("/getMessages", authenticateUser, messageController.getMessages);
router.post("/sendMessage", authenticateUser, messageController.sendMessage);
router.post("/getChatrooms", authenticateUser, messageController.getChatrooms);
router.post("/getreceivernames", authenticateUser, messageController.getReceiverNames)

module.exports = router;
