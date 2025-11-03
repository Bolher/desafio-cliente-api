import { Request, Response } from 'express';
import { CreateClient } from '../../application/usecases/CreateClient.js';
import { UpdateClient } from '../../application/usecases/UpdateClient.js';
import { GetClientById } from '../../application/usecases/GetClientById.js';
import { ListClients } from '../../application/usecases/ListClients.js';
import type { Redis } from 'ioredis';
import { RabbitMQ } from '../../infra/messaging/RabbitMQ.js';
import { createClientSchema } from './validators.js';

export class ClientController {
  constructor(
    private createClient: CreateClient,
    private updateClient: UpdateClient,
    private getClientById: GetClientById,
    private listClients: ListClients,
    private redis: Redis,
    private mq: RabbitMQ
  ) {}

  create = async (req: Request, res: Response) => {
    try {
      
      const parsed = createClientSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({
          message: 'payload inválido',
          issues: parsed.error.issues, 
        });
      }
      const { name, email, phone } = parsed.data;
  
      const client = await this.createClient.execute({ name, email, phone });
  
      try { await this.redis.del(`client:${client.id}`); } catch {}
  
      try {
        await this.mq.publish({
          type: 'clientes.created',
          data: client,
          at: new Date().toISOString(),
        });
      } catch (e) {
        console.warn('[Rabbit] publish falhou:', (e as Error).message);
      }
  
      return res.status(201).json(client);
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('Email already in use') || msg.includes('E11000')) {
        return res.status(409).json({ message: 'Email já está em uso' });
      }
      console.error('Erro em POST /clients:', e);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const client = await this.updateClient.execute(req.params.id, req.body);
      try { await this.redis.del(`client:${client?.id}`); } catch {}
      return res.json(client);
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('not found')) return res.status(404).json({ message: 'Client not found' });
      if (msg.includes('E11000'))   return res.status(409).json({ message: 'Email já está em uso' });
      console.error('Erro em PUT /clients/:id:', e);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const client = await this.getClientById.execute(req.params.id);
      return res.json(client);
    } catch (e: any) {
      const msg = String(e?.message || '');
      if (msg.includes('not found')) return res.status(404).json({ message: 'Client not found' });
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  list = async (_: Request, res: Response) => {
    const clients = await this.listClients.execute();
    return res.json(clients);
  };
}
