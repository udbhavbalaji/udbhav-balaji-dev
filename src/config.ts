// External Imports

// Internal Imports
import type { UBDevAPIConfig } from "@/types";
import SpentMiddleware from "@/app/api/_middleware/spent";
import {
  CategorySchema,
  ExpenseDateFilterSchema,
  ExpenseRangeFilterSchema,
  LoginSchema,
  MerchantSchema,
  ReceiptSchema,
  RegisterSchema,
  SubCategorySchema,
} from "@spent-api/_lib/schema";

// NOTE: Register app names here; only apps that are registered will pass through the middleware
export const apps = ["Spent", "TrackRev"] as const;

// NOTE: API Routes Middleware config
const config: UBDevAPIConfig = {
  appUrlMapping: {
    "/api/spent": "Spent",
    "/api/track-rev": "TrackRev",
  },
  configs: {
    TrackRev: {
      registeredRoutes: [
        "/standings/constructors",
        "/standings/drivers",
        "/schedule",
      ],
      validationSchemaMapping: {},
    },
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
      middlewareFn: SpentMiddleware,
    },
  },
};

export default config;
