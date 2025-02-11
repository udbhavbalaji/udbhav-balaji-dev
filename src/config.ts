import { SpentMiddleware } from "@spent-api-lib/middleware";
import type { UBDevAPIConfig } from "@/types";
import {
  RegisterSchema,
  LoginSchema,
  ReceiptSchema,
  ExpenseDateFilterSchema,
} from "@spent-api-lib/schema";

export const registeredApps = ["Spent", "TrackRev"] as const;

const config: UBDevAPIConfig = {
  appUrlMapping: {
    "/api/spent": "Spent",
    "/api/track-rev": "TrackRev",
    // NOTE: add more when more apps are made
  },
  configs: {
    TrackRev: {
      appBaseUrl: "api/track-rev",
      bypassMiddleware: true,
      registeredRoutes: [],
      routesWithInputValidation: [],
      routesWithAuthProtection: [],
      routesWithExpiredTokensAllowed: [],
      inputValidationSchemaMapping: {},
    },
    Spent: {
      appBaseUrl: "/api/spent",
      middlewareFn: SpentMiddleware,
      registeredRoutes: [
        "/auth/register",
        "/auth/login",
        "/auth/me",
        "/auth/logout",
        "/auth/delete",
        "/receipts/add",
        "/receipts/get",
        "/expenses/filtered-by-date"
      ],
      routesWithInputValidation: [
        "/auth/register",
        "/auth/login",
        "/receipts/add",
        "/expenses/filtered-by-date"
      ],
      routesWithAuthProtection: [
        "/auth/me",
        "/auth/logout",
        "/auth/delete",
        "/receipts/add",
        "/receipts/get",
        "/expenses/filtered-by-date"
      ],
      routesWithExpiredTokensAllowed: ["/auth/logout"],
      inputValidationSchemaMapping: {
        "/auth/register": RegisterSchema,
        "/auth/login": LoginSchema,
        "/receipts/add": ReceiptSchema,
        "/expenses/filtered-by-date": ExpenseDateFilterSchema,
      },
    },
  },
  // NOTE: add configs for other APIs here
};

export default config;
