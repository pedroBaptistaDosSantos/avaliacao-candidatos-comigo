import { ZodError } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export const formatZodError = (error: ZodError): ValidationError[] => {
  return error.issues.map(issue => ({
    field: issue.path.join('.'),
    message: issue.message
  }));
};

export const isZodError = (error: unknown): error is ZodError => {
  return error instanceof ZodError;
};