import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { JWTExpired, JWSInvalid } from "jose/errors";
import { BadRequestError, UnauthorizedActionError } from "./errors";
import { SpentExceptionCodes } from "@/types/spent";
import { env } from "@/env";
import { RegisteredApp, UBDevAPIConfig } from "@/types";
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

  password: (plain: string, hashed: string): Promise<boolean> => {
    return bcrypt.compare(plain, hashed).catch((err) => {
      throw BadRequestError(
        "Invalid credentials",
        SpentExceptionCodes.CORRUPTED_HASHED_PASSWORD,
        undefined,
        err,
        err.message,
      );
    });
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

    return { appBaseUrl, route, appName };
  },
};

export const generate = {
  userID: (initials: string): string => {
    const userIdLength = 10;
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    let userId = "SU";

    for (let i = 2; i < userIdLength; i++) {
      const rand = Math.random();

      if (rand > 0.6) {
        userId += letters.charAt(Math.random() * letters.length);
      } else {
        userId += digits.charAt(Math.random() * digits.length);
      }
    }
    userId += initials;
    return userId;
  },

  hashedPassword: async (plainPassword: string): Promise<string> => {
    return bcrypt.hash(plainPassword, 12).then((hash) => hash);
  },

  JWToken: async (userId: string): Promise<string> => {
    const secret = new TextEncoder().encode(env.JWT_SECRET);

    return await new SignJWT({ userId })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(env.JWT_EXPIRES_IN)
      .sign(secret);
  },
};

export const printHeadersToTerminal = (
  input: Headers,
  tag?: string,
) /*: Record<string, any> */ => {
  const headerObj = Object.fromEntries(input);
  console.log(tag, headerObj);
};
