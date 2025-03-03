import { withSpentRouteErrorsHandled } from "@spent-api/_lib/middleware";
import {
  AddSubCategoriesHandler,
  DeleteSubCategoriesHandler,
  GetSubCategoriesHandler,
  UpdateSubCategoriesHandler,
} from "./handlers";

export const GET = withSpentRouteErrorsHandled(GetSubCategoriesHandler);
export const POST = withSpentRouteErrorsHandled(AddSubCategoriesHandler);
export const PUT = withSpentRouteErrorsHandled(UpdateSubCategoriesHandler);
export const DELETE = withSpentRouteErrorsHandled(DeleteSubCategoriesHandler);
