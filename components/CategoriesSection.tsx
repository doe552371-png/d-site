import Link from "next/link";

import { categories } from "@/data/categories";
import CategoryVisual from "@/components/CategoryVisual";
import { getPublishedProducts } from "@/lib/catalog";

export default function CategoriesSection() {
  const publishedProducts = getPublishedProducts();

  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:py-20">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="font-body mb-4 text-sm font-medium uppercase tracking-[0.12em] text-neutral-500">
              Каталог
            </p>

            <h2 className="font-display text-3xl font-normal leading-tight tracking-[-0.02em] md:text-5xl">
              Материалы для интерьера
            </h2>
          </div>

          <Link
            href="/catalog"
            className="font-body hidden text-base font-medium underline underline-offset-4 md:block"
          >
            Смотреть весь каталог
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const categoryProducts = publishedProducts.filter(
              (product) => product.category === category.slug,
            );

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden bg-[#f5f5f2]">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                    <CategoryVisual slug={category.slug} />
                  </div>

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="mt-4">
                  <h3 className="font-display text-2xl font-normal leading-none tracking-[-0.015em]">
                    {category.name}
                  </h3>
                  <p className="font-body mt-2 text-sm text-neutral-400">
                    {categoryProducts.length} товаров
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/catalog"
          className="font-body mt-8 inline-block text-base font-medium underline underline-offset-4 md:hidden"
        >
          Смотреть весь каталог
        </Link>
      </div>
    </section>
  );
}
