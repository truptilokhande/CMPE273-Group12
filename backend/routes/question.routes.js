const { Router } = require("express");
const router = Router();
const questionController = require("../controllers/question.controller");

router.post("/addquestion", questionController.addquestion);

module.exports = router;
