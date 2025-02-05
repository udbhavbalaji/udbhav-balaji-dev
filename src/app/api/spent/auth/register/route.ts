import { db } from "@/server/db";
import { ResponseTypes } from "@/types";
import {
  SpentAPISuccessResponse,
  SpentExceptionCodes,
  SpentRouteHandler,
} from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { BadRequestError } from "../../_lib/errors";
import { generate } from "../../_lib/utils";
import { withSpentRouteErrorsHandled } from "../../_lib/middleware";

const RegisterRouteHandler: SpentRouteHandler = async (
  // const RegisterRouteHandler = async <T extends ResponseTypes>(
  request: NextRequest,
) => {
  const validatedUserDetails = await request.json();

  const userCheck = await db.user.findFirst({
    where: { email: validatedUserDetails.email },
  });

  if (userCheck) {
    throw BadRequestError(
      "User already exists",
      SpentExceptionCodes.ALREADY_EXISTS,
    );
  }

  const initials = `${validatedUserDetails.firstName[0].toUpperCase()}${validatedUserDetails.lastName[0].toUpperCase()}`;

  const userId = generate.userID(initials);

  const hashedPassword = await generate.hashedPassword(
    validatedUserDetails.password,
  );

  const user = { ...validatedUserDetails, userId, password: hashedPassword };

  await db.user.create({ data: { ...user } });

  const response: SpentAPISuccessResponse<string> = {
    status: 201,
    body: "Created User",
  };

  return NextResponse.json({ ...response }, { status: 201 });
};

export const POST = withSpentRouteErrorsHandled(RegisterRouteHandler);
