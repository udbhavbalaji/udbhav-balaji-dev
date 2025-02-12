import { withSpentRouteErrorsHandled } from "@spent-api/_lib/middleware";
import { AddMerchantRouteHandler, DeleteMerchantRouteHandler, GetMerchantRouteHandler, UpdateMerchantRouteHandler } from "./handlers";


export const GET = withSpentRouteErrorsHandled(GetMerchantRouteHandler);

export const POST = withSpentRouteErrorsHandled(AddMerchantRouteHandler);

export const PUT = withSpentRouteErrorsHandled(UpdateMerchantRouteHandler);

export const DELETE = withSpentRouteErrorsHandled(DeleteMerchantRouteHandler);


