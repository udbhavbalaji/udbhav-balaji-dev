import { NextRequest } from "next/server";
import { appConfig } from "../config";

const SpentMiddleware = async (
  headers: Headers,
  config: appConfig,
  route: string,
): Promise<Headers> => {
  let processedHeaders = new Headers(headers);

  // 1. App Verification
  headers = appVerificationMiddleware(headers);

  // 2. Auth middleware
  const protectedRoutes = Object.keys(
    config.authProtectedRoutesWithIgnoreExpiryFlag,
  );

  for (const rt of protectedRoutes) {
    if (route.startsWith(rt)) {
      headers = await authMiddleware(
        headers,
        config.authProtectedRoutesWithIgnoreExpiryFlag[rt],
      );
      break;
    }
  }
  return headers;
};

export default SpentMiddleware;
