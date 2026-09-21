import type { ProductImage } from "@/types/product";
import { productImagesGenerated } from "@/data/productImages.generated";

export const productImages: ProductImage[] = [
  ...productImagesGenerated,
];
