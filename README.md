# Sistema de Gerenciamento de Tickets - Comigotech

Sistema para gerenciamento de tickets com API RESTful, autenticação JWT e PostgreSQL.

## Tecnologias
- Node.js + Express + TypeScript
- Zod para validação
- JWT + bcrypt para autenticação
- PostgreSQL + Prisma ORM
- Docker + Docker Compose

## Como Executar

### 1. Clone e prepare o projeto
```bash
git clone <url-do-repositorio>
cd avaliacao-candidatos-comigo
cp .env.example .env
```

### 2. Subir containers
```bash
docker-compose up -d
```

### 3. Configurar banco de dados (OBRIGATÓRIO)
```bash
docker-compose exec app npx prisma db push
docker-compose exec app npx prisma db seed
```

### 4. Acessar a aplicação
- API: http://localhost:3000
- Health Check: GET /health
- PGAdmin: http://localhost:8080 (opcional)

## Usuários de Teste

Criados automaticamente pelo seed:

### Administrador
- Email: admin@comigotech.com
- Senha: admin123
- Permissões: Completas

### Atendente
- Email: atendente@comigotech.com
- Senha: atendente123
- Permissões: Criar e listar tickets

## Endpoints Principais

### Autenticação
```bash
# Registrar usuário
POST /api/auth/register
{"email": "user@test.com", "name": "User", "password": "password123"}

# Login
POST /api/auth/login
{"email": "admin@comigotech.com", "password": "admin123"}
```

### Tickets
```bash
# Criar ticket (precisa de token JWT)
POST /api/tickets
Authorization: Bearer <token>
{"title": "Problema", "description": "Descrição", "priority": "HIGH", "category": "Categoria"}

# Listar tickets
GET /api/tickets
Authorization: Bearer <token>

# Validar ticket (público)
POST /api/tickets/validate
{"title": "Teste", "description": "Teste", "priority": "HIGH", "category": "Teste"}
```

## Comandos Úteis
```bash
# Ver logs da aplicação
docker-compose logs app

# Executar testes
docker-compose exec app npm test

# Acessar banco de dados
docker-compose exec postgres psql -U postgres -d tickets_db

# Parar serviços
docker-compose down
```
