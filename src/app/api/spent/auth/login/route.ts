import { type NextRequest, NextResponse } from "next/server";

import { type SpentRouteHandler, LoginRouteInput } from "@/types/spent";
import { LoginStatus, SpentExceptionCodes } from "@/types/spent";
import { generate, verify } from "@spent-api-lib/utils";
import { BadRequestError, ForbiddenError } from "@spent-api-lib/errors";
import { WithSpentErrorsHandled } from "@api/_middleware/spent";
import { user as prisma } from "@spent-api-lib/db";

const LoginRouteHandler: SpentRouteHandler = async (request: NextRequest) => {
  const { email, password }: LoginRouteInput = await request.json();

  const user = await prisma.loginCheck(email);

  const passwordVerified = await verify.password(password, user.password);

  if (!passwordVerified) {
    throw BadRequestError(
      "Invalid credentials",
      SpentExceptionCodes.INCORRECT_PASSWORD,
    );
  }

  if (user.loggedIn === LoginStatus.LOGGED_IN) {
    throw ForbiddenError(
      "User already logged in",
      SpentExceptionCodes.USER_ALREADY_LOGGED_IN,
      403,
      undefined,
      { token: user.lastGeneratedToken },
    );
  }

  const token = await generate.JWToken(user.userId);

  await prisma.login(user.userId, token);

  const response = {
    status: 200,
    message: "Login successful",
    data: { token },
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const PUT = WithSpentErrorsHandled(LoginRouteHandler);
