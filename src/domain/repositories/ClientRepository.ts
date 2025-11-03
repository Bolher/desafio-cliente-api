import { BaseRepository } from './BaseRepository.js';
import { Client } from '../entities/Client.js';

export interface ClientRepository extends BaseRepository<Client> {
  findByEmail(email: string): Promise<Client | null>;
}
