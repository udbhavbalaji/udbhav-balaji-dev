// External Imports
import { type NextRequest, NextResponse } from "next/server";

// Internal Imports
import { ForbiddenError } from "@spent-api/_lib/errors";
import { merchant as prisma } from "@/app/api/spent/_lib/db";
import {
  type Merchant,
  type MerchantRouteInput,
  type SpentAPISuccessResponse,
  SpentExceptionCodes,
} from "@/types/spent";

export const GetMerchantRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<Merchant[]>>> => {
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const merchants = await prisma.getAll(userId);

  const response: SpentAPISuccessResponse<Merchant[]> = {
    status: 200,
    body: merchants,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const UpdateMerchantRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const {
    merchantName,
    categoryName: category,
    subCategoryName: subCategory,
  }: MerchantRouteInput = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const merchant = await prisma.get(merchantName, userId);

  const updatedMerchant: Merchant = {
    ...merchant,
    categoryName: category,
    subCategoryName: subCategory,
  };

  await prisma.update(updatedMerchant);

  const response: SpentAPISuccessResponse<string> = {
    status: 200,
    body: "Merchant updated",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const AddMerchantRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const {
    merchantName,
    categoryName: category,
    subCategoryName: subCategory,
  }: MerchantRouteInput = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const merchant = await prisma.getSafely(merchantName, userId);

  if (merchant) throw new Error("Merchant already exists");

  const newMerchant: Merchant = {
    name: merchantName,
    userId,
    categoryName: category,
    subCategoryName: subCategory,
  };

  await prisma.add(newMerchant);

  const response: SpentAPISuccessResponse<string> = {
    status: 201,
    body: "Merchant added",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const DeleteMerchantRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  // note: could have used params (and might be more suitable here, but I don't want to create too many routes. Also, config process for routes with params hasn't been finalized yet)
  const { merchantName }: Pick<MerchantRouteInput, "merchantName"> =
    await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  await prisma.get(merchantName, userId);

  await prisma.delete(merchantName, userId);

  const response: SpentAPISuccessResponse<string> = {
    status: 200,
    body: "Merchant deleted",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};
