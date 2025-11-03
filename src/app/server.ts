import express from 'express';
import { makeRoutes } from '../interfaces/http/routes.js';
import { ClientController } from '../interfaces/http/ClientController.js';
import { MongoClientRepository } from '../infra/repositories/MongoClientRepository.js';
import { CreateClient } from '../application/usecases/CreateClient.js';
import { UpdateClient } from '../application/usecases/UpdateClient.js';
import { GetClientById } from '../application/usecases/GetClientById.js';
import { ListClients } from '../application/usecases/ListClients.js';
import type { Redis } from 'ioredis';
import { RabbitMQ } from '../infra/messaging/RabbitMQ.js';
import { errorHandler } from '../interfaces/http/error.js';
import { setupSwagger } from '../interfaces/http/swagger.js';

export function buildServer(redis: Redis, mq: RabbitMQ) {
  const app = express();
  app.use(express.json());

  const repo = new MongoClientRepository();
  const controller = new ClientController(
    new CreateClient(repo),
    new UpdateClient(repo),
    new GetClientById(repo, redis),
    new ListClients(repo),
    redis,
    mq
  );

  setupSwagger(app);
  app.use('/api', makeRoutes(controller));
  app.get('/health', (_, res) => res.json({ ok: true }));
  app.use(errorHandler);

  return app;
}
