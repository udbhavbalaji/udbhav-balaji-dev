import { Prisma, PrismaClient } from "@prisma/client";

export type { User, Receipt, Item } from "@prisma/client";

import { adapter } from "@/server/libsql";
import { env } from "@/env";

import { PrismaNotFoundError } from "@api-lib/errors";

const createPrismaClient = () => {
  const db = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter,
  }).$extends({
    query: {
      $allOperations: async ({
        model,
        operation,
        args,
        query,
      }: {
        model?: string;
        operation: string;
        args: Prisma.MiddlewareParams["args"];
        query: (args: Prisma.MiddlewareParams["args"]) => Promise<unknown>;
      }) => {
        console.log("allOperations");
        try {
          return await query(args);
        } catch (err) {
          // console.log(err);
          if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === "P2025") {
              throw PrismaNotFoundError("Not found", 404, err, {
                model,
                operation,
                args,
              });
            }
          } else throw err;
        }
      },
    },
  });

  return db;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
