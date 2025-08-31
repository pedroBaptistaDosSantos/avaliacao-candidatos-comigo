import { z } from 'zod';

export const ticketSchema = z.object({
    title: z.string().min(1, "Título é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']),
    category: z.string().min(1, "Categoria é obrigatória")
});

export type Ticket = z.infer<typeof ticketSchema>;