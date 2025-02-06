import { NextRequest, NextResponse } from "next/server";
import { extract } from "@spent-api-lib/utils";
import globalConfig from "@/config";
import { ApiRoutesErrorHandler } from "@api-lib/middleware";
import { InvalidRouteError } from "@api-lib/errors";
import { getAllRegisteredRoutes } from "@api-lib/utils";

export async function middleware(request: NextRequest) {
  let headers: Headers = request.headers;

  try {
    const routes = getAllRegisteredRoutes(globalConfig);

    const { pathname } = request.nextUrl;

    if (!routes.includes(pathname)) throw InvalidRouteError("This url has no registered app/endpoint associated with it", 405);

    const { route, appName } = extract.route(
      pathname,
      globalConfig,
    );

    const appConfig = globalConfig.configs[appName];

    if (appConfig && appName === "Spent") {
      if (!appConfig.registeredRoutes.includes(route)) {
        throw InvalidRouteError("This route is not registered for this app", 405);
      }
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
  // I want this middleware to work for only my api routes (for now, at least)
  matcher: "/api/:path*",
};
