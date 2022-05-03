const { Router } = require("express");
const answerRoute = Router();
const { writeRequest } = require("../kafka/client");
const topic = "answer";

const answerController = require("../controllers/answer.controller");

answerRoute.post("/add-answer", (req, res) => {
  writeRequest(req, res, "add-answer", topic);
});
answerRoute.post("/vote-answer", (req, res) => {
  writeRequest(req, res, "vote-answer", topic);
});
answerRoute.post("/add-comment", (req, res) => {
  writeRequest(req, res, "add-comment", topic);
});
answerRoute.post("/set-best-answer", (req, res) => {
  writeRequest(req, res, "set-best-answer", topic);
});

module.exports = answerRoute;
