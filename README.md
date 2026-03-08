# Event-Driven Logs Microservice

## Architecture
- **Producer**: Sends user activity logs to Kafka topic `user-activity`.
- **Consumer**: Reads messages from Kafka and stores them in MongoDB.
- **MongoDB**: Stores logs with indexing on `userId` and `timestamp`.
- **REST API**: 
  - `POST /logs` → send log to Kafka
  - `GET /logs` → fetch logs with pagination and filtering

## Tech Stack
- Node.js, Express
- Kafka (kafkajs)
- MongoDB
- Docker, Docker Compose
- Kubernetes (Deployment YAML ready)

## Running Locally
```bash
docker compose up -d
node src/server.js