const kafka = require("./client");

const producer = kafka.producer();

const sendLog = async (log) => {
  await producer.connect();

  await producer.send({
    topic: "user-activity",
    messages: [
      {
        value: JSON.stringify(log),
      },
    ],
  });

  await producer.disconnect();
};

module.exports = sendLog;