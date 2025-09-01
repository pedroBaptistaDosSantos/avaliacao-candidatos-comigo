import { Request, Response } from 'express';
import { ticketSchema } from '../types/tickets';
import { isZodError, formatZodError } from '../utils/zodHelpers';
import * as ticketService from '../services/ticketService';

// Função validateTicket (validação sem salvar)
export const validateTicket = (req: Request, res: Response): void => {
  try {
    const validatedData = ticketSchema.parse(req.body);
    
    res.status(200).json({
      success: true,
      message: 'Dados validados com sucesso',
      data: validatedData
    });
    
  } catch (error: unknown) {
    if (isZodError(error)) {
      const validationErrors = formatZodError(error);
      
      res.status(400).json({
        success: false,
        message: 'Erro de validação',
        errors: validationErrors
      });
      return;
    }
    
    console.error('Erro interno:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Função createTicket (criação com persistência)
export const createTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, priority, category, userId } = req.body;
    
    const ticket = await ticketService.createTicket({
      title,
      description,
      priority,
      category,
      userId
    });
    
    res.status(201).json({
      success: true,
      message: 'Ticket criado com sucesso',
      data: ticket
    });
    
  } catch (error) {
    console.error('Erro ao criar ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

// Função getTickets (listagem)
export const getTickets = async (req: Request, res: Response): Promise<void> => {
  try {
    const tickets = await ticketService.getTickets();
    
    res.status(200).json({
      success: true,
      data: tickets
    });
    
  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const deleteTicket = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    await ticketService.deleteTicket(id);
    
    res.status(200).json({
      success: true,
      message: 'Ticket deletado com sucesso'
    });
    
  } catch (error) {
    console.error('Erro ao deletar ticket:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};