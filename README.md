# 🚀 Cliente API — Clean Architecture (Node + TypeScript + Docker)

Um serviço REST completo para **cadastro e consulta de clientes**, desenvolvido com **Node.js + TypeScript**, aplicando **Clean Architecture**, **SOLID**, **MongoDB**, **Redis (cache)**, **RabbitMQ (mensageria)** e **Docker Compose**.  
Inclui **validação com Zod**, **testes unitários com Jest**, **Swagger (opcional)**.

---

## 🧩 Stack Utilizada

| Camada | Tecnologia |
|:-------|:------------|
| **Backend** | Node.js + Express + TypeScript |
| **Banco de Dados** | MongoDB (via Mongoose) |
| **Cache** | Redis |
| **Mensageria** | RabbitMQ |
| **Testes** | Jest + ts-jest |
| **Validação** | Zod |
| **Containerização** | Docker + Docker Compose |
| **Documentação (opcional)** | Swagger UI |

---

## 🏗️ Estrutura do Projeto

```bash
src/
├─ app/                     # Bootstrap e servidor Express
│  ├─ index.ts
│  └─ server.ts
├─ config/                  # Configurações de ambiente
├─ domain/                  # Entidades e contratos (regras de domínio)
│  ├─ entities/
│  └─ repositories/
├─ application/             # Casos de uso (use-cases)
├─ infra/                   # Implementações técnicas
│  ├─ db/mongoose/
│  ├─ repositories/
│  ├─ cache/
│  └─ messaging/
└─ interfaces/
   └─ http/                 # Controllers, rotas, validação, Swagger e erros
tests/                      # Testes unitários (use-cases e repositórios)

---
```
## 🏗️ Exemplo de .env

API
PORT=3000

MongoDB
MONGO_URI=mongodb://mongo:27017/clientesdb

Redis
REDIS_HOST=redis
REDIS_PORT=6379

RabbitMQ
RABBITMQ_URL=amqp://user:pass@rabbitmq:5672
RABBITMQ_QUEUE=clientes.created

Logs (opcional)
LOG_LEVEL=info

---

## 🐳 Subindo o projeto com Docker


1️⃣ Copiar arquivo de ambiente:
Crie um .env como no do exemplo

2️⃣ Subir containers:
```bash
docker compose up -d --build
```

3️⃣ Testar API:
http://localhost:3000/health
# Saída esperada: {"ok":true}

---

## 📡 Endpoints da API

**Base URL:** `http://localhost:3000`

| Método | Endpoint | Descrição |
|:--------|:----------|:-----------|
| **POST** | `/api/clients` | Cadastrar um novo cliente |
| **PUT** | `/api/clients/:id` | Atualizar dados do cliente |
| **GET** | `/api/clients/:id` | Consultar cliente por ID *(usa cache Redis)* |
| **GET** | `/api/clients` | Listar todos os clientes |
| **GET** | `/health` | Verificar status da API (healthcheck) |

---

## 🧾 Status e Erros Padronizados

| Código | Significado |
|:--------|:-------------|
| **200** | Sucesso |
| **201** | Criado com sucesso |
| **400** | Payload inválido *(validação Zod)* |
| **404** | Cliente não encontrado |
| **409** | E-mail já em uso |
| **500** | Erro interno do servidor |

---

## 🧪 Testes Unitários


```bash

npm ci
npm test

```
---

## 📨 Mensageria — RabbitMQ

Ao cadastrar um novo cliente (POST /api/clients), o sistema publica uma mensagem na fila clientes.created.

Um consumer ativo processa essas mensagens automaticamente (log/persistência).

Testar manualmente no painel:

Acesse: http://localhost:15672

Vá em Queues → clientes.created

Clique em Publish message

Payload exemplo:

---

## 🧮 Cache — Redis

GET /api/clients/:id primeiro tenta ler do Redis (client:{id})

Se cache hit, retorna instantâneo

Se miss, busca no Mongo e salva no Redis (TTL 60s)

Ao criar/atualizar, o cache é invalidado

---

## 📄 Documentação (Swagger) — Opcional

Acesse no navegador:
👉 http://localhost:3000/docs

---

## 🧰 Scripts NPM

| Comando | Descrição |
|:----------|:-----------|
| `npm run dev` | Roda em modo desenvolvimento *(ts-node-dev)* |
| `npm run build` | Compila para a pasta `dist/` |
| `npm start` | Executa a versão compilada *(Node.js)* |
| `npm test` | Roda testes unitários com cobertura *(Jest)* |

---

## 🧾 Licença

Projeto sob licença MIT — livre para uso e modificação.
