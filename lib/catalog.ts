import { categories } from "@/data/categories";
import { manufacturers } from "@/data/manufacturers";
import { productImages } from "@/data/productImages";
import { products } from "@/data/products";
import type { ProductImage } from "@/types/product";

export function getPublishedProducts() {
  return products.filter((product) => product.published);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getManufacturerBySlug(slug: string) {
  return manufacturers.find(
    (manufacturer) => manufacturer.slug === slug,
  );
}

export function getApprovedProductImages(
  productSlug: string,
): ProductImage[] {
  return productImages
    .filter(
      (image) =>
        image.productSlug === productSlug &&
        image.status === "approved",
    )
    .sort(
      (a, b) =>
        (a.sortOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.sortOrder ?? Number.MAX_SAFE_INTEGER),
    );
}

export function getProductPreviewImage(
  productSlug: string,
): ProductImage | undefined {
  const images = getApprovedProductImages(productSlug);

  return (
    images.find(
      (image) =>
        image.type === "catalog" &&
        image.isPrimary,
    ) ??
    images.find(
      (image) =>
        image.type === "catalog",
    ) ??
    images.find((image) => image.isPrimary) ??
    images[0]
  );
}
