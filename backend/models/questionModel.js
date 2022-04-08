const mongoose = require("mongoose");
const answerSchema = require("./answerModel");
const commentSchema = require("./commentModel");
const tagSchema = require("./TagModel");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    questionbody: { type: String, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true },
    votes: { type: Number, required: false },
    views: { type: Number, required: false },
    tags: [tagSchema.schema],
    answers: [answerSchema.schema],
    comments: [commentSchema.schema],
    waitingForApproval: { type: Boolean, required: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const QuestionDb = mongoose.model("question", questionSchema);
module.exports = QuestionDb;
