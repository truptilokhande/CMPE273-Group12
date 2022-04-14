const { Router } = require("express");
const tagRoute = Router();
const tagController = require("../controllers/tag.controller");

tagRoute.get("/getAlltags", tagController.getAllTags);
tagRoute.post("/addTag", tagController.addTag);

module.exports = tagRoute;
