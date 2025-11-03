import Redis from 'ioredis';
import { config } from '../../config/index.js';

export function createRedis() {
  return new Redis({ host: config.redis.host, port: config.redis.port });
}
