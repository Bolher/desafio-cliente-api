import amqp from 'amqplib';

export class RabbitMQ {
  private conn?: amqp.Connection;
  private channel?: amqp.Channel;

  constructor(private url: string, private queue: string) {}

  async connectWithRetry(retries = 15, delayMs = 2000) {
    for (let i = 1; i <= retries; i++) {
      try {
        console.log(`[Rabbit] tentando conectar (${i}/${retries})...`);
        this.conn = (await amqp.connect(this.url)) as unknown as amqp.Connection;
        this.channel = await (this.conn as any).createChannel();
        await this.channel!.assertQueue(this.queue, { durable: true });
        console.log('[Rabbit] conectado com sucesso!');
        return;
      } catch (err) {
        console.error(`[Rabbit] falha na conexão (${i}/${retries}). Retentando em ${delayMs}ms...`);
        await new Promise(r => setTimeout(r, delayMs));
      }
    }
    throw new Error('Não foi possível conectar ao RabbitMQ');
  }

  async publish(message: any) {
    if (!this.channel) throw new Error('RabbitMQ não conectado');
    this.channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(message)), { persistent: true });
  }

  async consume(onMessage: (msg: any) => Promise<void> | void) {
    if (!this.channel) throw new Error('RabbitMQ não conectado');
    await this.channel.consume(this.queue, async (msg) => {
      if (!msg) return;
      const payload = JSON.parse(msg.content.toString());
      try {
        await onMessage(payload);
        this.channel!.ack(msg);
      } catch {
        this.channel!.nack(msg, false, false);
      }
    });
  }
}
