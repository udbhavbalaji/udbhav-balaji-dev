import { NextRequest, NextResponse } from "next/server";

import globalConfig from "@/config";
import { InputValidator, ApiRoutesErrorHandler } from "@/app/api/_middleware";
import { InvalidRouteError } from "@api/_lib/errors";
import { extractRoute } from "@/app/api/_middleware/utils";

const middleware = async (request: NextRequest) => {
  console.log("coming into middleware");
  let headers: Headers = new Headers(request.headers);
  // let headers: Headers = request.headers;
  let isRouteValid = false;

  console.log("headers", JSON.stringify(headers));

  try {
    const { pathname } = request.nextUrl;

    const { route, appName } = extractRoute(pathname, globalConfig);

    const appConfig = globalConfig.configs[appName];

    // checking to ensure that the route matches a registered route
    const registeredRoutes = appConfig.registeredRoutes;

    for (const rt of registeredRoutes) {
      console.log("route", route);
      console.log("rt", rt);
      if (route.startsWith(rt)) {
        isRouteValid = true;
        break;
      }
    }

    if (!isRouteValid) {
      throw InvalidRouteError("This route is not registered for this app", 405);
    }

    // Routing the request through the registered middleware (if any)
    if (appConfig.middlewareFn) {
      headers = await appConfig.middlewareFn(request, appConfig, route);
    }

    // Input Validation
    const validationRoutes = appConfig.validationSchemaMapping ?? {};

    for (const rt of Object.keys(validationRoutes)) {
      if (route.startsWith(rt)) {
        await InputValidator(request, validationRoutes[rt]!);
        break;
      }
    }

    // move on to route handler with modified (or original if no middleware registered)
    console.log("headers", headers);

    return NextResponse.next({
      request: {
        headers: headers,
      },
    });
  } catch (err) {
    return ApiRoutesErrorHandler(err as Error);
  }
};

export default middleware;

export const config = {
  // Only route API requests through the middleware
  matcher: "/api/:path*",
};
