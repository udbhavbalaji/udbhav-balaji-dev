import { jwtVerify } from "jose";
import { JWTExpired, JWSInvalid } from "jose/errors";
import { UnauthorizedActionError } from "./errors";
import { SpentExceptionCodes } from "@/types/spent";
import { env } from "@/env";
import { RegisteredApp, UBDevAPIConfig } from "@/types/old";
import { InvalidRouteError } from "../../_lib/errors";

export const verify = {
  JWToken: async (
    token: string,
  ): Promise<{ userId: string; expired: boolean }> => {
    try {
      const secret = new TextEncoder().encode(env.JWT_SECRET);
      const { payload } = await jwtVerify<{ userId: string }>(token, secret);
      return { userId: payload.userId, expired: false };
    } catch (err) {
      if (err instanceof JWTExpired) {
        return { userId: err.payload.userId as string, expired: true };
      } else if (err instanceof JWSInvalid) {
        throw UnauthorizedActionError(
          "Authorization token is malformed/invalid/incorrect",
          SpentExceptionCodes.JWT_INVALID,
          401,
          err,
          err.stack,
        );
      } else throw err;
    }
  },
};

export const extract = {
  route: (
    pathname: string,
    config: UBDevAPIConfig,
  ): {
    appBaseUrl: keyof UBDevAPIConfig["appUrlMapping"];
    route: string;
    appName: RegisteredApp;
  } => {
    let appBaseUrl: keyof UBDevAPIConfig["appUrlMapping"] | undefined;
    let route: string | undefined;
    let appName: RegisteredApp | undefined;

    const registeredAppUrls = Object.keys(config.appUrlMapping);

    for (const url of registeredAppUrls) {
      if (pathname.startsWith(url)) {
        appBaseUrl = url;
        route = pathname.split(url)[1] ?? "";
        appName = config.appUrlMapping[url];
        break;
      }
    }

    if (!appBaseUrl || !route || !appName) {
      throw InvalidRouteError("Invalid route | App not registered");
    }

    // if (pathname.startsWith("/api/spent")) {
    //   appBaseUrl = "/api/spent";
    //   route = pathname.split("/api/spent")[1] ?? "";
    // } else {
    //   appBaseUrl = "/";
    //   route = "";
    // }

    return { appBaseUrl, route, appName };
  },
};
