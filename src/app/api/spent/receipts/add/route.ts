import {
  PrismaItem,
  PrismaReceipt,
  SpentAPISuccessResponse,
  SpentExceptionCodes,
} from "@/types/spent";
import { withSpentRouteErrorsHandled } from "@spent-api-lib/middleware";
import { generate } from "@spent-api-lib/utils";
import { ForbiddenError, UnauthorizedActionError } from "@spent-api-lib/errors";
import { itemSchema, ReceiptSchema } from "@spent-api-lib/schema";
import { NextResponse } from "next/server";
import { z } from "zod";
import { receipt as prisma } from "@spent-api-lib/db";

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

  await prisma.add(processedReceipt, processedItems);

  const response: SpentAPISuccessResponse<string> = {
    status: 201,
    body: "Receipt Created",
  };

  return NextResponse.json({ ...response }, { status: response.status });
};

export const POST = withSpentRouteErrorsHandled(AddReceiptRouteHandler);
