const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tags: { type: String, required: true },
    questionbody: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const QuestionDb = mongoose.model("question", questionSchema);
module.exports = QuestionDb;
