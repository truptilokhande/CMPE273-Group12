const mongoose = require("mongoose");

const LogsSchema = new mongoose.Schema(
  {
    logID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    what: {
      type: String,
      required: true,
    },
    by: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Logs = mongoose.model("Logs", LogsSchema);

module.exports = Logs;
