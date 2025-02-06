import { db } from "@/server/db";
import {
  CreatePrismaUser,
  LoginStatus,
  PublicSafeUser,
  SpentExceptionCodes,
  UserFromAuthCheck,
  UserFromLoginCheck,
} from "@/types/spent";
import { UBDevException } from "@api-lib/errors";
import { BadRequestError } from "@spent-api-lib/errors";

export const user = {
  create: async (user: CreatePrismaUser) => {
    await db.user.create({ data: { ...user } });
  },

  registerCheck: async (email: string) => {
    return await db.user.findFirst({ where: { email } });
  },

  loginCheck: async (email: string): Promise<UserFromLoginCheck> => {
    try {
      return await db.user.findFirstOrThrow({
        select: {
          userId: true,
          loggedIn: true,
          password: true,
          lastGeneratedToken: true,
        },
        where: { email },
      });
    } catch (err) {
      console.log('im here sha lala', err);

      console.log();
      if (err instanceof UBDevException && err.name === "PrismaNotFoundError") {
        console.log("correct error throwing");
        throw BadRequestError("Invalid credentials", SpentExceptionCodes.NOT_FOUND, 404, err, err.details);
      } else throw err;
    }
  },

  login: async (userId: string, token: string) => {
    await db.user.update({
      where: { userId },
      data: {
        loggedIn: LoginStatus.LOGGED_IN,
        lastGeneratedToken: token,
      },
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

  logout: async (userId: string): Promise<void> => {
    await db.user.update({
      where: { userId },
      data: { loggedIn: LoginStatus.LOGGED_OUT },
    });
  },

  delete: async (userId: string) => {
    await db.user.delete({ where: { userId } });
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
};
