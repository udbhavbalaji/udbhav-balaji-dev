import { RegisteredApp, UBDevAPIConfig } from "@/types";
import { InvalidRouteError } from "@api/_lib/errors";

const extractRoute = (
  pathname: string,
  config: UBDevAPIConfig,
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

  if (!baseUrl || !route || !appName)
    throw InvalidRouteError("Invalid route | App not registered");

  return { baseUrl, route, appName };
};

export { extractRoute };
