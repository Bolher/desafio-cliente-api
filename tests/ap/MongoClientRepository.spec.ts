import { MongoClientRepository } from '../../src/infra/repositories/MongoClientRepository.js';
import { ClientModel } from '../../src/infra/db/mongoose/ClientModel.js';

describe('MongoClientRepository', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('findByEmail retorna mapeado', async () => {
    const fakeDoc: any = {
      _id: '507f1f77bcf86cd799439011',
      toObject: () => ({ name: 'A', email: 'a@a.com', phone: '1' }),
    };

    const spy = jest.spyOn(ClientModel, 'findOne').mockResolvedValue(fakeDoc as any);

    const repo = new MongoClientRepository();
    const out = await repo.findByEmail('a@a.com');

    expect(spy).toHaveBeenCalledWith({ email: 'a@a.com' });
    expect(out).toEqual({
      id: '507f1f77bcf86cd799439011',
      name: 'A',
      email: 'a@a.com',
      phone: '1',
      createdAt: undefined,
      updatedAt: undefined,
    });
  });
});
