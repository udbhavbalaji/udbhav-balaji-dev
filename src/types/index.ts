import { NextRequest } from "next/server";
import { ZodSchema } from "zod";

import type { UBDevException } from "@api-lib/errors";
import { registeredApps } from "@/config";

// UBDev API Config types

export type RegisteredApp = (typeof registeredApps)[number];

export type ResponseTypes =
  | Record<string, any>
  | Array<any>
  | string
  | number
  | boolean;

export interface UBDevAPIConfig {
  appUrlMapping: Record<string, RegisteredApp>;
  configs: Record<RegisteredApp, AppConfig>;
}

export interface AppConfig {
  // appBaseUrl: string;
  appBaseUrl: keyof UBDevAPIConfig["appUrlMapping"];
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

// UBDev Error type declarations

export type UBDevExceptionInvocator = (message: string, statusCode: number, name?: string, causeBy?: Error, details?: any) => UBDevException;

