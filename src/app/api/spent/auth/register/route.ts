import type {
  CreatePrismaUser,
  RegisterRouteInput,
  SpentAPISuccessResponse,
  SpentRouteHandler,
} from "@/types/spent";
import { SpentExceptionCodes } from "@/types/spent";
import { type NextRequest, NextResponse } from "next/server";
import { BadRequestError } from "@spent-api-lib/errors";
import { generate } from "@spent-api-lib/utils";
import { WithSpentErrorsHandled } from "@api/_middleware/spent";
import { user as prisma, createUserTrx } from "@spent-api-lib/db";

const RegisterRouteHandler: SpentRouteHandler = async (
  request: NextRequest,
) => {
  const validatedUserDetails: RegisterRouteInput = await request.json();

  const userCheck = await prisma.registerCheck(validatedUserDetails.email);

  if (userCheck) {
    throw BadRequestError(
      "User already exists",
      SpentExceptionCodes.ALREADY_EXISTS,
    );
  }

  const initials = `${validatedUserDetails.firstName[0]?.toUpperCase()}${validatedUserDetails.lastName[0]?.toUpperCase()}`;

  const userId = generate.userID(initials);

  const hashedPassword = await generate.hashedPassword(
    validatedUserDetails.password,
  );

  const user: CreatePrismaUser = {
    ...validatedUserDetails,
    userId,
    password: hashedPassword,
  };

  // todo: need to add default catetgory and sub-categories in the db for the user as part of the creation process
  await createUserTrx(user);

  // LEGACY: need to keep these till the transaction approach is tested
  // await prisma.create(user);

  const response: SpentAPISuccessResponse<string> = {
    status: 201,
    body: "Created User",
  };

  return NextResponse.json({ ...response }, { status: 201 });
};

export const POST = WithSpentErrorsHandled(RegisterRouteHandler);
