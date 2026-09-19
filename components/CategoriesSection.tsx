import Link from "next/link";

import { categories } from "@/data/categories";
import CategoryVisual from "@/components/CategoryVisual";
import { getPublishedProducts } from "@/lib/catalog";

const featured = ["moldings", "baseboards", "cornices", "wall-panels", "3d-panels", "stone-veneer"];

export default function CategoriesSection() {
  const publishedProducts = getPublishedProducts();
  const visibleCategories = featured
    .map((slug) => categories.find((category) => category.slug === slug))
    .filter(Boolean);

  return (
    <section className="border-b border-neutral-200">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:py-24">
        <div className="mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral-500">Каталог</p>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.035em] md:text-6xl">
              Материалы,
              <br />
              которые формируют пространство
            </h2>
          </div>
          <Link href="/catalog" className="inline-flex text-base font-medium underline underline-offset-4 transition-colors hover:text-neutral-500">
            Смотреть весь каталог
          </Link>
        </div>

        <div className="grid gap-px overflow-hidden border border-neutral-200 bg-neutral-200 sm:grid-cols-2 xl:grid-cols-3">
          {visibleCategories.map((category, index) => {
            const categoryProducts = publishedProducts.filter((product) => product.category === category!.slug);
            return (
              <Link
                key={category!.slug}
                href={`/category/${category!.slug}`}
                className="group bg-white p-6 transition-colors hover:bg-neutral-50 md:p-7"
              >
                <div className="overflow-hidden bg-neutral-100">
                  <CategoryVisual slug={category!.slug} />
                </div>
                <div className="flex items-start justify-between gap-5 pt-6">
                  <div>
                    <p className="text-sm text-neutral-400">{String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-[-0.025em] md:text-3xl">
                      {category!.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-base leading-7 text-neutral-500">{category!.description}</p>
                  </div>
                  <span className="pt-1 text-2xl transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
                <p className="mt-5 text-sm text-neutral-400">{categoryProducts.length} товаров</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}