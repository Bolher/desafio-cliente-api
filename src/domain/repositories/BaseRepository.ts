export interface BaseRepository<T extends { id?: string }> {
    create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
  }
  