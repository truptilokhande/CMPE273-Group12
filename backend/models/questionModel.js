const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: { type: String, required: true },
    questionbody: { type: String, required: true },
    userToken: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const QuestionDb = mongoose.model("question", questionSchema);
module.exports = QuestionDb;
