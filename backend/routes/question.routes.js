const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/getQuestions", authenticateUser, questionController.getQuestions);
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

module.exports = router;
