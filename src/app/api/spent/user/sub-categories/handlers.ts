import {
  SpentAPISuccessResponse,
  SpentExceptionCodes,
  SubCategory,
} from "@/types/spent";
import { ForbiddenError } from "@spent-api/_lib/errors";
import { NextRequest, NextResponse } from "next/server";
import { subCategory as prisma } from "@/app/api/spent/_lib/db";

export const GetSubCategoriesHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<SubCategory[]>>> => {
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const subCategories = await prisma.getAll(userId);

  const response: SpentAPISuccessResponse<SubCategory[]> = {
    status: 200,
    body: subCategories,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const AddSubCategoriesHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const { subCategoryName, category } = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const subCategory = await prisma.getSafely(subCategoryName, userId);

  if (subCategory) throw new Error("Category aleady exists");

  const newSubCategory: SubCategory = {
    name: subCategoryName,
    categoryName: category,
    userId,
  };

  await prisma.add(newSubCategory);

  const response: SpentAPISuccessResponse<string> = {
    status: 201,
    body: "Sub-category added",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const UpdateSubCategoriesHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const { subCategoryName, category } = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  await prisma.get(subCategoryName, userId);

  const updatedSubCategory: SubCategory = {
    name: subCategoryName,
    categoryName: category,
    userId,
  };

  await prisma.update(updatedSubCategory);

  const response: SpentAPISuccessResponse<string> = {
    status: 200,
    body: "Sub-category updated",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const DeleteSubCategoriesHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const { subCategoryName } = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  await prisma.get(subCategoryName, userId);

  await prisma.delete(subCategoryName, userId);

  const response: SpentAPISuccessResponse<string> = {
    status: 200,
    body: "Sub-category deleted",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};
