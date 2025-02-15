// import { SpentMiddleware } from "@spent-api-lib/middleware";
// import type { UBDevAPIConfig } from "@/types";
// import {
//   RegisterSchema,
//   LoginSchema,
//   ReceiptSchema,
//   ExpenseDateFilterSchema,
// } from "@spent-api-lib/schema";
//
// export const registeredApps = ["Spent", "TrackRev"] as const;
//
// const testCOnfig: UBDevAPIConfig = {
//   appUrlMapping: {},
//   configs: {
//     TrackRev: {
//       appBaseUrl: "/api/track-rev",
//       bypassMiddleware: true,
//       registeredRoutes: [],
//     },
//     Spent: {
//       appBaseUrl: "/api/spent",
//       middlewareFn: SpentMiddleware,
//       registeredRoutes: [
//         // auth routes
//         "/auth/register",
//         "/auth/login",
//         "/auth/logout",
//         "/auth/delete",
//         "/auth/register",
//
//         // user routes
//         "/user/settings",
//         "/user/merchants",
//         "/user/categories",
//         "/user/sub-categories",
//
//         // expenses routes
//         "/expenses/filtered-by-date",
//         "/expenses/filtered-by-range",
//       ],
//
//       inputValidationSchemas: {
//         "/auth/register": RegisterSchema,
//         "/auth/login": LoginSchema,
//         "/receipt/add": ReceiptSchema,
//         "/receipt/get":
//       }
//     },
//   },
// };
//
// const config: UBDevAPIConfig = {
//   appUrlMapping: {
//     "/api/spent": "Spent",
//     "/api/track-rev": "TrackRev",
//     // NOTE: add more when more apps are made
//   },
//   configs: {
//     TrackRev: {
//       appBaseUrl: "api/track-rev",
//       bypassMiddleware: true,
//       registeredRoutes: [],
//       routesWithInputValidation: [],
//       routesWithAuthProtection: [],
//       routesWithExpiredTokensAllowed: [],
//       inputValidationSchemaMapping: {},
//     },
//     Spent: {
//       appBaseUrl: "/api/spent",
//       middlewareFn: SpentMiddleware,
//       registeredRoutes: [
//         "/auth/register",
//         "/auth/login",
//         "/auth/me",
//         "/auth/logout",
//         "/auth/delete",
//         "/receipts/add",
//         "/receipts/get",
//         "/expenses/filtered-by-date",
//         "/expenses/filtered-by-range",
//         // warn: it seems that input validation has to be moved to outer middleware (and applied only as the last step, because the merchants route has multiple request body schemas depending on the method of the request)
//         "/user/merchants",
//       ],
//       routesWithInputValidation: [
//         "/auth/register",
//         "/auth/login",
//         "/receipts/add",
//         "/expenses/filtered-by-date",
//       ],
//       routesWithAuthProtection: [
//         "/auth/me",
//         "/auth/logout",
//         "/auth/delete",
//         "/receipts/add",
//         "/receipts/get",
//         "/expenses/filtered-by-date",
//       ],
//       routesWithExpiredTokensAllowed: ["/auth/logout"],
//       inputValidationSchemaMapping: {
//         "/auth/register": RegisterSchema,
//         "/auth/login": LoginSchema,
//         "/receipts/add": ReceiptSchema,
//         "/expenses/filtered-by-date": ExpenseDateFilterSchema,
//       },
//     },
//   },
//   // NOTE: add configs for other APIs here
// };
//
// export default config;
//
//
//
//
//

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
import { UBDevAPIConfig } from "./types";
import SpentMiddleware from "@spent-api/_lib/middleware";

export const apps = ["Spent", "TrackRev"] as const;

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
