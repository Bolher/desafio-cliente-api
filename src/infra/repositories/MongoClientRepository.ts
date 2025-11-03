import { MongoBaseRepository } from './MongoBaseRepository.js';
import { ClientRepository } from '../../domain/repositories/ClientRepository.js';
import { ClientModel } from '../db/mongoose/ClientModel.js';

export class MongoClientRepository extends MongoBaseRepository<any> implements ClientRepository {
  constructor() { super(ClientModel); }

  async findByEmail(email: string) {
    const doc = await ClientModel.findOne({ email });
    return doc ? this.map(doc) : null;
  }
}
