const express = require("express");
const constants = require("./config/config.json");
const mysql = require("mysql");
const app = express();

const db = mysql.createConnection({
  host: constants.development.host,
  user: constants.development.username,
  password: constants.development.password,
  port: constants.development.port,
  database: constants.development.database,
});

app.listen(3002, () => {
  console.log("Serving running on port 3002");
});

module.exports = app;
