import { NextRequest } from "next/server";

import AppVerificationMiddleware from "@/app/api/_middleware/spent/app-verification";
import AuthMiddleware from "@/app/api/_middleware/spent/auth-verification";
import { AppConfig } from "@/types";

export * from "./error-wrapper";

const SpentMiddleware = async (
  request: NextRequest,
  config: AppConfig,
  route: string,
): Promise<Headers> => {
  let headers = request.headers;

  // 1. App Verification
  headers = AppVerificationMiddleware(headers);

  // 2. Auth middleware
  const protectedRoutes = config.authProtectedRoutesWithIgnoreExpiryFlag!;

  for (const rt of Object.keys(protectedRoutes)) {
    if (route.startsWith(rt)) {
      headers = await AuthMiddleware(headers, protectedRoutes[rt] ?? false);
      break;
    }
  }
  return headers;
};

export default SpentMiddleware;
