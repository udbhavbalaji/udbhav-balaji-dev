import { Prisma, PrismaClient } from "@prisma/client";

import { adapter } from "./libsql";
import { env } from "@/env";
import {
  AuthUser,
  LoginStatus,
  LoginUser,
  PrismaItem,
  PrismaReceipt,
  PublicUser,
  SpentExceptionCodes,
} from "@/types/spent";
// import { Spent } from "@/types";

// import { Spent } from "@/types";
import { PrismaNotFoundError } from "@/app/api/_lib/errors";

const createPrismaClient = () => {
  const db = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter,
  });

  const extendedDb = db.$extends({
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
    model: {
      user: {
        loginCheck: async (email: string): Promise<LoginUser> => {
          return await db.user.findFirstOrThrow({
            select: {
              userId: true,
              loggedIn: true,
              password: true,
              lastGeneratedToken: true,
            },
            where: { email },
          });
        },
        authCheck: async (userId: string): Promise<AuthUser> => {
          return await db.user.findFirstOrThrow({
            select: {
              userId: true,
              loggedIn: true,
              lastGeneratedToken: true,
            },
            where: { userId },
          });
        },

        login: async (userId: string, token: string): Promise<void> => {
          await db.user.update({
            where: { userId },
            data: {
              loggedIn: LoginStatus.LOGGED_IN,
              lastGeneratedToken: token,
            },
          });
        },

        logout: async (userId: string): Promise<void> => {
          await db.user.update({
            where: { userId },
            data: { loggedIn: LoginStatus.LOGGED_OUT },
          });
        },

        me: async (userId: string): Promise<PublicUser> => {
          return await db.user.findFirstOrThrow({
            select: {
              userId: true,
              firstName: true,
              lastName: true,
              email: true,
              loggedIn: true,
            },
            where: { userId },
          });
        },
      },
      receipt: {
        add: async (receipt: PrismaReceipt, items: PrismaItem[]) => {
          await db.$transaction(async (trx) => {
            await trx.receipt.create({ data: receipt });
            await trx.item.createMany({ data: items });
          });
        },
      },
    },
  });

  return extendedDb;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
