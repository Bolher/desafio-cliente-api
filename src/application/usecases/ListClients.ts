import { ClientRepository } from '../../domain/repositories/ClientRepository.js';

export class ListClients {
  constructor(private repo: ClientRepository) {}
  execute() { return this.repo.findAll(); }
}
