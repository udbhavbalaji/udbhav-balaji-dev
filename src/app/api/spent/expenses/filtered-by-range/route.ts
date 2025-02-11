import { PrismaExpense, SpentAPISuccessResponse, SpentExceptionCodes } from "@/types/spent"
import { ForbiddenError } from "@spent-api/_lib/errors";
import { NextRequest, NextResponse } from "next/server"


const FilterRangeRouteHandler = async (request: NextRequest): Promise<NextResponse<SpentAPISuccessResponse<Array<PrismaExpense>>>> => {
  const { timeRange } = await request.json();
  const userId = request.headers.get('user-id');

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  if (!timeRange) {
    throw new Error("Time range is needed");
  }

  const currDate = new Date();

  let startDate: Date;

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

  const allExpenses = await prism


};


