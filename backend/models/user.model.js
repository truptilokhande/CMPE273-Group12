const mongoose = require("mongoose");

const userTagSchema = new mongoose.Schema(
  {
    tagId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    tagName: {
      type: String,
      required: true,
    },
    tagCount: {
      type: Number,
      required: true,
      default: 1,
    },
    _id: false,
  },
  {
    timestamps: false,
  }
);

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
