import { SpentAPISuccessResponse, SpentExceptionCodes, SpentRouteHandler } from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { ForbiddenError } from "../../_lib/errors";
import { db } from "@/server/db";
import { withSpentRouteErrorsHandled } from "../../_lib/middleware";

const DeleteRouteHandler: SpentRouteHandler = async (request: NextRequest) => {
    const userId = request.headers.get('user-id');

    if (!userId) {
      throw ForbiddenError(
        "User ID not found in request headers",
        SpentExceptionCodes.FORBIDDEN,
      );
    }

  await db.user.delete({ where: { userId } });

  const response: SpentAPISuccessResponse = {
    status: 200,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const DELETE = withSpentRouteErrorsHandled(DeleteRouteHandler);
