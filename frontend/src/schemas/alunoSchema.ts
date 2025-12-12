import { z } from 'zod';

export const alunoSchema = z.object({
  nome: z.string()
    .min(3, 'Nome deve ter pelo menos 3 caracteres')
    .max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string()
    .email('Email inválido')
    .max(150, 'Email deve ter no máximo 150 caracteres'),
  telefone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 caracteres')
    .max(20, 'Telefone deve ter no máximo 20 caracteres')
    .regex(/^[\d\s\-()+]+$/, 'Telefone deve conter apenas números, espaços e caracteres especiais'),
});

export type AlunoFormData = z.infer<typeof alunoSchema>;