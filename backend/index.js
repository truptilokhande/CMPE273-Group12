const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const frontendURL = require("./config.json").frontEnd;
const mongoose = require("mongoose");
const connectDB = require("./database/connection");

const questionRoutes = require("./routes/question.routes");
const answerRoutes = require("./routes/answer.routes");

//set up cors
app.use(cors({ origin: frontendURL, credentials: true }));

// setting up env file
require("dotenv").config();
const PORT = process.env.PORT || 4001;

// setting up body parser
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  if (req.method === "OPTIONS") {
    res.end();
  }
  next();
});

// connecting to mongodb
connectDB();

//Routes
app.use(questionRoutes);
app.use("/api/v1/", answerRoutes);

// starting the server
app.listen(PORT, () => {
  console.log("server is running!");
});

// module.exports = app;
