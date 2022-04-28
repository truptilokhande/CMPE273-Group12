const { Router } = require("express");
const router = Router();
const messageController = require("../controllers/message.controller.js");
// middleware TODO
// const { authenticateUser } = require('../middleware/authMiddleware');

router.post("/getMessages", messageController.getMessages);
router.post("/sendMessage", messageController.sendMessage);
router.post("/getChatrooms", messageController.getChatrooms);
router.post("/getreceivernames",messageController.getReceiverNames)
module.exports = router;
