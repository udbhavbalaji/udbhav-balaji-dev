// External Imports
import { type NextRequest, NextResponse } from "next/server";

// Internal Imports
import { ForbiddenError } from "@spent-api/_lib/errors";
import { expense as prisma } from "@spent-api/_lib/db";
import { WithSpentErrorsHandled } from "@api/_middleware/spent";
import {
  filterMerchants,
  getExpensesBetween,
  filterCategories,
  filterSubCategories,
} from "@spent-api/expenses/_lib/utils";
import {
  type ExpenseDateRouteInput,
  type PrismaExpense,
  type SpentAPISuccessResponse,
  SpentExceptionCodes,
} from "@/types/spent";

// todo: need to add support for filtering merchants, categories and sub-catergories (all or only one?)
const FilterDateRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<Array<PrismaExpense>>>> => {
  // warn: need to double check the logic for this route handler
  const {
    startDate,
    endDate,
    merchants,
    categories,
    subCategories,
  }: ExpenseDateRouteInput = await request.json();
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  // get all expenses from the user
  const allUserExpenses = await prisma.getAll(userId);
  //
  // filter the expenses by date
  let filteredExpenses: PrismaExpense[] = allUserExpenses;

  filteredExpenses = getExpensesBetween(startDate, endDate, filteredExpenses);

  // note: filtering by category first as it keeps most transactions (even if the user chooses to map it to a different category) ?
  if (categories) {
    filteredExpenses = filterCategories(categories, filteredExpenses);
  }

  if (merchants) {
    filteredExpenses = filterMerchants(merchants, filteredExpenses);
  }

  if (subCategories) {
    filteredExpenses = filterSubCategories(subCategories, filteredExpenses);
  }

  // return the filtered expenses
  const response: SpentAPISuccessResponse<Array<PrismaExpense>> = {
    status: 200,
    body: filteredExpenses,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const GET = WithSpentErrorsHandled(FilterDateRouteHandler);
