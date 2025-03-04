import { LoginStatus, SpentExceptionCodes } from "@/types/spent";
import { UnauthorizedActionError } from "@spent-api/_lib/errors";
import { verify } from "@spent-api/_lib/utils";
import { user as prisma } from "@/app/api/spent/_lib/db";

const AuthVerificationMiddleware = async (
  headers: Headers,
  ignoreTokenExpiry: boolean,
): Promise<Headers> => {
  const clonedHeaders = new Headers(headers);
  const token = clonedHeaders.get("authorization");

  if (!token) {
    throw UnauthorizedActionError(
      "Authorization header missing",
      SpentExceptionCodes.JWT_MISSING,
    );
  }

  const payload = await verify.JWToken(token);

  if (!payload) {
    throw UnauthorizedActionError(
      "Unable to verify authorization",
      SpentExceptionCodes.JWT_ERROR,
    );
  }

  const user = await prisma.authCheck(payload.userId);

  if (user.loggedIn === LoginStatus.LOGGED_OUT) {
    throw UnauthorizedActionError(
      "User is logged out",
      SpentExceptionCodes.USER_LOGGED_OUT,
    );
  }

  if (token !== user.lastGeneratedToken && !ignoreTokenExpiry) {
    throw UnauthorizedActionError(
      "Updated token found",
      SpentExceptionCodes.UPDATED_JWT_FOUND,
    );
  }

  if (payload.expired && !ignoreTokenExpiry) {
    clonedHeaders.set("logout-required", "Y");
  }

  clonedHeaders.set("user-id", user.userId);
  clonedHeaders.delete("authorization");

  return clonedHeaders;
};

export default AuthVerificationMiddleware;
