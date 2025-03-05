import { db } from "@/server/db";
import { LoginStatus, SpentExceptionCodes } from "@/types/spent";
import { UBDevException } from "@api-lib/errors";
import { BadRequestError } from "@spent-api-lib/errors";
import type {
  Category,
  CreatePrismaUser,
  Merchant,
  PrismaExpense,
  PrismaItem,
  PrismaReceipt,
  PublicSafeUser,
  SubCategory,
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
  add: async (
    receipt: PrismaReceipt,
    items: PrismaItem[],
    expense: PrismaExpense,
  ): Promise<void> => {
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
      omit: { id: true },
      where: { userId },
    });
  },
};

export const merchant = {
  // info: throws PrismaClientKnownRequestError when merchant isn't found
  get: async (merchantName: string, userId: string): Promise<Merchant> => {
    return await db.merchant.findFirstOrThrow({
      where: { name: merchantName, userId },
    });
  },

  getAll: async (userId: string): Promise<Merchant[]> => {
    return await db.merchant.findMany({
      where: { userId },
    });
  },

  update: async (merchant: Merchant): Promise<void> => {
    await db.merchant.update({
      where: { name: merchant.name, userId: merchant.userId },
      data: merchant,
    });
  },

  getSafely: async (
    merchantName: string,
    userId: string,
  ): Promise<Merchant | undefined> => {
    const merchant = await db.merchant.findFirst({
      where: { name: merchantName, userId },
    });

    if (!merchant) return undefined;
    else return merchant;
  },

  add: async (merchant: Merchant): Promise<void> => {
    await db.merchant.create({
      data: merchant,
    });
  },

  delete: async (merchantName: string, userId: string): Promise<void> => {
    await db.merchant.delete({
      where: { name: merchantName, userId },
    });
  },
};

export const category = {
  getAll: async (userId: string): Promise<Category[]> => {
    return await db.category.findMany({
      where: { userId },
    });
  },

  get: async (name: string, userId: string) => {
    return await db.category.findFirstOrThrow({
      where: { name, userId },
    });
  },

  getSafely: async (
    name: string,
    userId: string,
  ): Promise<Category | undefined> => {
    const category = await db.category.findFirst({
      where: { name, userId },
    });

    if (!category) return undefined;
    else return category;
  },

  add: async (category: Category): Promise<void> => {
    await db.category.create({
      data: category,
    });
  },

  update: async (category: Category): Promise<void> => {
    await db.category.update({
      where: { name: category.name, userId: category.userId },
      data: category,
    });
  },

  delete: async (categoryName: string, userId: string): Promise<void> => {
    await db.category.delete({
      where: { name: categoryName, userId },
    });
  },
};

export const subCategory = {
  get: async (
    subCategoryName: string,
    userId: string,
  ): Promise<SubCategory> => {
    return await db.subCategory.findFirstOrThrow({
      where: { name: subCategoryName, userId },
    });
  },

  getSafely: async (
    subCategoryName: string,
    userId: string,
  ): Promise<SubCategory | undefined> => {
    const subCategory = await db.subCategory.findFirst({
      where: { name: subCategoryName, userId },
    });

    if (!subCategory) return undefined;
    else return subCategory;
  },

  getAll: async (userId: string): Promise<SubCategory[]> => {
    return await db.subCategory.findMany({
      where: { userId },
    });
  },

  add: async (subCategory: SubCategory): Promise<void> => {
    await db.subCategory.create({
      data: subCategory,
    });
  },

  update: async (subCategory: SubCategory): Promise<void> => {
    await db.subCategory.update({
      where: { name: subCategory.name, userId: subCategory.userId },
      data: subCategory,
    });
  },

  delete: async (subCategoryName: string, userId: string): Promise<void> => {
    await db.subCategory.delete({
      where: { name: subCategoryName, userId },
    });
  },
};

// export const createTrx = async (
//   receipt: PrismaReceipt,
//   items: PrismaItem[],
//   expense: PrismaExpense,
// ): Promise<void> => {
//   await db.$transaction(async (trx) => {
//     const receiptPromise = await trx.receipt.create({ data: receipt });
//     const itemsPromise = await trx.item.createMany({ data: items });
//     const expensePromise = await trx.expense.create({ data: expense });
//
//     // warn: nees to check that this works to ensure that the treansaction fails, otherwise there's no point of doing it as a transaction.
//     return Promise.all([receiptPromise, itemsPromise, expensePromise]);
//   });
// };

export const createTrx = async (
  receipt: PrismaReceipt,
  items: PrismaItem[],
  expense: PrismaExpense,
): Promise<void> => {
  await db.$transaction([
    db.receipt.create({ data: receipt }),
    db.item.createMany({ data: items }),
    db.expense.create({ data: expense }),
  ]);
  // await db.$transaction(async (trx) => {
  //   const receiptPromise = await trx.receipt.create({ data: receipt });
  //   const itemsPromise = await trx.item.createMany({ data: items });
  //   const expensePromise = await trx.expense.create({ data: expense });
  //
  //   // warn: nees to check that this works to ensure that the treansaction fails, otherwise there's no point of doing it as a transaction.
  //   return Promise.all([receiptPromise, itemsPromise, expensePromise]);
  // });
};

export const createUserTrx = async (user: CreatePrismaUser) => {
  return await db.$transaction(async (trx) => {
    const userPromise = await trx.user.create({ data: user });
    const categoryPromise = await trx.category.create({
      data: { name: "Unknown", userId: user.userId },
    });
    const subCategoryPromise = await trx.subCategory.create({
      data: { name: "Unknown", categoryName: "Unknown", userId: user.userId },
    });

    return Promise.all([userPromise, categoryPromise, subCategoryPromise]);
  });
};
