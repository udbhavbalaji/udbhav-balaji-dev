import type { User, Receipt, Item } from "@/server/db";
import type { UBDevErrorResponse, UBDevSuccessResponse } from ".";
import type { ResponseTypes } from "./index";
import type { NextRequest, NextResponse } from "next/server";
import type { ZodSchema } from "zod";

// Enum declarations

export enum LoginStatus {
  LOGGED_IN = "LOGGED_IN",
  LOGGED_OUT = "LOGGED_OUT",
}

export enum SpentExceptionCodes {
  ALREADY_EXISTS = 1001,
  NOT_FOUND = 1002,
  BAD_REQUEST = 2001,
  VALIDATION_ERROR = 2002,
  FORBIDDEN = 2003,
  UNVERIFIED_APP = 2004,
  INVALID_APP_KEY = 2005,
  INCORRECT_PASSWORD = 2006,
  USER_ALREADY_LOGGED_IN = 2007,
  INVALID_ROUTE = 2008,
  JWT_MISSING = 2009,
  JWT_INVALID = 2010,
  UPDATED_JWT_FOUND = 2011,
  VALIDATED_BODY_MISMATCH = 2012,
  SEARCH_PARAMS_MISSING = 2013,
  UNREGISTERED_SCHEMA = 2014,
  USER_LOGGED_OUT = 3001,
  INTERNAL_SERVER_ERROR = 4001,
  CORRUPTED_HASHED_PASSWORD = 4002,
  APP_VALIDATION_FAILED = 4003,
  JWT_ERROR = 4004,
}

// Prisma type declarations

export type PrismaUser = Omit<User, "id">;
export type PrismaReceipt = Omit<Receipt, "id">;
export type PrismaItem = Omit<Item, "id">;

export type CreatePrismaUser = Omit<
  PrismaUser,
  "lastGeneratedToken" | "loggedIn"
>;

export type UserFromAuthCheck = Pick<
  PrismaUser,
  "userId" | "loggedIn" | "lastGeneratedToken"
>;
export type UserFromLoginCheck = Pick<
  PrismaUser,
  "userId" | "password" | "loggedIn" | "lastGeneratedToken"
>;
export type PublicSafeUser = Omit<
  PrismaUser,
  "password" | "lastGeneratedToken"
>;

// Spent API Response type declarations

export interface SpentAPISuccessResponse<T extends ResponseTypes = never>
  extends UBDevSuccessResponse<T> {}

export interface SpentAPIErrorResponse extends UBDevErrorResponse {
  errorCode: SpentExceptionCodes;
}

// Middleware type declarations

export type AppVerificationMiddleware = (headers: Headers) => Headers;
export type InputValidationMiddleware = (
  request: NextRequest,
  schema: ZodSchema,
) => Promise<void>;
export type AuthMiddleware = (
  headers: Headers,
  ignoreTokenExpiry: boolean,
) => Promise<Headers>;

export type SpentMiddleware =
  | AppVerificationMiddleware
  | InputValidationMiddleware
  | AuthMiddleware;

// Route Handler type declarations

export type SpentRouteHandler = (
  request: NextRequest,
) => Promise<NextResponse<SpentAPISuccessResponse<ResponseTypes>>>;

export type SpentErrorWrapper = (
  handler: SpentRouteHandler,
) => SpentRouteHandler;
