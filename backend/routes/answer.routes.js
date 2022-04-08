const { Router } = require("express");
const answerRoute = Router();
const answerController = require("../controllers/answer.controller");

answerRoute.post("/add-answer", answerController.addAnswer);

module.exports = answerRoute;
