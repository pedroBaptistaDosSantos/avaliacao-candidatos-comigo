# Sistema de Gerenciamento de Tickets - Comigotech

Sistema completo para gerenciamento de tickets com API RESTful, autenticação JWT, validação de dados e persistência em PostgreSQL.

## Tecnologias Utilizadas

- **Backend:** Node.js + Express.js + TypeScript
- **Validação:** Zod
- **Autenticação:** JWT + bcrypt
- **Banco de Dados:** PostgreSQL + Prisma ORM
- **Testes:** Jest + Supertest
- **Containerização:** Docker + Docker Compose

## Como Executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar ambiente
```bash
cp .env.example .env
```
Edite o `.env` com suas configurações.

### 3. Banco de dados com Docker
```bash
docker-compose up -d postgres
```

### 4. Configurar Prisma
```bash
npx prisma generate
npx prisma db push
```

### 5. Executar em desenvolvimento
```bash
npm run dev
```

## Autenticação

### Registrar usuário
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "usuario@comigo.com",
  "name": "Nome do Usuário",
  "password": "senha123"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "usuario@comigo.com",
  "password": "senha123"
}
```

## Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar novo usuário  
- `POST /api/auth/login` - Login e obter token JWT  

### Tickets (Protegidos por JWT)
- `POST /api/tickets` - Criar novo ticket (Authorization: Bearer <token>)  
- `GET /api/tickets` - Listar todos tickets (Authorization: Bearer <token>)  
- `POST /api/tickets/validate` - Validar dados do ticket (Público)  

### Health Check
- `GET /health` - Status da API  

## Testes
```bash
# Todos os testes
npm test

# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes com cobertura
npm run test:coverage
```

## Docker
```bash
# Subir todos os serviços
docker-compose up -d

# Subir apenas PostgreSQL
docker-compose up -d postgres

# Ver logs
docker-compose logs
```

## Status do Projeto

### Concluído
- API RESTful com Express.js e TypeScript  
- Validação de dados com Zod  
- Persistência com PostgreSQL e Prisma  
- Autenticação JWT com bcrypt  
- Sistema de usuários e tickets  
- Testes unitários e de integração  
- Dockerização com PostgreSQL  

### Em Andamento
- Sistema de permissões (Admin vs Atendente)  
- Testes end-to-end  
- Deploy em nuvem  

### Próximos Passos
- Frontend web React/Vue  
- Sistema de notificações  
- Dashboard administrativo  
- API documentation  
- CI/CD pipeline  

