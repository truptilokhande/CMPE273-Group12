const { Router } = require("express");
const tagRoute = Router();
const tagController = require("../controllers/tag.controller");
const { authenticateUser } = require("../middleware/authMiddleware");

tagRoute.get("/getAlltags", authenticateUser, tagController.getAllTags);
tagRoute.post("/addTag", authenticateUser, tagController.addTag);
tagRoute.get(
  "/getAllQuestionWithSpecificTag/:tagName",
  authenticateUser,
  tagController.getAllQuestionWithSpecificTag
);

module.exports = tagRoute;
