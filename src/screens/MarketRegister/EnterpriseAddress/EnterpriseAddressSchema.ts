import { z } from 'zod';

export const EnterpriseAddressSchema = z.object({
  street: z.string().min(3, { message: 'O nome da rua deve ter no mínimo 3 caracteres.' }),
  neighborhood: z.string().min(3, { message: 'O nome do bairro deve ter no mínimo 3 caracteres.' }),
  number: z.string().min(1, { message: 'O número do endereço deve ser preenchido.' }),
  zipcode: z.string().regex(/^\d{5}-\d{3}$/, { message: 'O CEP inserido é inválido!' }),
});
