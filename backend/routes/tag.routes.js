const { Router } = require("express");
const tagRoute = Router();
const tagController = require("../controllers/tag.controller");

tagRoute.get("/getAlltags", tagController.getAllTags);
tagRoute.post("/addTag", tagController.addTag);
tagRoute.get(
  "/getAllQuestionWithSpecificTag/:tagName",
  tagController.getAllQuestionWithSpecificTag
);

module.exports = tagRoute;
