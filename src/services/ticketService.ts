import { PrismaClient, Priority, Status } from '@prisma/client';

const prisma = new PrismaClient();

export interface CreateTicketData {
  title: string;
  description: string;
  priority: Priority;
  category: string;
  userId: string;
}

export const createTicket = async (data: CreateTicketData) => {
  return await prisma.ticket.create({
    data: {
      ...data,
      status: Status.OPEN
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
};

export const getTickets = async () => {
  return await prisma.ticket.findMany({
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

export const getTicketById = async (id: string) => {
  return await prisma.ticket.findUnique({
    where: { id },
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
};

export const updateTicket = async (id: string, data: Partial<{
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  category: string;
}>) => {
  return await prisma.ticket.update({
    where: { id },
    data,
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
};

export const deleteTicket = async (id: string) => {
  return await prisma.ticket.delete({
    where: { id }
  });
};