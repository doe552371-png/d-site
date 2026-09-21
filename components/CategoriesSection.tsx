import Link from "next/link";

import { categories } from "@/data/categories";
import { getPublishedProducts } from "@/lib/catalog";

export default function CategoriesSection() {
  const publishedProducts = getPublishedProducts();

  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
        <div className="mb-16 flex flex-col items-center justify-center gap-6 text-center">
          <div className="text-center">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-neutral-500">
              Каталог
            </p>

            <h2 className="font-display text-3xl font-normal leading-tight tracking-[-0.02em] md:text-5xl">
              Материалы для интерьера
            </h2>
          </div>

          <Link
            href="/catalog"
            className="text-base font-medium underline underline-offset-4"
          >
            Смотреть весь каталог
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {categories.map((category, index) => {
            const categoryProducts = publishedProducts.filter(
              (product) => product.category === category.slug,
            );

            return (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group bg-white p-6 transition-colors duration-200 hover:bg-neutral-50 md:p-7"
              >
                <div className="min-h-44">
                  <div className="flex min-h-44 flex-col justify-between">
                    <span className="text-xs font-medium text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-display text-2xl font-normal tracking-[-0.015em]">
                        {category.name}
                      </h3>

                      <p className="mt-3 text-base font-normal text-neutral-500">
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
          className="mt-6 inline-block text-base font-medium underline underline-offset-4 md:hidden"
        >
          Смотреть весь каталог
        </Link>
      </div>
    </section>
  );
}
