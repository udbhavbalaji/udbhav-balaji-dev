import { UBDevErrorResponse } from "@/types/old";
import { SpentAPIErrorResponse, SpentExceptionCodes } from "@/types/spent";
import { NextResponse } from "next/server";

export class UBDevException extends Error {
  name: string;
  message: string;
  statusCode: number;
  underlyingError?: Error;
  details?: any;

  constructor(
    message: string,
    statusCode: number,
    name?: string,
    underlyingError?: Error,
    details?: any,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name ?? "UBDevException";
    this.message = message;
    this.statusCode = statusCode;
    this.underlyingError = underlyingError;
    this.details = details;
  }

  toResponse(): NextResponse<UBDevErrorResponse> {
    const response: UBDevErrorResponse = {
      status: this.statusCode,
      message: `${this.name}: ${this.message}`,
      causedBy: this.underlyingError?.name,
      details: this.details,
    };

    return NextResponse.json({ ...response }, { status: this.statusCode });
  }
}

export class SpentException extends UBDevException {
  name: string;
  message: string;
  errorCode: SpentExceptionCodes;
  statusCode: number;
  underlyingError?: Error;
  details?: any;

  constructor(
    message: string,
    errorCode: SpentExceptionCodes,
    statusCode?: number,
    name?: string,
    underlyingError?: Error,
    details?: any,
  ) {
    super(message, statusCode ?? 400, name, underlyingError, details);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name ?? "SpentException";
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode ?? 400;
    this.underlyingError = underlyingError;
    this.details = details;
  }

  toResponse(): NextResponse<SpentAPIErrorResponse> {
    const response: SpentAPIErrorResponse = {
      status: this.statusCode,
      message: `${this.name}: ${this.message}`,
      errorCode: this.errorCode,
      causedBy: this.underlyingError?.name,
      details: this.details,
    };

    return NextResponse.json({ ...response }, { status: this.statusCode });
  }
}

export const PrismaNotFoundError = (
  message: string,
  statusCode?: number,
  underlyingError?: Error,
  details?: any,
) => {
  return new UBDevException(
    message,
    statusCode ?? 404,
    "PrismaNotFoundError",
    underlyingError,
    details,
  );
};

export const InvalidRouteError = (
  message: string,
  statusCode?: number,
  underlyingError?: Error,
  details?: any,
) => {
  return new UBDevException(
    message,
    statusCode ?? 404,
    "InvalidRouteError",
    underlyingError,
    details,
  );
};
