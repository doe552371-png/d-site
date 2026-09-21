import Link from "next/link";
import { notFound } from "next/navigation";

import ProductOptions from "@/components/ProductOptions";
import RequestForm from "@/components/RequestForm";

import {
  getCategoryBySlug,
  getManufacturerBySlug,
  getApprovedProductImages,
  getPublishedProducts,
} from "@/lib/catalog";
import { productVariants } from "@/data/productVariants";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = getPublishedProducts().find(
    (item) => item.slug === slug,
  );

  if (!product) {
    notFound();
  }

  const variants = productVariants.filter(
    (variant) =>
      variant.productSlug === product.slug &&
      variant.published,
  );

  const images = getApprovedProductImages(product.slug);
  const manufacturer = getManufacturerBySlug(
    product.manufacturer,
  );
  const category = getCategoryBySlug(product.category);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <Link
          href="/"
          className="transition hover:text-neutral-900"
        >
          Главная
        </Link>

        <span>/</span>

        {category && (
          <>
            <Link
              href={`/category/${category.slug}`}
              className="transition hover:text-neutral-900"
            >
              {category.name}
            </Link>

            <span>/</span>
          </>
        )}

        <span className="text-neutral-900">
          {product.name}
        </span>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductOptions
          productImages={images}
          productName={product.name}
          variants={variants}
        />

        <div className="space-y-8">
          <div>
            <div className="mb-3 text-sm uppercase tracking-[0.08em] text-neutral-500">
              {manufacturer?.name ?? product.manufacturer}
            </div>

            <h1 className="text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-3 text-sm text-neutral-500">
              Артикул: {product.sku}
            </div>
          </div>

          {product.description && (
            <div className="leading-7 text-neutral-700">
              {product.description}
            </div>
          )}

          <div className="border-t border-neutral-200 pt-8">
            <RequestForm
              productName={product.name}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
