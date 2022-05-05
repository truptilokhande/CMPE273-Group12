const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");
const { authenticateUser } = require("../middleware/authMiddleware");
const { writeRequest } = require("../kafka/client");
const topic = "question";

router.get("/getQuestions", questionController.getQuestions);
router.get("/testQuestions", questionController.testQuestions);
router.post("/addquestion", authenticateUser, questionController.addquestion);
router.get("/getquestion/:questionId", authenticateUser, questionController.getquestion);
router.get("/searchQuestionsByUserId/:searchkey", authenticateUser, questionController.searchQuestionsByUserId);
router.get("/searchQuestionsByText/:searchkey", authenticateUser, questionController.searchQuestionsByText);
router.post("/voteQuestion", authenticateUser, questionController.voteQuestion);
router.post("/editquestion", authenticateUser, questionController.editquestion);
router.post("/bookmark", authenticateUser, questionController.bookmarkQuestion);
router.post("/addComment", authenticateUser, questionController.addComment);
router.get("/getPendingQuestions", authenticateUser, questionController.getPendingQuestions);
router.post("/aproove/:id", authenticateUser, questionController.aproove);
router.post("/reject/:id", authenticateUser, questionController.reject);
router.get("/getHistories/:id", authenticateUser, questionController.getHistories);
router.post("/editquestion", authenticateUser, questionController.editquestion);
router.get("/getquestion/:questionId", authenticateUser, questionController.getquestion);

module.exports = router;
