import type { ProductVariant } from "@/data/productVariants.generated";
import { productVariantsGenerated } from "@/data/productVariants.generated";

export const productVariants: ProductVariant[] = [
  ...productVariantsGenerated,
];
