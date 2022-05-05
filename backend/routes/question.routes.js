const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

const { writeRequest } = require("../kafka/client");
const topic = "question";

router.get("/testQuestions", authenticateUser, (req, res) => {
  writeRequest(req, res, "test-questions", topic);
});

router.get("/getQuestions", authenticateUser, (req, res) => {
  writeRequest(req, res, "get-questions", topic);
});
router.post("/addquestion", authenticateUser, (req, res) => {
  writeRequest(req, res, "add-question", topic);
});
router.get("/getquestion/:questionId", authenticateUser, (req, res) => {
  writeRequest(req, res, "get-question", topic);
});

router.get(
  "/searchQuestionsByUserId/:searchkey",
  authenticateUser,
  (req, res) => {
    writeRequest(req, res, "search-question-by-id", topic);
  }
);
router.get(
  "/searchQuestionsByText/:searchkey",
  authenticateUser,
  (req, res) => {
    writeRequest(req, res, "search-question-by-key", topic);
  }
);
router.post("/voteQuestion", authenticateUser, (req, res) => {
  writeRequest(req, res, "vote-question", topic);
});
router.post("/editquestion", authenticateUser, (req, res) => {
  writeRequest(req, res, "edit-question", topic);
});
router.post("/bookmark", authenticateUser, (req, res) => {
  writeRequest(req, res, "bookmark", topic);
});
router.post("/addComment", authenticateUser, (req, res) => {
  writeRequest(req, res, "add-comment", topic);
});
router.get("/getPendingQuestions", authenticateUser, (req, res) => {
  writeRequest(req, res, "get-pending-questions", topic);
});
router.post("/aproove/:id", authenticateUser, (req, res) => {
  writeRequest(req, res, "approve", topic);
});
router.post("/reject/:id", authenticateUser, (req, res) => {
  writeRequest(req, res, "reject", topic);
});
router.get("/getHistories/:id", authenticateUser, (req, res) => {
  writeRequest(req, res, "get-histories", topic);
});

// const { writeRequest } = require("../kafka/client");
// const topic = "question";

// router.get("/getQuestions", questionController.getQuestions);
// router.get("/testQuestions", questionController.testQuestions);
// router.post("/addquestion", authenticateUser, questionController.addquestion);
// router.get(
//   "/getquestion/:questionId",
//   authenticateUser,
//   questionController.getquestion
// );
// router.get(
//   "/searchQuestionsByUserId/:searchkey",
//   authenticateUser,
//   questionController.searchQuestionsByUserId
// );
// router.get(
//   "/searchQuestionsByText/:searchkey",
//   authenticateUser,
//   questionController.searchQuestionsByText
// );
// router.post("/voteQuestion", authenticateUser, questionController.voteQuestion);
// router.post("/editquestion", authenticateUser, questionController.editquestion);
// router.post("/bookmark", authenticateUser, questionController.bookmarkQuestion);
// router.post("/addComment", authenticateUser, questionController.addComment);
// router.get(
//   "/getPendingQuestions",
//   authenticateUser,
//   questionController.getPendingQuestions
// );
// router.post("/aproove/:id", authenticateUser, questionController.aproove);
// router.post("/reject/:id", authenticateUser, questionController.reject);
// router.get(
//   "/getHistories/:id",
//   authenticateUser,
//   questionController.getHistories
// );
// router.post("/editquestion", authenticateUser, questionController.editquestion);
// router.get(
//   "/getquestion/:questionId",
//   authenticateUser,
//   questionController.getquestion
// );

module.exports = router;
