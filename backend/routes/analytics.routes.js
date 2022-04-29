const { Router } = require("express");
const analyticsRoute = Router();
const { authenticateUser } = require('../middleware/authMiddleware')
const {
  questionsPostedPerDay,
  topTags,
  topViewedQuestion,
  reputationSortedUsers,
} = require("../controllers/analytics.controller");

analyticsRoute.get("/questionsPostedPerDay", authenticateUser, questionsPostedPerDay);
analyticsRoute.get("/topTags", authenticateUser, topTags);
analyticsRoute.get("/topViewedQuestion", authenticateUser, topViewedQuestion);
analyticsRoute.get("/reputationSortedUsers", authenticateUser, reputationSortedUsers);

module.exports = analyticsRoute;
