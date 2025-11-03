import { Model } from 'mongoose';

export class MongoBaseRepository<T> {
  constructor(protected model: Model<any>) {}

  protected map = (doc: any) => ({
    id: doc._id.toString(),
    ...doc.toObject({ versionKey: false, transform: (_: any, ret: any) => { delete ret._id; return ret; } })
  });

  async create(data: any): Promise<any> {
    const created = await this.model.create(data);
    return this.map(created);
  }

  async update(id: string, data: Partial<any>): Promise<any | null> {
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true });
    return updated ? this.map(updated) : null;
  }

  async findById(id: string): Promise<any | null> {
    const doc = await this.model.findById(id);
    return doc ? this.map(doc) : null;
  }

  async findAll(): Promise<any[]> {
    const docs = await this.model.find();
    return docs.map(this.map);
  }
}
