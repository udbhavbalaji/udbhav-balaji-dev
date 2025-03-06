// External Imports
import { type NextRequest, NextResponse } from "next/server";

// Internal Imports
import { ForbiddenError } from "@spent-api/_lib/errors";
import { category as prisma } from "@/app/api/spent/_lib/db";
import {
  type Category,
  type CategroryRouteInput,
  type SpentAPISuccessResponse,
  SpentExceptionCodes,
  type SpentRouteHandler,
} from "@/types/spent";

export const GetCategoriesRouteHandler: SpentRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<Category[]>>> => {
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const categories = await prisma.getAll(userId);

  const response: SpentAPISuccessResponse<Category[]> = {
    status: 200,
    body: categories,
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const AddCategoriesRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const { categoryName }: CategroryRouteInput = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const category = await prisma.getSafely(categoryName, userId);

  if (category) throw new Error("Category aleady exists");

  const newCategory: Category = {
    name: categoryName,
    userId,
  };

  await prisma.add(newCategory);

  const response: SpentAPISuccessResponse<string> = {
    status: 201,
    body: "Category added",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const UpdateCategoriesRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const { categoryName }: CategroryRouteInput = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  await prisma.get(categoryName, userId);

  const updatedCategory: Category = {
    name: categoryName,
    userId,
  };

  // todo: check and add prisma.update
  await prisma.update(updatedCategory);

  const response: SpentAPISuccessResponse<string> = {
    status: 200,
    body: "Category updated",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

// todo: still need to implement this
export const DeleteCategoriesRouteHandler = async (
  request: NextRequest,
): Promise<NextResponse<SpentAPISuccessResponse<string>>> => {
  const userId = request.headers.get("user-id");
  const { categoryName }: CategroryRouteInput = await request.json();

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  await prisma.get(categoryName, userId);

  await prisma.delete(categoryName, userId);

  const response: SpentAPISuccessResponse<string> = {
    status: 200,
    body: "Category deleted",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};
