import { PrismaClient } from '@prisma/client';

// Teste simples de conexão com o banco
describe('Database Connection - Unit Test', () => {
  test('should connect to PostgreSQL database without errors', async () => {
    const prisma = new PrismaClient();
    
    // Este teste verifica se conseguimos conectar sem erros
    await expect(prisma.$connect()).resolves.not.toThrow();
    
    // Sempre desconectar após o teste
    await prisma.$disconnect();
  });

  test('should execute a simple SQL query', async () => {
    const prisma = new PrismaClient();
    await prisma.$connect();
    
    // Query simples para testar se o banco responde
    const result = await prisma.$queryRaw`SELECT 1 as test_value`;
    
    expect(result).toEqual([{ test_value: 1 }]);
    
    await prisma.$disconnect();
  });
});