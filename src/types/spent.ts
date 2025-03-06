import type { NextRequest, NextResponse } from "next/server";
import type { z, ZodSchema } from "zod";

import type {
  UBDevErrorResponse,
  UBDevSuccessResponse,
  ResponseTypes,
} from "@/types";
import type { User, Receipt, Item, Expense } from "@/server/db";

import type {
  RegisterSchema,
  LoginSchema,
  ReceiptSchema,
  ExpenseDateFilterSchema,
  ExpenseRangeFilterSchema,
  MerchantSchema,
  CategorySchema,
  SubCategorySchema,
} from "@spent-api-lib/schema";

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
  AUTH_FAILED = 2015,
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
export type PrismaExpense = Omit<Expense, "id">;
export type { Merchant, Category, SubCategory } from "@prisma/client";

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

// export interface SpentAPISuccessResponse<T extends ResponseTypes = never>
//   extends UBDevSuccessResponse<T> { }
//

export type SpentAPISuccessResponse<T extends ResponseTypes> =
  UBDevSuccessResponse<T>;

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

// Error type declarations

export type ItemInputType = Omit<PrismaItem, "itemId" | "receiptId">;

export type ReceiptInputType = Omit<PrismaReceipt, "userId" | "receiptId"> & {
  items: ItemInputType[];
};

export const timeRanges = ["7d", "14d", "30d", "3m", "6m", "1y"] as const;

export type TimeRange = (typeof timeRanges)[number];

// Inferred Zod types

export type RegisterRouteInput = z.infer<typeof RegisterSchema>;
export type LoginRouteInput = z.infer<typeof LoginSchema>;
export type ReceiptRouteInput = z.infer<typeof ReceiptSchema>;
export type ExpenseDateRouteInput = z.infer<typeof ExpenseDateFilterSchema>;
export type ExpenseRangeRouteInput = z.infer<typeof ExpenseRangeFilterSchema>;
export type MerchantRouteInput = z.infer<typeof MerchantSchema>;
export type CategroryRouteInput = z.infer<typeof CategorySchema>;
export type SubCategoryRouteInput = z.infer<typeof SubCategorySchema>;
