const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
//const frontendURL = require("./config.json").frontEnd;
const config = require("./config/config.json");
const mongoose = require("mongoose");
const connectDB = require("./database/connection");

//const questionRoutes = require("./routes/question.routes");
const answerRoutes = require("./routes/answer.routes");
const userRoutes = require("./routes/user.routes");
const tagRoutes = require("./routes/tag.routes");

//set up cors
app.use(cors({ origin: config.frontEndUrl, credentials: true }));

const PORT = config.PORT || 4001;

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
  res.setHeader("Access-Control-Allow-Origin", config.frontEndUrl);
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
// app.use(questionRoutes);
// app.use("/api/v1/", answerRoutes);

//app.use("/api/question/", questionRoutes);
app.use("/api/answer/", answerRoutes);
app.use("/api/user/", userRoutes);
app.use("/api/tag/", tagRoutes);

// starting the server
app.listen(PORT, () => {
  console.log("server is running!");
});

// module.exports = app;
