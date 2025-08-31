import { ZodError } from 'zod';
import { formatZodError, isZodError } from '../../utils/zodHelpers';

describe('Zod Helpers', () => {
  describe('isZodError', () => {
    test('deve retornar true para ZodError', () => {
      const error = new ZodError([]);
      expect(isZodError(error)).toBe(true);
    });

    test('deve retornar false para Error comum', () => {
      const error = new Error('Erro comum');
      expect(isZodError(error)).toBe(false);
    });
  });

  describe('formatZodError', () => {
    test('deve formatar erro do Zod corretamente', () => {
      const mockError = {
        issues: [
          { path: ['title'], message: 'Título é obrigatório' },
          { path: ['description'], message: 'Descrição é obrigatória' }
        ]
      } as unknown as ZodError;

      const result = formatZodError(mockError);

      expect(result).toHaveLength(2);
      expect(result[0].field).toBe('title');
      expect(result[1].field).toBe('description');
    });
  });
});