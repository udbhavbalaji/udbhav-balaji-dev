import { SpentExceptionCodes } from "@/types/spent";
import { SpentException } from "@api-lib/errors";

export const BadRequestError = (
  message: string,
  errorCode: SpentExceptionCodes,
  statusCode?: number,
  underlyingError?: Error,
  details?: any,
) => {
  return new SpentException(
    message,
    errorCode,
    statusCode ?? 400,
    "BadRequestError",
    underlyingError,
    details,
  );
};

export const ForbiddenError = (
  message: string,
  errorCode: SpentExceptionCodes,
  statusCode?: number,
  underlyingError?: Error,
  details?: any,
) => {
  return new SpentException(
    message,
    errorCode,
    statusCode ?? 403,
    "ForbiddenError",
    underlyingError,
    details,
  );
};

export const InputValidationError = (
  message: string,
  errorCode: SpentExceptionCodes,
  statusCode?: number,
  underlyingError?: Error,
  details?: any,
) => {
  return new SpentException(
    message,
    errorCode,
    statusCode ?? 422,
    "InputValidationError",
    underlyingError,
    details,
  );
};

export const UnauthorizedActionError = (
  message: string,
  errorCode: SpentExceptionCodes,
  statusCode?: number,
  underlyingError?: Error,
  details?: any,
) => {
  return new SpentException(
    message,
    errorCode,
    statusCode ?? 401,
    "UnauthorizedActionError",
    underlyingError,
    details,
  );
};

export const UnregisteredSchemaError = (
  message: string,
  errorCode: SpentExceptionCodes,
  statusCode?: number,
  underlyingError?: Error,
  details?: any,
) => {
  return new SpentException(
    message,
    errorCode,
    statusCode ?? 500,
    "UnregisteredSchemaError",
    underlyingError,
    details,
  );
};
