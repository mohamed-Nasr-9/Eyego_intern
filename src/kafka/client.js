const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "logs-service",
  brokers: ["localhost:9092"],
});

module.exports = kafka;