import { Prisma, PrismaClient } from "@prisma/client";
export type { User, Receipt, Item } from "@prisma/client";
import { adapter } from "./libsql";
import { env } from "@/env";
import {
  LoginStatus,
  PrismaItem,
  PrismaReceipt,
  PublicSafeUser,
  UserFromAuthCheck,
  UserFromLoginCheck,
} from "@/types/spent";

import { PrismaNotFoundError } from "@/app/api/_lib/errors";

const createPrismaClient = () => {
  const db = new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    // adapter: env.NODE_ENV === "development" ? null : adapter,
    adapter,
  });

  const extendedDb = db.$extends({
  
    // query: {
    //   $allOperations: async ({
    //     model,
    //     operation,
    //     args,
    //     query,
    //   }: {
    //     model?: string;
    //     operation: string;
    //     args: Prisma.MiddlewareParams["args"];
    //     query: (args: Prisma.MiddlewareParams["args"]) => Promise<unknown>;
    //   }) => {
    //     console.log("allOperations");
    //     try {
    //       return await query(args);
    //     } catch (err) {
    //       console.log(err);
    //       if (err instanceof Prisma.PrismaClientKnownRequestError) {
    //         if (err.code === "P2025") {
    //           throw PrismaNotFoundError("Not found", 404, err, {
    //             model,
    //             operation,
    //             args,
    //           });
    //         }
    //       } else throw err;
    //     }
    //   },
    // },
    model: {
      user: {
        loginCheck: async (email: string): Promise<UserFromLoginCheck> => {
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
        authCheck: async (userId: string): Promise<UserFromAuthCheck> => {
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

        me: async (userId: string): Promise<PublicSafeUser> => {
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

  const errorHandledDb = extendedDb.$extends({
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
          console.log(err);
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

  return errorHandledDb;
};

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
