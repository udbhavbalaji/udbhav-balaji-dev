import {
  LoginStatus,
  SpentExceptionCodes,
  SpentRouteHandler,
} from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";
import {
  ForbiddenError,
  InputValidationError,
  UnauthorizedActionError,
  UnregisteredSchemaError,
} from "./errors";
import { env } from "@/env";
import { isEqual } from "lodash";
import { db } from "@/server/db";
import { verify } from "./utils";
import { AppConfig } from "@/types/old";
import { ApiRoutesErrorHandler } from "../../_lib/middleware";

const appVerificationMiddleware = (headers: Headers): Headers => {
  const clonedHeaders = new Headers(headers);
  const secretAppKey = clonedHeaders.get("secret-app-key");

  if (!secretAppKey)
    throw ForbiddenError("Unverified app", SpentExceptionCodes.UNVERIFIED_APP);

  if (secretAppKey !== env.SECRET_APP_KEY)
    throw ForbiddenError(
      "Invalid app key",
      SpentExceptionCodes.INVALID_APP_KEY,
    );

  clonedHeaders.delete("secret-app-key");
  clonedHeaders.set("app-validated", "Y");

  return clonedHeaders;
};

const inputValidationMiddleware = async (
  request: NextRequest,
  schema: ZodSchema,
): Promise<void> => {
  try {
    const reqBody = await request.json();
    const validatedBody = schema.safeParse(reqBody);
    if (!isEqual(validatedBody, reqBody)) {
      throw InputValidationError(
        "Validated request body doesn't equal the original request body",
        SpentExceptionCodes.VALIDATED_BODY_MISMATCH,
        422,
        undefined,
        { original: reqBody, validated: validatedBody },
      );
    }
  } catch (err) {
    if (err instanceof ZodError) {
      throw InputValidationError(
        "Request body could not be validated",
        SpentExceptionCodes.VALIDATION_ERROR,
        422,
        err,
        err.issues,
      );
    } else throw err;
  }
};

const authMiddleware = async (
  headers: Headers,
  ignoreTokenExpiry: boolean,
): Promise<Headers> => {
  const clonedHeaders = new Headers(headers);
  const token = clonedHeaders.get("authorization");

  if (!token)
    throw UnauthorizedActionError(
      "Authorization header missing",
      SpentExceptionCodes.JWT_MISSING,
    );

  const payload = await verify.JWToken(token);

  if (!payload) {
    throw UnauthorizedActionError(
      "Unable to verify authorization",
      SpentExceptionCodes.JWT_ERROR,
      401,
    );
  }

  const user = await db.user.authCheck(payload.userId);

  if (user.loggedIn === LoginStatus.LOGGED_OUT) {
    throw UnauthorizedActionError(
      "User is logged out",
      SpentExceptionCodes.USER_LOGGED_OUT,
    );
  }

  if (token !== user.lastGeneratedToken && !ignoreTokenExpiry) {
    throw UnauthorizedActionError(
      "Updated token found",
      SpentExceptionCodes.UPDATED_JWT_FOUND,
    );
  }

  if (payload.expired) {
    clonedHeaders.set("logout-required", "Y");
  }

  clonedHeaders.set("user-id", user.userId);
  clonedHeaders.delete("authorization");

  return clonedHeaders;
};

export const withSpentRouteErrorsHandled =
  (
    handler: SpentRouteHandler,
  ): ((
    request: NextRequest,
    ctx?: Record<string, any>,
  ) => Promise<NextResponse>) =>
  async (
    request: NextRequest,
    ctx?: Record<string, any>,
  ): Promise<NextResponse> => {
    try {
      const userId = request.headers.get("user-id");

      if (request.headers.get("logout-required") === "Y" && userId !== null) {
        await db.user.logout(userId);
        throw UnauthorizedActionError(
          "User has been logged out",
          SpentExceptionCodes.USER_LOGGED_OUT,
        );
      }

      if (request.headers.get("app-validated") === "Y" || userId === null) {
        throw ForbiddenError(
          "App validation could not be confirmed",
          SpentExceptionCodes.APP_VALIDATION_FAILED,
        );
      }

      return await handler(request, ctx ?? {});
    } catch (err) {
      return ApiRoutesErrorHandler(err as Error);
    }
  };

export const SpentMiddleware = async (
  request: NextRequest,
  config: AppConfig,
  route: string,
): Promise<Headers> => {
  let headers: Headers = request.headers;

  // 1. App Verification middleware
  headers = appVerificationMiddleware(headers);

  // 2. Input Validation middleware (if required)
  if (config.routesWithInputValidation.includes(route)) {
    const schema = config.inputValidationSchemaMapping[route];

    if (schema) {
      await inputValidationMiddleware(request, schema);
    } else {
      throw UnregisteredSchemaError(
        "Route expecting schema not found/registered",
        SpentExceptionCodes.UNREGISTERED_SCHEMA,
        500,
        undefined,
        { route },
      );
    }
  }

  // 3. Auth middleware (if required)
  if (config.routesWithAuthProtection.includes(route)) {
    let ignoreTokenExpiry = false;
    if (config.routesWithExpiredTokensAllowed.includes(route)) {
      ignoreTokenExpiry = true;
    }

    headers = await authMiddleware(headers, ignoreTokenExpiry);
  }

  return headers;
};
