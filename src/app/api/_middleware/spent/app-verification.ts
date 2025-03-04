import { env } from "@/env";
import { SpentExceptionCodes } from "@/types/spent";
import { ForbiddenError } from "@spent-api/_lib/errors";

const AppVerificationMiddleware = (headers: Headers): Headers => {
  const clonedHeaders = new Headers(headers);
  const secretAppKey = headers.get("secret-app-key");

  if (!secretAppKey) {
    throw ForbiddenError("Unverified App", SpentExceptionCodes.UNVERIFIED_APP);
  }

  if (secretAppKey !== env.SECRET_APP_KEY) {
    throw ForbiddenError(
      "Invalid App Key",
      SpentExceptionCodes.INVALID_APP_KEY,
    );
  }

  clonedHeaders.delete("secret-app-key");
  clonedHeaders.set("app-validated", "Y");

  return clonedHeaders;
};

export default AppVerificationMiddleware;
