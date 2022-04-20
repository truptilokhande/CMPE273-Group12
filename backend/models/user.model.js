const mongoose = require("mongoose");


const userTagSchema = new mongoose.Schema({
  tagName: {
    type: String,
    required: true,
  },
  tagCount: {
    type: Number,
    required: true,
  },
});

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
      required: false,
    },
    lastLoginDate: {
      type: Date,
      required: false,
    },
    about: {
      type: String,
      required: false,
    },
    reputation: {
      type: Number,
      required: false,
      default: 0,
    },
    location: {
      type: String,
      required: false,
    },
    upVoteCount: {
      type: Number,
      required: false,
      default: 0,
    },
    downVoteCount: {
      type: Number,
      required: false,
      default: 0,
    },
    tags: [userTagSchema],
    bookmarks: [mongoose.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
