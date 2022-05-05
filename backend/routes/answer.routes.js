const { Router } = require("express");
const answerRoute = Router();
const { writeRequest } = require("../kafka/client");
const topic = "answer";

const answerController = require("../controllers/answer.controller");
const { authenticateUser } = require('../middleware/authMiddleware');

answerRoute.post("/add-answer", authenticateUser, answerController.addAnswer);
answerRoute.post("/vote-answer", authenticateUser, answerController.voteAnswer);
answerRoute.post("/add-comment", authenticateUser, answerController.addComment);
answerRoute.post("/set-best-answer", authenticateUser, answerController.setBestAnswer);

module.exports = answerRoute;
