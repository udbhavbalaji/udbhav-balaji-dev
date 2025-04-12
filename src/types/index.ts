import type { NextRequest } from "next/server";
import type { ZodSchema } from "zod";

import type { UBDevException } from "@api-lib/errors";
import type { apps } from "@/config";

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
    request: NextRequest,
    config: AppConfig,
    route: string,
  ) => Promise<Headers>;
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
  stack: string[];
  techSkills: string[];
  descriptions: string[];
  link: string;
  resource?: {
    title: string;
    link: string;
  };
}

// Track Rev

export interface TitleContextType {
  title: string;
  updateTitle: (title: string) => void;
}

// Portfolio Types

export type NavbarItem = {
  label: string;
  href: string;
  download?: boolean;
  downloadName?: string;
};

type TextStyling = {
  text: string;
  hover: string;
};

export type UpdatedNavbarProps = {
  title: {
    label: string;
    href: string;
    // textStyling: string;
  };
  styling: {
    title: TextStyling;
    bg: string;
    item: TextStyling;
    icon: TextStyling;
  };
  // bgStyling: string;
  navItems: NavbarItem[];
  // itemTextStyling: string;
  includeSocials: boolean;
};

export type NavbarProps = {
  title: string;
  titleHref: string;
  navItems: NavbarItem[];
  includeSocials: boolean;
};
