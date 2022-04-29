const { Router } = require("express");
const analyticsRoute = Router();
const {
  getAllTags,
  addTag,
  getAllQuestionWithSpecificTag,
  questionsPostedPerDay,
  testAPI,
} = require("../controllers/analytics.controller");

analyticsRoute.get("/getAlltags", getAllTags);
analyticsRoute.post("/addTag", addTag);
analyticsRoute.get(
  "/getAllQuestionWithSpecificTag/:tagName",
  getAllQuestionWithSpecificTag
);
analyticsRoute.get("/questionsPostedPerDay", questionsPostedPerDay);
analyticsRoute.get("/test", testAPI);

module.exports = analyticsRoute;
