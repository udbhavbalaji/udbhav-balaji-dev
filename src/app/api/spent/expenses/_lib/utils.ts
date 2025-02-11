import { PrismaExpense, PrismaReceipt } from "@/types/spent";
import { UBDevException } from "@api/_lib/errors";
import { merchant as prismaMerchant, subCategory as prismaSubcategory } from "@spent-api/_lib/db";

export const getExpenseFromReeceipt = async (receipt: PrismaReceipt): Promise<PrismaExpense> => {
  const subCategory = await subcategory.get(receipt.merchantName, receipt.userId);
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

// todo: need to add merchant name function as well (basically returning user-mapped merchant name, or else the merchant name iteslf)



const subcategory = {
  get: async (merchantName: string, userId: string): Promise<string> => {
    try {
      const merchant = await prismaMerchant.get(merchantName, userId);
      return merchant.subCategoryName;
    } catch (err) {
      if (err instanceof UBDevException) {
        if (err.name === "PrismaNotFoundError" && err.details.model === 'merchant') {
          return "Unknown"
        }
      }
      throw err;
    }
  },
}

const category = {
  get: async (subCategory: string, userId: string): Promise<string> => {
    if (subCategory === "Unknown") return "Unknown";

    try {
      const subcategory = await prismaSubcategory.get(subCategory, userId);
      return subcategory.categoryName;
    } catch (err) {
      if (err instanceof UBDevException) {
        if (err.name === "PrismaNotFoundError" && err.details.model === "subCategory") {
          return "Unknown";
        }
      }
      throw err;
    }
  },
}


export const getExpensesBetween = (startDateStr: string, endDateStr: string, expenses: PrismaExpense[]): PrismaExpense[] => {
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







