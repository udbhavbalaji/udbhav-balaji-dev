import {
  SpentAPISuccessResponse,
  SpentExceptionCodes,
  SpentRouteHandler,
} from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { ForbiddenError } from "../../_lib/errors";
import { withSpentRouteErrorsHandled } from "../../_lib/middleware";
import { user as prisma } from "../../_lib/db";

const DeleteRouteHandler: SpentRouteHandler = async (request: NextRequest) => {
  const userId = request.headers.get("user-id");

  if (!userId) {
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );
  }

  await prisma.delete(userId);

  const response: SpentAPISuccessResponse = {
    status: 200,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const DELETE = withSpentRouteErrorsHandled(DeleteRouteHandler);
