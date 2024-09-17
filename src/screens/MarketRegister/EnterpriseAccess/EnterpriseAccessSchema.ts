import { z } from 'zod';

export const EnterpriseAccessSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome da empresa deve ter no mínimo 3 caracteres, podendo ter números e letras.' }),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'O email informado é inválido.' }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um caractere especial, e um número.',
  }),
  password_confirmation: z.string().min(8),
});
