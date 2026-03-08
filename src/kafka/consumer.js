const kafka = require("./client");
const Log = require("../db/log.model");

const consumer = kafka.consumer({ groupId: "logs-group" });

const runConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "user-activity",
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const log = JSON.parse(message.value.toString());

      console.log("Received log:", log);

      await Log.create(log);
    },
  });
};

module.exports = runConsumer;