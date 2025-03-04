import { SpentExceptionCodes, SpentRouteHandler } from "@/types/spent";
import { ApiRoutesErrorHandler } from "@/app/api/_middleware";
import { NextRequest } from "next/server";
import { user as prisma } from "@/app/api/spent/_lib/db";
import {
  ForbiddenError,
  UnauthorizedActionError,
} from "@spent-api/_lib/errors";

const WithSpentErrorsHandled = (handler: SpentRouteHandler) => {
  console.log("im coming here");
  return async (request: NextRequest) => {
    try {
      const userId = request.headers.get("user-id");

      if (request.headers.get("logout-required") === "Y" && userId !== null) {
        await prisma.logout(userId);
        throw UnauthorizedActionError(
          "User has been logged out",
          SpentExceptionCodes.USER_LOGGED_OUT,
        );
      }

      console.log(request.headers);

      if (request.headers.get("app-validated") !== "Y") {
        throw ForbiddenError(
          "App validation could not be confirmed",
          SpentExceptionCodes.APP_VALIDATION_FAILED,
        );
      }

      return await handler(request);
    } catch (err) {
      console.log(err);
      return ApiRoutesErrorHandler(err as Error);
    }
  };
};

export { WithSpentErrorsHandled };
