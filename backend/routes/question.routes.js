const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");

router.post("/addquestion", questionController.addquestion);
router.post("/bookmarkquestion", questionController.bookmarkquestion);

module.exports = router;
