import { type NextRequest, NextResponse } from "next/server";

import type { SpentAPISuccessResponse, SpentRouteHandler } from "@/types/spent";
import { SpentExceptionCodes } from "@/types/spent";
import { ForbiddenError } from "@/app/api/spent/_lib/errors";
import { user as prisma } from "@/app/api/spent/_lib/db";
import { WithSpentErrorsHandled } from "@api/_middleware/spent";

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

export const DELETE = WithSpentErrorsHandled(DeleteRouteHandler);
