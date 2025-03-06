import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import {
  GetCategoriesRouteHandler,
  AddCategoriesRouteHandler,
  UpdateCategoriesRouteHandler,
  DeleteCategoriesRouteHandler,
} from "./handlers";

export const GET = WithSpentErrorsHandled(GetCategoriesRouteHandler);

export const POST = WithSpentErrorsHandled(AddCategoriesRouteHandler);

export const PUT = WithSpentErrorsHandled(UpdateCategoriesRouteHandler);

export const DELETE = WithSpentErrorsHandled(DeleteCategoriesRouteHandler);
