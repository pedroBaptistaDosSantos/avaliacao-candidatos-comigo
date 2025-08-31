import { Request, Response } from 'express';
import { validateTicket } from '../../controllers/ticketController';

describe('Ticket Controller - validateTicket', () => {
  test('deve retornar sucesso para dados válidos', () => {
    const mockRequest = {
      body: {
        title: 'Problema com login',
        description: 'Não consigo fazer login no sistema',
        priority: 'HIGH',
        status: 'OPEN',
        category: 'Autenticação'
      }
    } as Request;

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockResponse = {
      status: mockStatus,
      json: mockJson
    } as unknown as Response;

    validateTicket(mockRequest, mockResponse);

    // Verifique as chamadas
    expect(mockStatus).toHaveBeenCalledWith(200);
    expect(mockJson).toHaveBeenCalledWith({
      success: true,
      message: 'Dados validados com sucesso',
      data: expect.objectContaining({
        title: 'Problema com login'
      })
    });
  });

  test('deve retornar erro para título vazio', () => {
    const mockRequest = {
      body: {
        title: '',
        description: 'Descrição válida',
        priority: 'HIGH',
        status: 'OPEN',
        category: 'Categoria válida'
      }
    } as Request;

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    const mockResponse = {
      status: mockStatus,
      json: mockJson
    } as unknown as Response;

    validateTicket(mockRequest, mockResponse);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      success: false,
      message: 'Erro de validação',
      errors: expect.arrayContaining([
        expect.objectContaining({
          field: 'title'
        })
      ])
    });
  });
});