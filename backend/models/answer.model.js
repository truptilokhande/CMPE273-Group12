const mongoose = require("mongoose");
const commentSchema = require("./commentModel");

const answerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    answerBody: { type: String, required: true },
    comments: [commentSchema.schema],
    votes: { type: Number, required: false },
    markedAsRight: { type: Boolean, required: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Answer", answerSchema);
