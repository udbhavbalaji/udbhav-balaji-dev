import { jwtVerify, SignJWT } from "jose";
import {
  JWTExpired,
  JWSInvalid,
  JWSSignatureVerificationFailed,
} from "jose/errors";
import bcrypt from "bcryptjs";

import {
  BadRequestError,
  UnauthorizedActionError,
} from "@spent-api-lib/errors";
import { RegisteredApp, UBDevAPIConfig } from "@/types";
import {
  ItemInputType,
  ReceiptInputType,
  SpentExceptionCodes,
} from "@/types/spent";
import { InvalidRouteError } from "@api-lib/errors";
import { env } from "@/env";

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
      } else if (err instanceof JWSSignatureVerificationFailed) {
        throw UnauthorizedActionError(
          "User was created from different server. User must be deleted from the database manually.",
          SpentExceptionCodes.JWT_ERROR,
          undefined,
          err,
          err.cause,
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
    paramName?: string;
  } => {
    let appBaseUrl: keyof UBDevAPIConfig["appUrlMapping"] | undefined;
    let route: string | undefined;
    let appName: RegisteredApp | undefined;
    let paramName: string | undefined;
    let updatedPathname = pathname;

    const registeredAppUrls = Object.keys(config.appUrlMapping);

    for (const url of registeredAppUrls) {
      if (pathname.startsWith(url)) {
        appBaseUrl = url;
        route = pathname.split(url)[1] ?? "";
        appName = config.appUrlMapping[url];

        // if (!appBaseUrl || !appName) {
        //   throw InvalidRouteError("Invalid route | App not registered");
        // }

        // const queryRoutes = config.configs[appName].routesWithQueryParams ?? [];
        // if (queryRoutes.length > 0) {
        //   for (const rt of queryRoutes) {
        //     const endpoint = rt.split(":")[0]!;
        //     if (route.startsWith(endpoint)) {
        //       paramName = rt.split(":")[1];
        //       route = rt;
        //       break;
        //     }
        //   }
        // }

        break;
      }
    }

    if (!appBaseUrl || !appName) {
      throw InvalidRouteError("Invalid route | App not registered");
    }

    route ??= "";

    return { appBaseUrl, route, appName };
    // return { appBaseUrl, route, appName, paramName };
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

  receiptID: (receipt: ReceiptInputType): string => {
    let receiptId: string = "";

    receiptId += receipt.merchantName
      .split(" ")
      .map((word) => word[0]?.toUpperCase())
      .join("");

    receiptId += receipt.date.split("-").join("");
    receiptId = `${receiptId}-${receipt.items.length}`;

    return receiptId;
  },

  itemID: (item: ItemInputType, date: string, idx: number) => {
    let itemId: string = `IT${idx + 1}`;

    itemId +=
      item.description ??
      ""
        .split(" ")
        .map((word) => word[0]?.toUpperCase())
        .join("");
    itemId += date.split("-").join("");
    return itemId;
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
