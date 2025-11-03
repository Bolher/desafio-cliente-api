import { ClientRepository } from '../../domain/repositories/ClientRepository.js';
import type { Redis } from 'ioredis';

export class GetClientById {
  constructor(private repo: ClientRepository, private redis: Redis) {}

  async execute(id: string) {
    const cacheKey = `client:${id}`;

    const cached = await this.redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const client = await this.repo.findById(id);
    if (!client) throw new Error('Client not found');

    await this.redis.set(cacheKey, JSON.stringify(client), 'EX', 60);
    return client;
  }
}
