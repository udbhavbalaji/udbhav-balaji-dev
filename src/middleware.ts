import { NextRequest, NextResponse } from "next/server";
import { extract, printHeadersToTerminal } from "./app/api/spent/_lib/utils";
import globalConfig from "./config";
import { InvalidRouteError } from "./app/api/_lib/errors";
import { SpentExceptionCodes } from "./types/spent";
import { ApiRoutesErrorHandler } from "./app/api/_lib/middleware";

export async function middleware(request: NextRequest) {
  // printHeadersToTerminal(request.headers, "orig");
  let headers: Headers = request.headers;
  // printHeadersToTerminal(headers, "clone");

  try {
    const { pathname } = request.nextUrl;

    const { appBaseUrl, route, appName } = extract.route(
      pathname,
      globalConfig,
    );

    const appConfig = globalConfig.configs[appName];

    if (appConfig && appName === "Spent") {
      headers = await appConfig.middlewareFn(request, appConfig, route);
    }
    // Middleware functionality for other apps can go here

    return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  } catch (err) {
    return ApiRoutesErrorHandler(err as Error);
  }
}

export const config = {
  matcher: "/api/spent/:path*",
};
