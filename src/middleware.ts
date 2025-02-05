import { NextRequest, NextResponse } from "next/server";
import { extract } from "./app/api/spent/_lib/utils";
import globalConfig from "./config";
import { InvalidRouteError } from "./app/api/_lib/errors";
import { SpentExceptionCodes } from "./types/spent";

export async function middleware(request: NextRequest) {
  let headers: Headers = request.headers;

  try {
    const { pathname } = request.nextUrl;

    const { appBaseUrl, route, appName } = extract.route(
      pathname,
      globalConfig,
    );

    const appConfig = globalConfig[appName];

    if (appConfig && appName === "Spent") {
      headers = await appConfig.middlewareFn(request, appConfig, route);
    }
    // Middleware functionality for other apps can go here

    return NextResponse.next({
      request: {
        headers,
      },
    });
  } catch (err) {}
}

export const config = {
  matcher: "/api/spent/:path*",
};
