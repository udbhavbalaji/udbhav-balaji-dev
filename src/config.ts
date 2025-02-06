import { SpentMiddleware } from "@spent-api-lib/middleware";
import type { UBDevAPIConfig } from "@/types";
import {
  RegisterSchema,
  LoginSchema,
  ReceiptSchema,
} from "@spent-api-lib/schema";
import { ZodSchema } from "zod";

export const registeredApps = ["Spent"] as const;

const config: UBDevAPIConfig = {
  appUrlMapping: {
    "/api/spent": "Spent",
    // add more when more apps are made
  },
  configs: {
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
  },
  // add configs for other APIs here
};

interface RouteConfig {
  route: string;
  validationSchema: ZodSchema;
  enableAuth: boolean;
  enableExpiredToken: boolean | null;
}

export default config;
