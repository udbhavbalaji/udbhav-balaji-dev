import config, { RegisteredApp } from "./config";
import { inputValidationMiddleware } from "@/app/api/spent/_lib/middleware";
import { ApiRoutesErrorHandler } from "@api/_lib/middleware";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  let headers: Headers = request.headers;
  let isRouteValid = false;
  try {
    // extract the app and route from the pathname
    const { pathname } = request.nextUrl;

    const { baseUrl, route, appName } = extractRoute(pathname);

    const appConfig = config.configs[appName];

    const registeredRoutes = appConfig.registeredRoutes;

    for (const rt of registeredRoutes) {
      if (route.startsWith(rt)) {
        isRouteValid = true;
        break;
      }
    }

    if (!isRouteValid) {
      return NextResponse.next();
    }

    if (appConfig.middlewareFn) {
      headers = await appConfig.middlewareFn(headers, appConfig, route);
    }

    //
    // based on the app, check if the route has been registered
    // -> if registered and middlewareFn exists, then request is routed through the defined middleware,
    // -> otherwise request is routed directly to route handler
    //
    //

    const validationRoutes = appConfig.validationSchemaMapping ?? {};

    for (const rt of Object.keys(validationRoutes)) {
      if (route.startsWith(rt)) {
        await inputValidationMiddleware(request, validationRoutes[rt]!);
        break;
      }
    }
    //
    // do input validation
    //

    return NextResponse.next({
      request: {
        headers,
      },
    });
  } catch (err) {
    ApiRoutesErrorHandler(err as Error);
  }
}

const extractRoute = (
  pathname: string,
): { baseUrl: string; route: string; appName: RegisteredApp } => {
  let baseUrl: string | undefined = undefined;
  let route: string | undefined = undefined;
  let appName: RegisteredApp | undefined = undefined;

  const appUrls = Object.keys(config.appUrlMapping);

  for (const url of appUrls) {
    if (pathname.startsWith(url)) {
      baseUrl = url;
      route = pathname.split(url)[1] ?? "";
      appName = config.appUrlMapping[url];
      break;
    }
  }

  if (!baseUrl || !route || !appName) throw new Error("Invalid route");

  return { baseUrl, route, appName };
};
