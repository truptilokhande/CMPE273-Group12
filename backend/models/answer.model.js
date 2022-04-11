const mongoose = require("mongoose");
const questionDb = require("./question.model");

var schema = new mongoose.Schema(
  {
    userId: {
      // type: mongoose.Schema.Types.ObjectId, ref: userDb
      type: Number,
      required: true,
    },
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: questionDb,
    },
    answerBody: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Answer = mongoose.model("Answer", schema);

module.exports = Answer;
