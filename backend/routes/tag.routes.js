const { Router } = require("express");
const tagRoute = Router();
const { writeRequest } = require("../kafka/client");
const tagController = require("../controllers/tag.controller");
const { authenticateUser } = require("../middleware/authMiddleware");
const topic = "tags";

tagRoute.get("/getAlltags", (req, res) => {
  writeRequest(req, res, "get-tag", topic);
});
tagRoute.post("/addTag", authenticateUser, (req, res) => {
  writeRequest(req, res, "add-tag", topic);
});
tagRoute.get(
  "/getAllQuestionWithSpecificTag/:tagName",
  authenticateUser,
  (req, res) => {
    writeRequest(req, res, "get-question-tag", topic);
  }
);
tagRoute.get("/getTagId/:tagName", authenticateUser, (req, res) => {
  writeRequest(req, res, "get-tag-id", topic);
});

module.exports = tagRoute;
