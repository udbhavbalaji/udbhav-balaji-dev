import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import {
  GetCategoriesRouteHandler,
  AddCategoriesRouteHandler,
  UpdateCategoriesRouteHandler,
  DeleteCategoriesRouteHandler,
} from "./handlers";

//@ts-ignore
export const GET = WithSpentErrorsHandled(GetCategoriesRouteHandler);

//@ts-ignore
export const POST = WithSpentErrorsHandled(AddCategoriesRouteHandler);

//@ts-ignore
export const PUT = WithSpentErrorsHandled(UpdateCategoriesRouteHandler);

//@ts-ignore
export const DELETE = WithSpentErrorsHandled(DeleteCategoriesRouteHandler);
