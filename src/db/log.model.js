const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  userId: String,
  action: String,
  timestamp: Date,
});

logSchema.index({ userId: 1 });
logSchema.index({ timestamp: -1 });

module.exports = mongoose.model("Log", logSchema);