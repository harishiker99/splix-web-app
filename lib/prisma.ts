import { Prisma, PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient()

export const chats = prisma.chat;

export const messages = prisma.message;