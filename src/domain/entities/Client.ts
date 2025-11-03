import { BaseEntity } from './BaseEntity.js';

export class Client extends BaseEntity {
  constructor(
    public name: string,
    public email: string,
    public phone: string,
    id?: string
  ) {
    super();
    this.id = id;
  }
}
