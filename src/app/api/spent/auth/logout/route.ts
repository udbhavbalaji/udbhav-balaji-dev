import { type NextRequest, NextResponse } from "next/server";

import { SpentExceptionCodes, type SpentRouteHandler } from "@/types/spent";
import { ForbiddenError } from "@spent-api-lib/errors";
import { WithSpentErrorsHandled } from "@api/_middleware/spent";
import { user as prisma } from "@spent-api-lib/db";

const LogoutRouteHandler: SpentRouteHandler = async (request: NextRequest) => {
  const userId = request.headers.get("user-id");
  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  await prisma.logout(userId);

  const response = {
    status: 200,
    message: "Logout successful",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const PUT = WithSpentErrorsHandled(LogoutRouteHandler);
