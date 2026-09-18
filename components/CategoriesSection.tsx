import Image from "next/image";
import Link from "next/link";

import { categories } from "@/data/categories";
import { productImages } from "@/data/productImages";
import { products } from "@/data/products";

export default function CategoriesSection() {
  const publishedProducts = products.filter(
    (product) => product.published,
  );

  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-neutral-500">
              Каталог
            </p>

            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
              Материалы для интерьера
            </h2>
          </div>

          <Link
            href="/catalog"
            className="hidden text-sm font-medium underline underline-offset-4 md:block"
          >
            Смотреть весь каталог
          </Link>
        </div>

        <div className="grid gap-px bg-neutral-200 md:grid-cols-2">
          {categories.map((category, index) => {
            const categoryProducts = publishedProducts.filter(
              (product) => product.category === category.slug,
            );

            const previewImage = categoryProducts
              .map(
                (product) =>
                  productImages.find(
                    (image) =>
                      image.productSlug === product.slug &&
                      image.status === "approved" &&
                      image.isPrimary,
                  ) ??
                  productImages.find(
                    (image) =>
                      image.productSlug === product.slug &&
                      image.status === "approved",
                  ),
              )
              .find(Boolean);

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group bg-white p-6 transition-colors hover:bg-neutral-50 md:p-8"
              >
                <div className="grid min-h-44 gap-6 sm:grid-cols-[9rem_1fr] sm:items-end">
                  <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                    {previewImage && (
                      <Image
                        src={previewImage.url}
                        alt={previewImage.alt}
                        fill
                        sizes="144px"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>

                  <div className="flex min-h-36 flex-col justify-between">
                    <span className="text-xs font-medium text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="text-2xl font-semibold uppercase tracking-tight">
                        {category.name}
                      </h3>

                      <p className="mt-3 text-base font-medium text-neutral-500">
                        {category.description}
                      </p>

                      <p className="mt-4 text-sm text-neutral-400">
                        {categoryProducts.length} товаров
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/catalog"
          className="mt-8 inline-block text-sm font-medium underline underline-offset-4 md:hidden"
        >
          Смотреть весь каталог
        </Link>
      </div>
    </section>
  );
}
