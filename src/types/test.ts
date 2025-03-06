import type { NextRequest } from "next/server";
import type { ZodSchema } from "zod";
import {
  ExpenseDateFilterSchema,
  ExpenseRangeFilterSchema,
  LoginSchema,
  MerchantSchema,
  ReceiptSchema,
  RegisterSchema,
  CategorySchema,
  SubCategorySchema,
} from "@spent-api/_lib/schema";

export interface TestUBDevAPIConfig {
  appUrlMapping: Record<string, TestRegisteredApp>;
  // configs: Record<TestRegisteredApp, TestAppConfig>;
  configs: Record<TestRegisteredApp, TestingConfig>;
}

interface RouteConfig {
  method: string;
  inputSchema?: ZodSchema;
  auth?: AuthTypes;
  paramName?: string;
}

interface TestingConfig {
  appBaseUrl: string;
  registeredRoutes: Record<string, RouteConfig[]>;
  middlewareFn?: (
    request: NextRequest,
    config: TestUBDevAPIConfig,
    route: string,
  ) => Promise<Headers>;
}

const testRegisteredApps = ["Spent", "TrackRev"] as const;
type TestRegisteredApp = (typeof testRegisteredApps)[number];

const authTypes = [
  "Protected",
  "ProtectedIgnoringExpiry",
  "NotProtected",
] as const;
type AuthTypes = (typeof authTypes)[number];

//@ts-ignore
const config: TestUBDevAPIConfig = {
  appUrlMapping: {
    "/api/spent": "Spent",
    "/api/track-rev": "TrackRev",
  },
  configs: {
    Spent: {
      appBaseUrl: "/api/spent",
      registeredRoutes: {
        // auth routes
        "/auth/register": [
          {
            method: "post",
            inputSchema: RegisterSchema,
            auth: "NotProtected",
          },
        ],
        "/auth/login": [
          {
            method: "PUT",
            inputSchema: LoginSchema,
            auth: "NotProtected",
          },
        ],
        "/auth/logout": [
          {
            method: "DELETE",
            auth: "Protected",
          },
        ],
        "/auth/delete": [
          {
            method: "PUT",
            auth: "ProtectedIgnoringExpiry",
          },
        ],

        // receipts routes
        "/receipts/add": [
          {
            method: "post",
            inputSchema: ReceiptSchema,
            auth: "Protected",
          },
        ],
        "/receipts/get": [
          {
            method: "GET",
            auth: "Protected",
            paramName: "receiptId",
          },
        ],

        // expenses routes
        "/expenses/filtered-by-date": [
          {
            method: "GET",
            inputSchema: ExpenseDateFilterSchema,
            auth: "Protected",
          },
        ],
        "/expenses/filtered-by-range": [
          {
            method: "GET",
            inputSchema: ExpenseRangeFilterSchema,
            auth: "Protected",
          },
        ],
        "/expenses/get": [
          {
            method: "GET",
            paramName: "expenseId",
            auth: "Protected",
          },
        ],

        // user routes
        "/user/merchants": [
          {
            method: "GET",
            auth: "Protected",
          },
          {
            method: "POST",
            inputSchema: MerchantSchema,
            auth: "Protected",
          },
          {
            method: "PUT",
            inputSchema: MerchantSchema,
            auth: "Protected",
            paramName: "merchant",
          },
          {
            method: "DELETE",
            auth: "Protected",
            paramName: "merchant",
          },
        ],
        "/user/categories": [
          {
            method: "GET",
            auth: "Protected",
          },
          {
            method: "POST",
            inputSchema: CategorySchema,
            auth: "Protected",
          },
          {
            method: "PUT",
            auth: "Protected",
            paramName: "categoryName",
          },
          {
            method: "DELETE",
            auth: "Protected",
            paramName: "categoryName",
          },
        ],
        "/user/subCategories": [
          {
            method: "GET",
            auth: "Protected",
          },
          {
            method: "POST",
            inputSchema: SubCategorySchema,
            auth: "Protected",
          },
          {
            method: "PUT",
            inputSchema: SubCategorySchema,
            auth: "Protected",
            paramName: "subCategoryName",
          },
          {
            method: "DELETE",
            auth: "Protected",
            paramName: "subCategoryName",
          },
        ],
        // need to add user settings routes next
      },
    },
    TrackRev: {
      appBaseUrl: "/api/track-rev",
      registeredRoutes: {
        "/api/track-rev/standings/constructors": [
          {
            method: "GET",
            paramName: "year",
          },
        ],
        "/api/track-rev/standings/drivers": [
          {
            method: "GET",
            paramName: "year",
          },
        ],
        "/api/track-rev/schedule": [
          {
            method: "GET",
            paramName: "year",
          },
        ],
      },
    },
  },
};

// export const middleware = async (request: NextRequest) => {
//   let headers: Headers = request.headers;
//
//   try {
//     const { pathname } = request.nextUrl;
//
//     const { baseUrl, route, appName } = extractRoute();
//   } catch (err) { }
// };
//
// const extractRoute = (
//   pathname: string,
//   config: TestUBDevAPIConfig,
// ): { baseUrl: string; route: string; appName: TestRegisteredApp } => {
//   let baseUrl: string | undefined = undefined;
//   let route: string | undefined = undefined;
//   let appName: TestRegisteredApp | undefined = undefined;
//
//   const appBaseUrls = Object.keys(config.appUrlMapping);
//
//   for (const url of appBaseUrls) {
//     if (pathname.startsWith(url)) {
//       baseUrl = url;
//       route = pathname.split(url)[1] ?? "";
//       appName = config.appUrlMapping[url];
//       break;
//     }
//   }
//
//   if (!appName || !route || !appName) throw new Error("Invalid route");
//
//   const appConfig = config.configs[appName];
//
//   const appRoutes = Object.keys(appConfig.registeredRoutes);
//
//   let routeValidated = false;
//
//   for (const rt of appRoutes) {
//     if (route.startsWith(rt)) {
//       const routeConfig = appConfig.registeredRoutes[rt];
//
//
//
//     }
//   }
// };
