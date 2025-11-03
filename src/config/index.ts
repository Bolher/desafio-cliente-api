import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGO_URI || 'mongodb://mongo:27017/clientesdb',
  redis: { host: process.env.REDIS_HOST || 'redis', port: Number(process.env.REDIS_PORT || 6379) },
  rabbit: { url: process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672', queue: process.env.RABBITMQ_QUEUE || 'clientes.created' }
};
