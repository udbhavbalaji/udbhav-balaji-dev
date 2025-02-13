import { NextRequest, NextResponse } from "next/server";
import { extract } from "@spent-api-lib/utils";
import globalConfig from "@/config";
import { ApiRoutesErrorHandler } from "@api-lib/middleware";
import { InvalidRouteError } from "@api-lib/errors";
import { getAllRegisteredRoutes } from "@api-lib/utils";

export const meddlewareActual = async (request: NextRequest) => {
  let headers: Headers = request.headers;

  try {
    const { pathname } = request.nextUrl;

    // warn: skipping for now (must come back to it danger)
    //
    // const routes = getAllRegisteredRoutes(globalConfig);

    const { route, appName } = extract.route(pathname, globalConfig);
  } catch (err) { }
};

export async function middleware(request: NextRequest) {
  let headers: Headers = request.headers;

  try {
    const { pathname } = request.nextUrl;

    if (pathname === "/api/trpc/trackRev/constructorStandings") {
      return NextResponse.next();
    }

    const routes = getAllRegisteredRoutes(globalConfig);

    console.log("pathname", pathname);
    console.log("routes", routes);

    // if (!routes.includes(pathname)) {
    //   console.log("why am i coming here?");
    //   throw InvalidRouteError(
    //     "This url has no registered app/endpoint associated with it",
    //     405,
    //   );
    // }

    const { route, appName } = extract.route(pathname, globalConfig);

    const appConfig = globalConfig.configs[appName];

    if (appConfig && appConfig.bypassMiddleware) {
      return NextResponse.next();
    }

    if (!routes.includes(pathname)) {
      console.log("why am i coming here?");
      throw InvalidRouteError(
        "This url has no registered app/endpoint associated with it",
        405,
      );
    }

    if (appConfig && appName === "Spent" && appConfig.middlewareFn) {
      if (!appConfig.registeredRoutes.includes(route)) {
        throw InvalidRouteError(
          "This route is not registered for this app",
          405,
        );
      }
      headers = await appConfig.middlewareFn(request, appConfig, route);
    }
    // Middleware functionality for other apps can go here

    console.log("leaving middleware successfully");

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
