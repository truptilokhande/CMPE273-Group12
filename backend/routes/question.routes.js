const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");
const { authenticateUser } = require("../middleware/authMiddleware");
const { writeRequest } = require("../kafka/client");
const topic = "question";

router.get("/getQuestions", (req, res) => {
  writeRequest(req, res, "get-questions", topic);
});
router.post("/addquestion", (req, res) => {
  writeRequest(req, res, "add-question", topic);
});
router.get("/getquestion/:questionId", (req, res) => {
  writeRequest(req, res, "get-question", topic);
});
router.get("/searchQuestionsByUserId/:searchkey", (req, res) => {
  writeRequest(req, res, "search-question-by-id", topic);
});
router.get("/searchQuestionsByText/:searchkey", (req, res) => {
  writeRequest(req, res, "search-question-by-key", topic);
});
router.post("/voteQuestion", (req, res) => {
  writeRequest(req, res, "vote-question", topic);
});
router.post("/editquestion", (req, res) => {
  writeRequest(req, res, "edit-question", topic);
});
router.post("/bookmark", (req, res) => {
  writeRequest(req, res, "bookmark", topic);
});
router.post("/addComment", (req, res) => {
  writeRequest(req, res, "add-comment", topic);
});
router.get("/getPendingQuestions", (req, res) => {
  writeRequest(req, res, "get-pending-questions", topic);
});
router.post("/aproove/:id", (req, res) => {
  writeRequest(req, res, "approve", topic);
});
router.post("/reject/:id", (req, res) => {
  writeRequest(req, res, "reject", topic);
});
router.get("/getHistories/:id", (req, res) => {
  writeRequest(req, res, "get-histories", topic);
});

module.exports = router;
