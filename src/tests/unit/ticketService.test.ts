import { createTicket } from '../../services/ticketService';
import { PrismaClient, Priority, Status } from '@prisma/client';

// Mock com tipos corretos
jest.mock('@prisma/client', () => {
  const mockPrisma = {
    ticket: {
      create: jest.fn()
    },
    $disconnect: jest.fn()
  };
  
  return {
    PrismaClient: jest.fn(() => mockPrisma),
    Priority: {
      LOW: 'LOW',
      MEDIUM: 'MEDIUM', 
      HIGH: 'HIGH'
    },
    Status: {
      OPEN: 'OPEN',
      IN_PROGRESS: 'IN_PROGRESS', 
      RESOLVED: 'RESOLVED',
      CLOSED: 'CLOSED'
    }
  };
});

// Interface para o mock
interface MockTicket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

describe('Ticket Service', () => {
  let prisma: any;

  beforeEach(() => {
    prisma = new PrismaClient();
  });

  test('createTicket should call prisma.ticket.create with correct data', async () => {
    const mockData = {
      title: 'Test Ticket',
      description: 'Test Description',
      priority: 'HIGH' as Priority,
      category: 'Test',
      userId: 'cmezyxd940000pvrl8jgwgrh0'
    };

    const mockResult: MockTicket = {
      id: 'ticket-1',
      ...mockData,
      status: 'OPEN' as Status,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Mock resolvido com tipo any para evitar erros
    prisma.ticket.create.mockResolvedValue(mockResult as any);

    const result = await createTicket(mockData);

    expect(prisma.ticket.create).toHaveBeenCalledWith({
      data: {
        ...mockData,
        status: 'OPEN'
      },
      include: {
        createdBy: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    expect(result).toEqual(mockResult);
  });
});