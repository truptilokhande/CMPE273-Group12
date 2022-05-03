const mysql = require("mysql");
const credentials = require("../config/config.json");

//createpool - figure out the difference
const dbConfig = {
  mysqlpool: mysql.createPool({
    host: credentials.DB.host,
    user: credentials.DB.username,
    password: credentials.DB.password,
    port: credentials.DB.port,
    database: credentials.DB.database,
    multipleStatements: true,
  }),
};

module.exports = dbConfig;
