# Sistema de Tickets - Comigotech

Sistema para gerenciamento de tickets com API RESTful, validação de dados e testes automatizados.

## Tecnologias

- Node.js + Express.js + TypeScript
- Zod para validação
- Jest para testes
- PostgreSQL + Prisma (em implementação)

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

### 3. Executar em desenvolvimento
```bash
npm run dev
```

## Executar testes
```bash
npm test
```

## Endpoints da API

### Validar ticket
```bash
POST /api/tickets/validate
{
  "title": "Problema com login",
  "description": "Não consigo acessar",
  "priority": "HIGH",
  "category": "Autenticação"
}
```

### Health check
```bash
GET /health
```

## Testes
```bash
# Todos os testes
npm test

# Apenas testes unitários
npm run test:unit

# Testes com cobertura
npm run test:coverage
```

## Status do Projeto

### Concluído
- API com validação de tickets
- Testes unitários implementados
- Estrutura do projeto

### Em Andamento
- Integração com PostgreSQL
- Autenticação JWT

### Próximos Passos
- Sistema de usuários e permissões
- Dockerização
- Deploy em nuvem
