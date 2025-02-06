import {
  PublicSafeUser,
  SpentAPISuccessResponse,
  SpentExceptionCodes,
  SpentRouteHandler,
} from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { ForbiddenError } from "../../_lib/errors";
import { withSpentRouteErrorsHandled } from "../../_lib/middleware";
import { user as prisma } from "../../_lib/db";

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

export const GET = withSpentRouteErrorsHandled(MeRouteHandler);
