const mongoose = require("mongoose");
const commentSchema = require("./commentModel");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    questionbody: { 
      type: String, 
      required: true,
    },
    userId: { 
      type: mongoose.Types.ObjectId, 
      required: true,
    },
    votes: { 
      type: Number, 
      required: false,
      default: 0,
    },
    views: {
      type: Number, 
      required: false,
      default: 0,
    },
    tags: [String],
    comments: [commentSchema.schema],
    waitingForApproval: { 
      type: Boolean,
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const QuestionDb = mongoose.model("question", questionSchema);
module.exports = QuestionDb;
