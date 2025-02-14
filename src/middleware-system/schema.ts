import z from "zod";

export const MerchantSchema = z
  .object({
    merchantName: z.string(),
    categoryName: z.string().optional(),
    subCategoryName: z.string().optional(),
  })
  .required();

export const CategorySchema = z.object({
  categoryName: z.string(),
});

export const SubCategorySchema = z
  .object({
    subCategoryName: z.string(),
    category: z.string().optional(),
  })
  .required();
