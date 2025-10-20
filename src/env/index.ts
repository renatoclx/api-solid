import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333), // Converte para number (coerce)
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Variáveis de ambiente inválidas', _env.error.format());
  throw new error('Invalid environment variables'); // Derruba a aplicação como um todo
}

export const env = _env.data; // Depois de validado, trás os valores das variáveis
