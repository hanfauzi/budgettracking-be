import { ENV } from '../config/env';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

if (!ENV.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Check your .env file.');
}

const adapter = new PrismaPg({ connectionString: ENV.DATABASE_URL });
export const prisma = new PrismaClient({ adapter });
