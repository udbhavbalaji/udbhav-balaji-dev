import { registeredApps } from "@/config";

export interface UBDevErrorResponse {
  status: number;
  message: string;
  causedBy?: Error["name"];
  details?: any;
}
type ResponseTypes =
  | Record<string, any>
  | Array<any>
  | string
  | number
  | boolean;

export interface UBDevSuccessResponse<T extends ResponseTypes> {
  status: number;
  body?: T;
}

export type UBDevAPIConfig = Record<RegisteredApp, AppConfig> & {
  appUrlMapping: Record<string, RegisteredApp>;
};
export type RegisteredApp = (typeof registeredApps)[number];

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

export declare namespace Spent {
  export * from "./spent";
}
