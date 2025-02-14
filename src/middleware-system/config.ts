import { ZodSchema } from "zod";
import { NextRequest } from "next/server";
import {
  ExpenseDateFilterSchema,
  ExpenseRangeFilterSchema,
  LoginSchema,
  ReceiptSchema,
  RegisterSchema,
} from "@spent-api/_lib/schema";
import { CategorySchema, MerchantSchema, SubCategorySchema } from "./schema";
import SpentMiddleware from "./spent/middleware";

const registeredApps = ["Spent"] as const;
export type RegisteredApp = (typeof registeredApps)[number];

interface Config {
  appUrlMapping: Record<string, RegisteredApp>;
  configs: Record<RegisteredApp, appConfig>;
}

export interface appConfig {
  registeredRoutes: string[];
  validationSchemaMapping?: Record<string, ZodSchema>;
  authProtectedRoutesWithIgnoreExpiryFlag?: Record<string, boolean>;
  middlewareFn?: (
    headers: Headers,
    config: appConfig,
    route: string,
  ) => Promise<Headers>;
}

const config: Config = {
  appUrlMapping: {
    "/api/spent": "Spent",
  },
  configs: {
    Spent: {
      registeredRoutes: [
        "/auth/register",
        "/auth/login",
        "/auth/logout",
        "/auth/delete",
        "/receipts/add",
        "/receipts/get",
        "/expenses/filtered-by-date",
        "/expenses/filtered-by-range",
        "/expenses/get",
        "/user/me",
        "/user/merchants",
        "/user/categories",
        "/user/sub-categories",
      ],
      middlewareFn: SpentMiddleware,
      validationSchemaMapping: {
        "/auth/register": RegisterSchema,
        "/auth/login": LoginSchema,
        "/receipts/add": ReceiptSchema,
        "/expenses/filtered-by-date": ExpenseDateFilterSchema,
        "/expenses/filtered-by-range": ExpenseRangeFilterSchema,
        // "/user/settings": SettingsSchema,
        "/user/merchants": MerchantSchema,
        "/user/categories": CategorySchema,
        "/user/eub-categories": SubCategorySchema,
      },
      authProtectedRoutesWithIgnoreExpiryFlag: {
        "/auth/logout": true,
        "/auth/delete": false,
        "/receipts/add": false,
        "/receipts/get": false,
        "/expenses/filtered-by-date": false,
        "/expenses/filtered-by-range": false,
        "/expenses/get": false,
        "/user/me": false,
        "/user/merchants": false,
        "/user/categories": false,
        "/user/sub-categories": false,
      },
    },
  },
};

export default config;
