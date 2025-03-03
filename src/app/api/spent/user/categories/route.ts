import { withSpentRouteErrorsHandled } from "@spent-api/_lib/middleware";
import { GetCategoriesRouteHandler, AddCategoriesRouteHandler, UpdateCategoriesRouteHandler, DeleteCategoriesRouteHandler } from "./handlers";

//@ts-ignore
export const GET = withSpentRouteErrorsHandled(GetCategoriesRouteHandler);

//@ts-ignore
export const POST = withSpentRouteErrorsHandled(AddCategoriesRouteHandler);

//@ts-ignore
export const UPDATE = withSpentRouteErrorsHandled(UpdateCategoriesRouteHandler);

//@ts-ignore
export const DELETE = withSpentRouteErrorsHandled(DeleteCategoriesRouteHandler);


