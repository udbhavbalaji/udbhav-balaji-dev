// External Imports

// Internal Imports
import type { PrismaExpense, PrismaReceipt } from "@/types/spent";
import { UBDevException } from "@api/_lib/errors";
import {
  merchant as prismaMerchant,
  subCategory as prismaSubcategory,
} from "@spent-api/_lib/db";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const getExpenseFromReeceipt = async (
  receipt: PrismaReceipt,
): Promise<PrismaExpense> => {
  const subCategory = await subcategory.get(
    receipt.merchantName,
    receipt.userId,
  );
  const mappedCategory = await category.get(subCategory, receipt.userId);
  const expense: PrismaExpense = {
    userId: receipt.userId,
    receiptId: receipt.receiptId,
    categoryName: mappedCategory,
    subCategoryName: subCategory,
    merchantName: receipt.merchantName,
    date: receipt.date,
    currency: receipt.currency,
    total: receipt.total,
  };
  return expense;
};

// todo: need to add merchant name function as well (basically returning user-mapped merchant name, or else the merchant name iteslf) -> This means that the mapping operation is done on server

/* note:  Once the receipt is processed, the user is shown the output of the 
          receipt to confirm. Here, I want them to see the mapped name (if any)
          else the received name itself
          results in once the asprise api responce is received, the user's mappings are retrieved 
          and the merchant name is mapped if the name matches.
          So, in the backend, when user adds a receipt, then the merchant name being receieved is
          already a name that has been mapped if the user wants it to happen. So, we don't modify the 
          merchant name upon creating expense */

const subcategory = {
  get: async (merchantName: string, userId: string): Promise<string> => {
    try {
      const merchant = await prismaMerchant.get(merchantName, userId);
      return merchant.subCategoryName;
    } catch (err) {
      if (err instanceof UBDevException) {
        console.log("im coming here");
        console.log("error", err);
        if (
          err.name === "PrismaNotFoundError" &&
          err.details?.model === "Merchant"
        ) {
          return "Unknown";
        }
      }
      throw err;
    }
  },
};

const category = {
  get: async (subCategory: string, userId: string): Promise<string> => {
    if (subCategory === "Unknown") return "Unknown";

    try {
      const subcategory = await prismaSubcategory.get(subCategory, userId);
      return subcategory.categoryName;
    } catch (err) {
      if (err instanceof UBDevException) {
        if (
          err.name === "PrismaNotFoundError" &&
          err.details?.model === "subCategory"
        ) {
          return "Unknown";
        }
      }
      throw err;
    }
  },
};

export const getExpensesBetween = (
  startDateStr: string,
  endDateStr: string,
  expenses: PrismaExpense[],
): PrismaExpense[] => {
  const filteredExpenses: PrismaExpense[] = [];

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);
    expenseDate.setHours(0, 0, 0, 0);

    if (expenseDate >= startDate && expenseDate <= endDate) {
      filteredExpenses.push(expense);
    }
  });

  return filteredExpenses;
};

export const filterMerchants = (
  merchants: string[],
  expenses: PrismaExpense[],
): PrismaExpense[] => {
  if (merchants.length === 0) return expenses;

  const filteredExpenses: PrismaExpense[] = [];

  expenses.forEach((expense) => {
    if (merchants.includes(expense.merchantName)) {
      filteredExpenses.push(expense);
    }
  });

  return filteredExpenses;
};

export const filterCategories = (
  categories: string[],
  expenses: PrismaExpense[],
): PrismaExpense[] => {
  if (categories.length === 0) return expenses;

  const filteredExpenses: PrismaExpense[] = [];

  expenses.forEach((expense) => {
    if (categories.includes(expense.categoryName)) {
      filteredExpenses.push(expense);
    }
  });

  return filteredExpenses;
};

export const filterSubCategories = (
  subCategories: string[],
  expenses: PrismaExpense[],
): PrismaExpense[] => {
  if (subCategories.length === 0) return expenses;

  const filteredExpenses: PrismaExpense[] = [];

  expenses.forEach((expense) => {
    if (subCategories.includes(expense.subCategoryName)) {
      filteredExpenses.push(expense);
    }
  });

  return filteredExpenses;
};
