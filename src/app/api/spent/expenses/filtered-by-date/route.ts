import { PrismaExpense, SpentAPISuccessResponse, SpentExceptionCodes } from "@/types/spent";
import { ForbiddenError } from "@spent-api/_lib/errors";
import { NextRequest, NextResponse } from "next/server";
import { expense as prisma } from "@spent-api/_lib/db";
import { getExpensesBetween } from "../_lib/utils";
import { withSpentRouteErrorsHandled } from "@spent-api/_lib/middleware";

const FilterDateRouteHandler = async (request: NextRequest): Promise<NextResponse<SpentAPISuccessResponse<Array<PrismaExpense>>>> => {
  // warn: need ot double check the logic for this route handler
  const { startDate, endDate } = await request.json();
  const userId = request.headers.get('user-id');

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


  //
  // return the filtered expenses
  //
  const response: SpentAPISuccessResponse<Array<PrismaExpense>> = {
    status: 200,
    body: filteredExpenses
  }

  return NextResponse.json({ ...response }, { status: response.status });
};


export const GET = withSpentRouteErrorsHandled(FilterDateRouteHandler);

