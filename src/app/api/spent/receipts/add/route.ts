// External Imports
import { NextResponse } from "next/server";
import type z from "zod";

// Internal Imports
import { WithSpentErrorsHandled } from "@/app/api/_middleware/spent";
import { generate } from "@spent-api-lib/utils";
import { ForbiddenError } from "@spent-api-lib/errors";
import { createTrx } from "@spent-api-lib/db";
import { getExpenseFromReeceipt } from "@spent-api/expenses/_lib/utils";
import type { itemSchema, ReceiptSchema } from "@spent-api-lib/schema";
import {
  type PrismaItem,
  type PrismaReceipt,
  type SpentAPISuccessResponse,
  SpentExceptionCodes,
} from "@/types/spent";

// todo: need to check if this is needed at all
export type ItemInputType = z.infer<typeof itemSchema>;
export type ReceiptInputType = z.infer<typeof ReceiptSchema>;

const AddReceiptRouteHandler = async (request: Request) => {
  const receipt: ReceiptInputType = await request.json();
  const userId = request.headers.get("user-id");

  if (!userId)
    throw ForbiddenError(
      "User ID not found in request headers",
      SpentExceptionCodes.FORBIDDEN,
    );

  const receiptId = generate.receiptID(receipt);

  const updatedReceipt: PrismaReceipt & { items: ItemInputType[] } = {
    ...receipt,
    receiptId,
    userId,
  };

  const { items, ...processedReceipt } = updatedReceipt;

  const processedItems = items.map((item, idx) => {
    const itemId = generate.itemID(item, receipt.date, idx);

    return { itemId, receiptId, ...item } as PrismaItem;
  });

  // todo: have to test this tomoorrow, test data is on other system
  const processedExpense = await getExpenseFromReeceipt(processedReceipt);

  await createTrx(processedReceipt, processedItems, processedExpense);

  const response: SpentAPISuccessResponse<string> = {
    status: 201,
    body: "Receipt Created & Expense added",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const POST = WithSpentErrorsHandled(AddReceiptRouteHandler);
