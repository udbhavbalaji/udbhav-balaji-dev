import { SpentMiddleware } from "./app/api/spent/_lib/middleware";
import { UBDevAPIConfig } from "./types/old";
import {
  RegisterSchema,
  LoginSchema,
  ReceiptSchema,
} from "@/app/api/spent/_lib/schema";

export const registeredApps = ["Spent"] as const;

const config: UBDevAPIConfig = {
  appUrlMapping: {
    "/api/spent": "Spent",
    // add more when more apps are made
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
    ],
    routesWithInputValidation: [
      "/auth/register",
      "/auth/login",
      "/receipts/add",
    ],
    routesWithAuthProtection: [
      "/auth/me",
      "/auth/logout",
      "/auth/delete",
      "/receipts/add",
      "/receipts/get",
    ],
    routesWithExpiredTokensAllowed: ["/auth/logout"],
    inputValidationSchemaMapping: {
      "/auth/register": RegisterSchema,
      "/auth/login": LoginSchema,
      "/receipts/add": ReceiptSchema,
    },
  },

  // more apps' configs can be added here to be registered in the middleware
};

export default config;
