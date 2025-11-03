import { ClientRepository } from '../../domain/repositories/ClientRepository.js';
import { Client } from '../../domain/entities/Client.js';

export class UpdateClient {
  constructor(private repo: ClientRepository) {}

  async execute(id: string, patch: Partial<Client>) {
    const updated = await this.repo.update(id, patch);
    if (!updated) throw new Error('Client not found');
    return updated;
  }
}
