import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { prisma } from 'src/lib/prisma';
import type { Environment } from 'vitest/environments';

function generateURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Informe a URL de conexão');
  }

  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.set('schema', schema);

  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    // Criar banco de testes (schema de testes)
    const schema = randomUUID();
    const url = generateURL(schema);

    process.env.DATABASE_URL = url;
    execSync('npx prisma migrate deploy', { stdio: 'ignore' });

    return {
      async teardown() {
        // Apagar o banco de testes
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
        await prisma.$disconnect();
      },
    };
  },
};
