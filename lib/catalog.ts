import { categories } from "@/data/categories";
import { manufacturers } from "@/data/manufacturers";
import { productImages } from "@/data/productImages";
import { products } from "@/data/products";
import type { ProductImage } from "@/types/product";

export function getPublishedProducts() {
  return products.filter((product) => product.published);
}

export function searchPublishedProducts(query: string) {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return getPublishedProducts();
  }

  return getPublishedProducts().filter((product) => {
    const category = getCategoryBySlug(product.category)?.name ?? "";
    const manufacturer = getManufacturerBySlug(product.manufacturer)?.name ?? "";

    return [
      product.name,
      product.sku,
      product.slug,
      product.description,
      product.collection,
      product.dimensions,
      product.color,
      category,
      manufacturer,
    ]
      .filter(Boolean)
      .some((value) =>
        String(value).toLocaleLowerCase().includes(normalizedQuery),
      );
  });
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
