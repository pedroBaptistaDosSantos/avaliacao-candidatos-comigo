import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name, password } = req.body;

    const user = await registerUser({ email, name, password });

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso',
      data: user
    });

  } catch (error: any) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso',
      data: result
    });

  } catch (error: any) {
    if (error.message === 'Credenciais inválidas') {
      res.status(401).json({
        success: false,
        message: 'Email ou senha incorretos'
      });
      return;
    }

    console.error('Erro no login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno do servidor'
    });
  }
};