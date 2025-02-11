import { db } from "@/server/db";
import {
  CreatePrismaUser,
  LoginStatus,
  Merchant,
  PrismaExpense,
  PrismaItem,
  PrismaReceipt,
  PublicSafeUser,
  SpentExceptionCodes,
  SubCategory,
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
      console.log("im here sha lala", err);

      console.log();
      if (err instanceof UBDevException && err.name === "PrismaNotFoundError") {
        console.log("correct error throwing");
        throw BadRequestError(
          "Invalid credentials",
          SpentExceptionCodes.NOT_FOUND,
          404,
          err,
          err.details,
        );
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

export const receipt = {
  add: async (receipt: PrismaReceipt, items: PrismaItem[], expense: PrismaExpense): Promise<void> => {
    await db.$transaction(async (trx) => {
      await trx.receipt.create({ data: receipt });
      await trx.item.createMany({ data: items });
      await trx.expense.create({ data: expense });
    });
  },

  get: async (receiptId: string, userId: string): Promise<PrismaReceipt> => {
    return await db.receipt.findFirstOrThrow({
      where: { receiptId, userId },
    });
  },
};


export const expense = {
  getAll: async (userId: string): Promise<PrismaExpense[]> => {
    return await db.expense.findMany({
      omit: { id: true, },
      where: { userId },
    });
  },
}


export const merchant = {
  // info: throws PrismaClientKnownRequestError when merchant isn't found
  get: async (merchantName: string, userId: string): Promise<Merchant> => {
    return await db.merchant.findFirstOrThrow({
      where: { name: merchantName, userId },
    });
  },
};

export const subCategory = {
  get: async (subCategoryName: string, userId: string): Promise<SubCategory> => {
    return await db.subCategory.findFirstOrThrow({
      where: { name: subCategoryName, userId },
    });
  },
}

export const createTrx = async (receipt: PrismaReceipt, items: PrismaItem[], expense: PrismaExpense): Promise<void> => {
  await db.$transaction(async (trx) => {
    await trx.receipt.create({ data: receipt });
    await trx.item.createMany({ data: items });
    await trx.expense.create({ data: expense });
  });
};



