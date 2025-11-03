import 'dotenv/config';
import { config } from '../config/index.js';
import { connectMongo } from '../infra/db/mongoose/index.js';
import { buildServer } from './server.js';
import { createRedis } from '../infra/cache/RedisClient.js';
import { RabbitMQ } from '../infra/messaging/RabbitMQ.js';

async function main() {
  await connectMongo();
  const redis = createRedis();

  const mq = new RabbitMQ(config.rabbit.url, config.rabbit.queue);
  await mq.connectWithRetry();
  await mq.consume(async (payload) => {
    console.log('[Rabbit] received:', payload);
  });

  const app = buildServer(redis, mq);
  app.listen(config.port, () => console.log(`API on :${config.port}`));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
