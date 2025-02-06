import { db } from "@/server/db";
import {
  CreatePrismaUser,
  LoginStatus,
  PublicSafeUser,
  UserFromAuthCheck,
  UserFromLoginCheck,
} from "@/types/spent";

export const user = {
  create: async (user: CreatePrismaUser) => {
    await db.user.create({ data: { ...user } });
  },

  registerCheck: async (email: string) => {
    return await db.user.findFirst({ where: { email } });
  },

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
