import { SpentAPIErrorResponse } from "@/types/spent";
import { SpentException, UBDevException } from "./errors";
import { UBDevErrorResponse } from "@/types";
import { NextResponse } from "next/server";

export const ApiRoutesErrorHandler = (
  err: Error,
): NextResponse<UBDevErrorResponse> | NextResponse<SpentAPIErrorResponse> => {
  let response:
    | NextResponse<UBDevErrorResponse>
    | NextResponse<SpentAPIErrorResponse>;
  if (err instanceof SpentException) {
    response = err.toResponse();
  } else if (err instanceof UBDevException) {
    response = err.toResponse();
  } else {
    response = new UBDevException(
      `Something went wrong: ${err.message}`,
      500,
      undefined,
      err,
      err.stack,
    ).toResponse();
  }

  return response;
};
