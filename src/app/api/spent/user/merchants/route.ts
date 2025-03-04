import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import {
  AddMerchantRouteHandler,
  DeleteMerchantRouteHandler,
  GetMerchantRouteHandler,
  UpdateMerchantRouteHandler,
} from "./handlers";

export const GET = WithSpentErrorsHandled(GetMerchantRouteHandler);

export const POST = WithSpentErrorsHandled(AddMerchantRouteHandler);

export const PUT = WithSpentErrorsHandled(UpdateMerchantRouteHandler);

export const DELETE = WithSpentErrorsHandled(DeleteMerchantRouteHandler);
