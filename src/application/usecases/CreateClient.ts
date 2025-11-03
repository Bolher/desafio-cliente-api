import { ClientRepository } from '../../domain/repositories/ClientRepository.js';
import { Client } from '../../domain/entities/Client.js';

export class CreateClient {
  constructor(private repo: ClientRepository) {}

  async execute(input: { name: string; email: string; phone: string }) {
    const existing = await this.repo.findByEmail(input.email);
    if (existing) throw new Error('Email already in use');
    return this.repo.create(new Client(input.name, input.email, input.phone));
  }
}
