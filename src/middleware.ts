// import { NextRequest, NextResponse } from "next/server";
// import { extract } from "@spent-api-lib/utils";
// import globalConfig from "@/config";
// import { ApiRoutesErrorHandler } from "@api-lib/middleware";
// import { InvalidRouteError } from "@api-lib/errors";
// import { getAllRegisteredRoutes } from "@api-lib/utils";
//
// export const meddlewareActual = async (request: NextRequest) => {
//   let headers: Headers = request.headers;
//
//   try {
//     const { pathname } = request.nextUrl;
//
//     // warn: skipping for now (must come back to it danger)
//     //
//     // const routes = getAllRegisteredRoutes(globalConfig);
//
//     const { route, appName } = extract.route(pathname, globalConfig);
//   } catch (err) { }
// };
//
// export async function middleware(request: NextRequest) {
//   let headers: Headers = request.headers;
//
//   try {
//     const { pathname } = request.nextUrl;
//
//     if (pathname === "/api/trpc/trackRev/constructorStandings") {
//       return NextResponse.next();
//     }
//
//     const routes = getAllRegisteredRoutes(globalConfig);
//
//     console.log("pathname", pathname);
//     console.log("routes", routes);
//
//     // if (!routes.includes(pathname)) {
//     //   console.log("why am i coming here?");
//     //   throw InvalidRouteError(
//     //     "This url has no registered app/endpoint associated with it",
//     //     405,
//     //   );
//     // }
//
//     const { route, appName } = extract.route(pathname, globalConfig);
//
//     const appConfig = globalConfig.configs[appName];
//
//     if (appConfig && appConfig.bypassMiddleware) {
//       return NextResponse.next();
//     }
//
//     if (!routes.includes(pathname)) {
//       console.log("why am i coming here?");
//       throw InvalidRouteError(
//         "This url has no registered app/endpoint associated with it",
//         405,
//       );
//     }
//
//     if (appConfig && appName === "Spent" && appConfig.middlewareFn) {
//       if (!appConfig.registeredRoutes.includes(route)) {
//         throw InvalidRouteError(
//           "This route is not registered for this app",
//           405,
//         );
//       }
//       headers = await appConfig.middlewareFn(request, appConfig, route);
//     }
//     // Middleware functionality for other apps can go here
//
//     console.log("leaving middleware successfully");
//
//     return NextResponse.next({
//       request: {
//         headers: headers,
//       },
//     });
//   } catch (err) {
//     return ApiRoutesErrorHandler(err as Error);
//   }
// }
//
// export const config = {
//   // I want this middleware to work for only my api routes (for now, at least)
//   matcher: "/api/:path*",
// };
//
//

import { NextRequest, NextResponse } from "next/server";
import globalConfig from "@/config";
import { RegisteredApp } from "./types";
import { inputValidationMiddleware } from "@spent-api/_lib/middleware";
import { ApiRoutesErrorHandler } from "@api/_lib/middleware";
import { InvalidRouteError } from "@api/_lib/errors";

const middleware = async (request: NextRequest) => {
  console.log("coming into middleware");
  let headers: Headers = new Headers(request.headers);
  // let headers: Headers = request.headers;
  let isRouteValid = false;

  console.log("headers", JSON.stringify(headers));

  try {
    const { pathname } = request.nextUrl;

    const { baseUrl, route, appName } = extractRoute(pathname);

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

    // if (!isRouteValid) throw new Error("Invalid Route");
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
        await inputValidationMiddleware(request, validationRoutes[rt]!);
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

const extractRoute = (
  pathname: string,
): { baseUrl: string; route: string; appName: RegisteredApp } => {
  let baseUrl: string | undefined = undefined;
  let route: string | undefined = undefined;
  let appName: RegisteredApp | undefined = undefined;

  const appUrls = Object.keys(globalConfig.appUrlMapping);

  for (const url of appUrls) {
    if (pathname.startsWith(url)) {
      baseUrl = url;
      route = pathname.split(url)[1] ?? "";
      appName = globalConfig.appUrlMapping[url];
      break;
    }
  }

  if (!baseUrl || !route || !appName)
    throw InvalidRouteError("Invalid route | App not registered");

  return { baseUrl, route, appName };
};

export default middleware;

export const config = {
  // Only route API requests through the middleware
  matcher: "/api/:path*",
};
