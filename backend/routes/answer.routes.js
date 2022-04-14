const { Router } = require("express");
const answerRoute = Router();
const answerController = require("../controllers/answer.controller");

answerRoute.post("/add-answer", answerController.addAnswer);
answerRoute.post("/vote-answer", answerController.voteAnswer);
answerRoute.post("/add-comment/:answerId", answerController.addComment);
// answerRoute.post("/add-comment-answer", answerController.addAnswer);
answerRoute.put("/set-best-answer", answerController.setBestAnswer);

module.exports = answerRoute;
