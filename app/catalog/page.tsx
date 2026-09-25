import Image from "next/image";
import Link from "next/link";

import CategoryVisual from "@/components/CategoryVisual";

import {
  getCategoryBySlug,
  getManufacturerBySlug,
  getProductPreviewImage,
  getPublishedProducts,
} from "@/lib/catalog";
import { catalogDirections } from "@/data/directions";
import { manufacturers } from "@/data/manufacturers";

export default function CatalogPage() {
  const publishedProducts = getPublishedProducts();

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
            Каталог
          </p>

          <h1 className="max-w-4xl font-display text-5xl font-normal leading-[0.98] tracking-[-0.025em] md:text-7xl">
            Материалы
            <br />
            для интерьера
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-normal leading-8 text-neutral-500">
            Декоративные и отделочные материалы для жилых,
            коммерческих и общественных пространств.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid gap-4 md:grid-cols-2">
            {catalogDirections.map((direction, index) => {
              const directionProducts = publishedProducts.filter(
                (product) => product.direction === direction.slug,
              );

              return (
                <Link
                  key={direction.slug}
                  href={direction.slug === "custom-order" ? "/contacts" : "/direction/" + direction.slug}
                  className="group overflow-hidden border border-neutral-200 bg-white transition-colors duration-200 hover:border-neutral-400"
                >
                  {direction.slug !== "custom-order" && (\n                    <CategoryVisual slug={direction.slug === "stucco-decor" ? "moldings" : direction.slug === "finishing-materials" ? "baseboards" : "stone-veneer"} />\n                  )}

                  <div className="flex items-center justify-between gap-4 px-5 py-5 md:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="shrink-0 text-xs font-medium text-neutral-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2 className="truncate font-display text-xl font-normal leading-tight tracking-[-0.015em] md:text-2xl">
                        {direction.name}
                      </h2>
                    </div>

                    <span className="shrink-0 text-xs text-neutral-400">
                      {directionProducts.length}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
                Производители
              </p>

              <h2 className="font-display text-3xl font-normal leading-tight tracking-[-0.02em] md:text-5xl">
                Бренды в каталоге
              </h2>
            </div>

            <span className="hidden text-sm text-neutral-400 md:block">
              {manufacturers.length} производителей
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {manufacturers.map((manufacturer) => {
              const manufacturerProducts = publishedProducts.filter(
                (product) => product.manufacturer === manufacturer.slug,
              );

              if (manufacturerProducts.length === 0) {
                return null;
              }

              return (
                <div
                  key={manufacturer.slug}
                  className="border border-neutral-200 p-8"
                >
                  <p className="font-display text-xl font-normal tracking-tight">
                    {manufacturer.name}
                  </p>

                  <p className="mt-3 text-sm font-medium text-neutral-500">
                    {manufacturerProducts.length} товаров в стартовой
                    коллекции
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
                Избранное
              </p>

              <h2 className="text-3xl font-medium uppercase leading-tight tracking-tight md:text-5xl">
                Популярные материалы
              </h2>
            </div>

            <span className="hidden text-sm text-neutral-400 md:block">
              {publishedProducts.length} материалов
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {publishedProducts.slice(0, 8).map((product) => {
              const category = getCategoryBySlug(product.category);
              const manufacturer = getManufacturerBySlug(product.manufacturer);
              const image = getProductPreviewImage(product.slug);

              return (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                    {image && (
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 320px"
                        className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    )}
                  </div>

                  <div className="pt-5">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                      {manufacturer?.name}
                    </p>

                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                      {category?.name}
                    </p>

                    <h3 className="mt-2 text-lg font-medium uppercase tracking-tight">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-normal leading-6 text-neutral-500">
                      {product.description}
                    </p>

                    <p className="mt-4 text-sm font-medium">
                      {product.price}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
