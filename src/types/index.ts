import { registeredApps } from "@/config";
import { NextRequest } from "next/server";
import { ZodSchema } from "zod";

// UBDev API Config types

export type RegisteredApp = (typeof registeredApps)[number];

export type ResponseTypes =
  | Record<string, any>
  | Array<any>
  | string
  | number
  | boolean;

// export type UBDevAPIConfig = Record<RegisteredApp, AppConfig> & {
//   appUrlMapping: Record<string, RegisteredApp>;
// };
export interface UBDevAPIConfig {
  appUrlMapping: Record<string, RegisteredApp>;
  configs: Record<RegisteredApp, AppConfig>;
}

export interface AppConfig {
  appBaseUrl: string;
  middlewareFn: (
    request: NextRequest,
    config: AppConfig,
    route: string,
  ) => Promise<Headers>;
  registeredRoutes: string[];
  routesWithInputValidation: string[];
  routesWithAuthProtection: string[];
  routesWithExpiredTokensAllowed: string[];
  inputValidationSchemaMapping: Record<string, ZodSchema>;
}

// export type UBDevAPIResponse<T extends ResponseTypes = any> =
//   | (UBDevErrorResponse & { success: false })
//   | (UBDevSuccessResponse<T> & { success: true });

export interface UBDevSuccessResponse<T extends ResponseTypes> {
  status: number;
  body?: T;
}

export interface UBDevErrorResponse {
  status: number;
  message: string;
  causedBy?: Error["name"];
  details?: any;
}
