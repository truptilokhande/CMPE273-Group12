const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

router.get("/getQuestions", questionController.getQuestions);
router.post("/addquestion", questionController.addquestion);
router.post("/editquestion", questionController.editquestion);
router.get("/getquestion/:questionId", questionController.getquestion);

module.exports = router;
