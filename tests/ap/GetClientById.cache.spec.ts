import { GetClientById } from '../../src/application/usecases/GetClientById.js';

describe('GetClientById com cache', () => {
  const repo = { findById: jest.fn() } as any;
  const redis = { get: jest.fn(), set: jest.fn() } as any;

  beforeEach(() => { jest.clearAllMocks(); });

  it('hit de cache evita chamada ao repo', async () => {
    (redis.get as any).mockResolvedValue(JSON.stringify({ id: '1', name: 'Ana' }));
    const uc = new GetClientById(repo, redis);
    const out = await uc.execute('1');
    expect(out.id).toBe('1');
    expect(repo.findById).not.toHaveBeenCalled();
  });

  it('miss preenche o cache', async () => {
    (redis.get as any).mockResolvedValue(null);
    (repo.findById as any).mockResolvedValue({ id: '1', name: 'Ana' });

    const uc = new GetClientById(repo, redis);
    await uc.execute('1');

    expect(redis.set).toHaveBeenCalled();
  });
});
