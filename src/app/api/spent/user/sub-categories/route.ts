import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import {
  AddSubCategoriesHandler,
  DeleteSubCategoriesHandler,
  GetSubCategoriesHandler,
  UpdateSubCategoriesHandler,
} from "./handlers";

export const GET = WithSpentErrorsHandled(GetSubCategoriesHandler);
export const POST = WithSpentErrorsHandled(AddSubCategoriesHandler);
export const PUT = WithSpentErrorsHandled(UpdateSubCategoriesHandler);
export const DELETE = WithSpentErrorsHandled(DeleteSubCategoriesHandler);
