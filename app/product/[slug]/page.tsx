import Link from "next/link";
import { notFound } from "next/navigation";

import ProductOptions from "@/components/ProductOptions";
import RequestForm from "@/components/RequestForm";

import { productImages } from "@/data/productImages";
import { products } from "@/data/products";
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

  const product = products.find(
    (item) =>
      item.slug === slug &&
      item.published,
  );

  if (!product) {
    notFound();
  }

  const variants = productVariants.filter(
    (variant) =>
      variant.productSlug === product.slug &&
      variant.published,
  );

  const images = productImages.filter(
    (image) =>
      image.productSlug === product.slug &&
      image.status === "approved",
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
        <Link
          href="/"
          className="transition hover:text-neutral-900"
        >
          Главная
        </Link>

        <span>/</span>

        <span className="text-neutral-900">
          {product.name}
        </span>
      </div>

      {/* Product */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery + variants */}
        <ProductOptions
          productImages={images}
          productName={product.name}
          variants={variants}
        />

        {/* Product information */}
        <div className="space-y-8">
          <div>
            <div className="mb-3 text-sm text-neutral-500">
              {product.manufacturer}
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
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

          {/* Request form */}
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