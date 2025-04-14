// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Evita recriar o PrismaClient a cada reload no modo dev (Hot Reload)
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // opcional: mostra as queries no terminal
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
