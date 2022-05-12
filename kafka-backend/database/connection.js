const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //mongodb connection string
    const con = await mongoose.connect(
      "mongodb+srv://admin:admin@stackoverflow.yqtcu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    console.log(`Mongo db connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;