import { CreateClient } from '../../src/application/usecases/CreateClient.js';

const fakeRepo = () => ({
  findByEmail: jest.fn(),
  create: jest.fn(),
});

describe('CreateClient', () => {
  it('cria quando email não existe', async () => {
    const repo = fakeRepo();
    (repo.findByEmail as any).mockResolvedValue(null);
    (repo.create as any).mockResolvedValue({ id: '1', name: 'Ana', email: 'ana@x.com', phone: '9' });

    const uc = new CreateClient(repo as any);
    const out = await uc.execute({ name: 'Ana', email: 'ana@x.com', phone: '9' });
    expect(out.id).toBe('1');
  });

  it('falha se email existe', async () => {
    const repo = fakeRepo();
    (repo.findByEmail as any).mockResolvedValue({ id: '1' });

    const uc = new CreateClient(repo as any);
    await expect(uc.execute({ name: 'Ana', email: 'ana@x.com', phone: '9' }))
      .rejects.toThrow('Email already in use');
  });
});
