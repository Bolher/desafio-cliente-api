import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  const msg = String(err?.message || 'Internal Server Error');

  if (msg.includes('Email already in use') || msg.includes('E11000')) {
    return res.status(409).json({ message: 'Email já está em uso' });
  }
  if (msg.includes('Client not found')) {
    return res.status(404).json({ message: 'Client not found' });
  }

  console.error('[ERROR]', err);
  return res.status(500).json({ message: 'Internal Server Error' });
}
