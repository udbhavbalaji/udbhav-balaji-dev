import { NextRequest } from "next/server";
import { ZodSchema } from "zod";

import type { UBDevException } from "@api-lib/errors";
import { apps } from "@/config";

// UBDev API Config types

export type RegisteredApp = (typeof apps)[number];
// export type RegisteredApp = (typeof registeredApps)[number];

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

export interface TestUBDevAPIConfig {
  appUrlMapping: Record<string, RegisteredApp>;
  configs: Record<RegisteredApp, AppConfig>;
}

export interface TestAppConfig {
  appBaseUrl: string;
  middlewareFn?: (
    request: NextRequest,
    config: TestAppConfig,
    route: string,
  ) => Promise<Headers>;
  bypassMiddleware?: boolean;
  registeredRoutes: string[];
  routesWithInputValidation: Record<string, ZodSchema>;
  authProtectedRoutesWithExpiryFlag: Record<string, boolean>;
}

export interface AppConfig {
  registeredRoutes: string[];
  validationSchemaMapping: Record<string, ZodSchema>;
  authProtectedRoutesWithIgnoreExpiryFlag?: Record<string, boolean>;
  middlewareFn?: (
    // headers: Headers,
    request: NextRequest,
    config: AppConfig,
    route: string,
  ) => Promise<Headers>;
}

// export interface AppConfig {
//   // appBaseUrl: string;
//   appBaseUrl: keyof UBDevAPIConfig["appUrlMapping"];
//   middlewareFn?: (
//     request: NextRequest,
//     config: AppConfig,
//     route: string,
//   ) => Promise<Headers>;
//   // registeredRoutes: string[] | "*";
//   registeredRoutes: string[];
//   bypassMiddleware?: boolean;
//   routesWithInputValidation?: string[];
//   routesWithAuthProtection?: string[];
//   routesWithExpiredTokensAllowed?: string[];
//   inputValidationSchemaMapping?: Record<string, ZodSchema>;
// }

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

export type UBDevExceptionInvocator = (
  message: string,
  statusCode: number,
  name?: string,
  causeBy?: Error,
  details?: any,
) => UBDevException;

// Frontend Client Type Declarations

// Portfolio/Home

export interface ProjectItemProps {
  title: string;
  imgUrl: string;
  stack: string[];
  techSkills: string[];
  description: string;
  link: string;
}

// Track Rev

export interface TitleContextType {
  title: string;
  updateTitle: (title: string) => void;
}
