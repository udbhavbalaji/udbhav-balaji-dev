import { db } from "@/server/db";
import { LoginStatus, SpentExceptionCodes, SpentRouteHandler } from "@/types/spent";
import { NextRequest, NextResponse } from "next/server";
import { generate, verify } from "../../_lib/utils";
import { BadRequestError, ForbiddenError } from "../../_lib/errors";
import { withSpentRouteErrorsHandled } from "../../_lib/middleware";

const LoginRouteHandler: SpentRouteHandler = async (request: NextRequest) => {
    const { email, password } = await request.json();

    const user = await db.user.loginCheck(email);
    
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

  await db.user.login(user.userId, token);

  const response = {
    status: 200,
    message: "Login successful",
    data: { token },
  };

  return NextResponse.json({ ...response }, { status: response.status });

};

export const PUT = withSpentRouteErrorsHandled(LoginRouteHandler);
