// External Imports
import { type NextRequest, NextResponse } from "next/server";
// Internal Imports
import { receipt as prisma } from "@spent-api-lib/db";
import { BadRequestError, ForbiddenError } from "@spent-api-lib/errors";
import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import {
  type PrismaReceipt,
  type SpentAPISuccessResponse,
  SpentExceptionCodes,
} from "@/types/spent";

const GetReceiptRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<PrismaReceipt>>> => {
  const receiptId = request.nextUrl.searchParams.get("receiptId");
  const userId = request.headers.get("user-id");

  if (!receiptId)
    throw BadRequestError(
      "Receipt ID not found",
      SpentExceptionCodes.SEARCH_PARAMS_MISSING,
    );

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const receipt = await prisma.get(receiptId, userId);

  const response: SpentAPISuccessResponse<PrismaReceipt> = {
    status: 200,
    body: { ...receipt },
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const GET = WithSpentErrorsHandled(GetReceiptRouteHandler);
