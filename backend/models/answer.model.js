const mongoose = require("mongoose");
const commentSchema = require("./commentModel");

const answerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    questionId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    answerBody: {
      type: String,
      required: true,
    },
    comments: [commentSchema.schema],
    votes: {
      type: Number,
      required: false,
      default: 0,
    },
    markedAsRight: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;
