import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined;
}

// Этот файл необходим для расширения глобального пространства имён.
export {};
