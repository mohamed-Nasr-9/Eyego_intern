const mongoose = require("mongoose");

const connectMongo = async () => {
  await mongoose.connect("mongodb://localhost:27017/logsdb");

  console.log("MongoDB connected");
};

module.exports = connectMongo;