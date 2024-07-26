import { z } from 'zod';

export const EnterpriseDataSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome da empresa deve ter no mínimo 3 caracteres, podendo ter números e letras.' }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'O CNPJ cadastrado é inválido!',
  }),
  cellphone: z.string().regex(/^\d{2} \d{5}(?:-?\d{4})?$/, { message: 'O telefone é inválido.' }),
});
