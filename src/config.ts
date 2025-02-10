import { SpentMiddleware } from "@spent-api-lib/middleware";
import type { AppConfig, UBDevAPIConfig } from "@/types";
import {
  RegisterSchema,
  LoginSchema,
  ReceiptSchema,
} from "@spent-api-lib/schema";
import { z, ZodSchema } from "zod";
import { NextRequest } from "next/server";

const yearSchema = z.object({ year: z.string() });

export const registeredApps = ["Spent", "TrackRev"] as const;

const config: UBDevAPIConfig = {
  appUrlMapping: {
    "/api/spent": "Spent",
    // add more when more apps are made
    "/api/track-rev": "TrackRev",
  },
  configs: {
    TrackRev: {
      appBaseUrl: "api/track-rev",
      bypassMiddleware: true,
      // middlewareFn: async (
      //   req: NextRequest,
      //   config: AppConfig,
      //   route: string,
      // ) => {
      //   return Promise.resolve(req.headers);
      // },
      registeredRoutes: [],
      // routesWithQueryParams: ["/standings/constructors/:year"],
      // actual route: "/standings/constructors/2024"
      routesWithInputValidation: [],
      routesWithAuthProtection: [],
      routesWithExpiredTokensAllowed: [],
      inputValidationSchemaMapping: {
        // "/standings/constructors": yearSchema,
      },
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
  },
  // add configs for other APIs here
};

// interface RouteConfig {
  // route: string;
//   validationSchema: ZodSchema;
//   enableAuth: boolean;
//   enableExpiredToken: boolean | null;
// }

export default config;
