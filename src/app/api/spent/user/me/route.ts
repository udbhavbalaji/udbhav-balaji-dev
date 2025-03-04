import {
  PublicSafeUser,
  SpentAPISuccessResponse,
  SpentExceptionCodes,
  SpentRouteHandler,
} from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { ForbiddenError } from "@/app/api/spent/_lib/errors";
import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import { user as prisma } from "@/app/api/spent/_lib/db";

const MeRouteHandler: SpentRouteHandler = async (request: NextRequest) => {
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const user = await prisma.me(userId);

  const response: SpentAPISuccessResponse<{ user: PublicSafeUser }> = {
    status: 200,
    body: { user },
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const GET = WithSpentErrorsHandled(MeRouteHandler);
