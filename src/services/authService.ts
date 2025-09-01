import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  name: string;
  password: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export const registerUser = async (data: RegisterData) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  return await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true
    }
  });
};

export const loginUser = async (data: LoginData) => {
  const user = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (!user || !(await bcrypt.compare(data.password, user.password))) {
    throw new Error('Credenciais inválidas');
  }

  const payload = { 
    userId: user.id, 
    email: user.email,
    role: user.role 
  };

  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET não configurado');
  }

  const token = jwt.sign(payload, secret, { expiresIn: '7d' });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    }
  };
};

export const verifyToken = (token: string): JwtPayload => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET não configurado');
  }
  
  return jwt.verify(token, secret) as JwtPayload;
};