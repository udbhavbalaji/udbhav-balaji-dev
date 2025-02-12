import {
  PrismaExpense,
  SpentAPISuccessResponse,
  SpentExceptionCodes,
} from "@/types/spent";
import { ForbiddenError } from "@spent-api/_lib/errors";
import { NextRequest, NextResponse } from "next/server";
import {
  getExpensesBetween,
  filterCategories,
  filterSubCategories,
  filterMerchants,
} from "../_lib/utils";
import { expense as prisma } from "@/app/api/spent/_lib/db";
import { withSpentRouteErrorsHandled } from "@spent-api/_lib/middleware";

// todo: need to add support for filtering merchants, categories and sub-catergories (all or only one?)
const FilterRangeRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<Array<PrismaExpense>>>> => {
  const { timeRange, categories, merchants, subCategories } =
    await request.json();
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  if (!timeRange) {
    throw new Error("Time range is needed");
  }

  const currDate = new Date();
  const currDateStr = currDate.toISOString().split("T")[0];

  let startDate: Date;

  // bug: definitely need to triple check this, ill be surpised if this works as is
  switch (timeRange) {
    case "1 week":
      startDate = new Date(currDate.setDate(currDate.getDate() - 7));
      break;
    case "2 weeks":
      startDate = new Date(currDate.setDate(currDate.getDate() - 14));
      break;
    case "1 month":
      startDate = new Date(currDate.setDate(currDate.getDate() - 30));
      break;
    case "3 months":
      startDate = new Date(currDate.setDate(currDate.getMonth() - 3));
      break;
    case "6 months":
      startDate = new Date(currDate.setDate(currDate.getMonth() - 6));
      break;
    case "1 year":
      startDate = new Date(currDate.setDate(currDate.getFullYear() - 1));
      break;
    default:
      throw new Error("Invalid time range");
  }

  const startDateStr = startDate.toISOString().split("T")[0];

  if (!startDateStr || !currDateStr) throw new Error("Date doesn't exist");

  const allUserExpenses = await prisma.getAll(userId);

  let filteredExpenses: PrismaExpense[] = allUserExpenses;

  filteredExpenses = getExpensesBetween(
    startDateStr,
    currDateStr,
    filteredExpenses,
  );

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

  const response: SpentAPISuccessResponse<Array<PrismaExpense>> = {
    status: 200,
    body: filteredExpenses,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const GET = withSpentRouteErrorsHandled(FilterRangeRouteHandler);
