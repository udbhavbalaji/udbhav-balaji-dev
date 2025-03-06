// External Imports
import { type NextRequest, NextResponse } from "next/server";

// Internal Imports
import { ForbiddenError } from "@/app/api/spent/_lib/errors";
import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import { user as prisma } from "@/app/api/spent/_lib/db";
import {
  type PublicSafeUser,
  type SpentAPISuccessResponse,
  type SpentRouteHandler,
  SpentExceptionCodes,
} from "@/types/spent";

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
