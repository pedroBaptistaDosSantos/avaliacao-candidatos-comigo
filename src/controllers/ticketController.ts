import { Request, Response } from 'express';
import { ticketSchema } from '../types/tickets';
import { isZodError, formatZodError } from '../utils/zodHelpers';

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