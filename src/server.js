const express = require("express");
const sendLog = require("./kafka/producer");
const connectMongo = require("./db/mongo");
const runConsumer = require("./kafka/consumer");
const Log = require("./db/log.model");

const app = express();

/* -------- JSON parser for POST only -------- */
app.post("/logs", express.json(), async (req, res) => {
  try {
    const log = req.body;
    await sendLog(log);
    res.json({ message: "Log sent to Kafka", data: log });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error sending log" });
  }
});

/* -------- GET logs (no body parser) -------- */
app.get("/logs", async (req, res) => {
  try {
    const { userId, action, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (userId) filter.userId = userId;
    if (action) filter.action = action;

    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Log.countDocuments(filter);

    res.json({ total, page: Number(page), limit: Number(limit), data: logs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching logs" });
  }
});

/* -------- Start service -------- */
const start = async () => {
  await connectMongo();
  await runConsumer();
  app.listen(3000, () => console.log("Server running on port 3000"));
};

start();