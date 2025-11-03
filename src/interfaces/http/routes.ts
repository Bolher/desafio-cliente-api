/**
 * @openapi
 * /api/clients:
 *   post:
 *     tags:
 *       - Clientes
 *     summary: Cadastrar novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, phone]
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@example.com
 *               phone:
 *                 type: string
 *                 example: 11999999999
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 name: { type: string }
 *                 email: { type: string }
 *                 phone: { type: string }
 *       400:
 *         description: Payload inválido
 *       409:
 *         description: Email já em uso
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Listar todos os clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id: { type: string }
 *                   name: { type: string }
 *                   email: { type: string }
 *                   phone: { type: string }
 *
 * /api/clients/{id}:
 *   get:
 *     tags:
 *       - Clientes
 *     summary: Buscar cliente por ID (com cache Redis)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 name: { type: string }
 *                 email: { type: string }
 *                 phone: { type: string }
 *       404:
 *         description: Cliente não encontrado
 *   put:
 *     tags:
 *       - Clientes
 *     summary: Atualizar cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: joao@example.com
 *               phone:
 *                 type: string
 *                 example: 11999999999
 *     responses:
 *       200:
 *         description: Cliente atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id: { type: string }
 *                 name: { type: string }
 *                 email: { type: string }
 *                 phone: { type: string }
 *       404:
 *         description: Cliente não encontrado
 *       409:
 *         description: Email já em uso
 */



import { Router } from 'express';
import { ClientController } from './ClientController.js';

export function makeRoutes(controller: ClientController) {
  const router = Router();
  router.post('/clients', controller.create);
  router.put('/clients/:id', controller.update);
  router.get('/clients/:id', controller.getById);
  router.get('/clients', controller.list);
  return router;
}
