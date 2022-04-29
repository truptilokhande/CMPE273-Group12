const { Router } = require("express");
const analyticsRoute = Router();
const {
  questionsPostedPerDay,
  topTags,
  topViewedQuestion,
  reputationSortedUsers,
} = require("../controllers/analytics.controller");

analyticsRoute.get("/questionsPostedPerDay", questionsPostedPerDay);
analyticsRoute.get("/topTags", topTags);
analyticsRoute.get("/topViewedQuestion", topViewedQuestion);
analyticsRoute.get("/reputationSortedUsers", reputationSortedUsers);

module.exports = analyticsRoute;
