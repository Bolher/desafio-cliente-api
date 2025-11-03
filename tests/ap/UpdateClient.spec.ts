import { UpdateClient } from '../../src/application/usecases/UpdateClient.js';

describe('UpdateClient', () => {
  it('atualiza quando existe', async () => {
    const repo = { update: jest.fn().mockResolvedValue({ id:'1', name:'A', email:'a@a.com', phone:'1' }) } as any;
    const uc = new UpdateClient(repo);
    const out = await uc.execute('1', { phone: '2' });
    expect(repo.update).toHaveBeenCalledWith('1', { phone: '2' });
    expect(out?.id).toBe('1');
  });

  it('falha se não existir', async () => {
    const repo = { update: jest.fn().mockResolvedValue(null) } as any;
    const uc = new UpdateClient(repo);
    await expect(uc.execute('x', { phone: '2' })).rejects.toThrow('Client not found');
  });
});
