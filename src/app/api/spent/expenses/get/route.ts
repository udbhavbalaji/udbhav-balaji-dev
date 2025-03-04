import {
  PrismaExpense,
  SpentAPISuccessResponse,
  SpentExceptionCodes,
} from "@/types/spent";
import { ForbiddenError } from "@spent-api/_lib/errors";
import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import { NextRequest, NextResponse } from "next/server";
import { expense as prisma } from "@/app/api/spent/_lib/db";

const GetExpensesRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<PrismaExpense[]>>> => {
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const allExpenses = await prisma.getAll(userId);

  const response: SpentAPISuccessResponse<PrismaExpense[]> = {
    status: 200,
    body: allExpenses,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const GET = WithSpentErrorsHandled(GetExpensesRouteHandler);
