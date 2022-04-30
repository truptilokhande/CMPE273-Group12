const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/getQuestions", questionController.getQuestions);
router.post("/addquestion", questionController.addquestion);
router.get("/getquestion/:questionId", questionController.getquestion);
router.get("/searchQuestionsByUserId/:searchkey", questionController.searchQuestionsByUserId);
router.get("/searchQuestionsByText/:searchkey", questionController.searchQuestionsByText);
router.post("/voteQuestion", questionController.voteQuestion);
router.post("/editquestion", questionController.editquestion);
router.post("/bookmark", questionController.bookmarkQuestion);
router.post("/addComment", questionController.addComment);
router.get("/getPendingQuestions", questionController.getPendingQuestions);
router.post("/aproove/:id", questionController.aproove);
router.post("/reject/:id", questionController.reject);
router.get("/getHistories/:id", questionController.getHistories);

module.exports = router;
