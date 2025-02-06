import { SpentExceptionCodes, SpentRouteHandler } from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { ForbiddenError } from "../../_lib/errors";
import { withSpentRouteErrorsHandled } from "../../_lib/middleware";
import { user as prisma } from "../../_lib/db";

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

export const PUT = withSpentRouteErrorsHandled(LogoutRouteHandler);
