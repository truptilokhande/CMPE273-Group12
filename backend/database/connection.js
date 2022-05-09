const mongoose = require("mongoose");
const dbUrl = require("../config/config.json").MONGO_URL;
const connectDB = async () => {
  try {
    //mongodb connection string
    const con = await mongoose.connect(
      "mongodb+srv://admin:admin@stackoverflow.yqtcu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        maxPoolSize: 100,
        ssl: true,
      }
    );
    console.log(`Mongo db connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
