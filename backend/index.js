const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const frontendURL = require("./config.json").frontEnd;
const mongoose = require("mongoose");

const questionRoutes = require("./routes/question.routes")

//set up cors
app.use(cors({ origin: frontendURL, credentials: true }));

// setting up env file
require("dotenv").config();

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
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.info("MongoDB connected");
  })
  .catch((e) => {
    console.log("error connection to mongo");
  });

// starting the server
app.listen("3001", () => {
  console.log("server is running!");
});

app.use(questionRoutes);

// module.exports = app;