import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodSchema } from "zod";

import { InputValidationError, SpentException, UBDevException } from "@api-lib/errors";
import { SpentAPIErrorResponse } from "@/types/spent";
import { UBDevErrorResponse } from "@/types";

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

const InputValidator = async (
  request: NextRequest,
  schema: ZodSchema,
): Promise<void> => {
  try {
    const reqBody = await request.json();
    schema.parse(reqBody);

    return;
  } catch (err) {
    if (err instanceof ZodError) {
      console.log("coming in correctly");
      throw InputValidationError(
        "Request body could not be validated",
        422,
        err,
        err.issues,
      );
    } else if (err instanceof SyntaxError) {
      throw InputValidationError("Invalid JSON found in request body", 422, err, err.message);
    } else throw err;
  }
};
