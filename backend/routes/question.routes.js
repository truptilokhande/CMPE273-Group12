const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");

router.post("/addquestion", questionController.addquestion);

router.post("/editquestion", questionController.editquestion);
router.get("/getquestion/:questionId", questionController.getquestion);
module.exports = router;
