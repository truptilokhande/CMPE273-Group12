const { Router } = require("express");
const answerRoute = Router();
const answerController = require("../controllers/answer.controller");

answerRoute.post("/add-answer", answerController.addAnswer);
answerRoute.post("/vote-answer", answerController.voteAnswer);
answerRoute.post("/add-comment", answerController.addComment);
answerRoute.post("/set-best-answer", answerController.setBestAnswer);

module.exports = answerRoute;
