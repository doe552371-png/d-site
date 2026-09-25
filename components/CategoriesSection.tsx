import Link from "next/link";

import CategoryVisual from "@/components/CategoryVisual";
import { catalogDirections } from "@/data/directions";
import { getPublishedProducts } from "@/lib/catalog";

const directionVisuals: Record<string, string> = {
  "shadow-baseboards": "baseboards",
  "porcelain-stoneware": "porcelain-stoneware",
  "stone-veneer": "stone-veneer",
  "stucco-decor": "moldings",
};

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
              Материалы для интерьера и архитектурных проектов
            </h2>
          </div>

          <Link href="/catalog" className="text-base font-medium underline underline-offset-4">
            Смотреть весь каталог
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {catalogDirections.map((direction, index) => {
            const directionProducts = publishedProducts.filter(
              (product) => product.direction === direction.slug,
            );

            return (
              <Link
                key={direction.slug}
                href={"/direction/" + direction.slug}
                className="group bg-white p-6 transition-colors duration-200 hover:bg-neutral-50 md:p-7"
              >
                {directionVisuals[direction.slug] && (
                  <CategoryVisual slug={directionVisuals[direction.slug]} />
                )}

                <div className="min-h-44 pt-6">
                  <div className="flex min-h-44 flex-col justify-between">
                    <span className="text-xs font-medium text-neutral-400">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <h3 className="font-display text-2xl font-normal tracking-[-0.015em]">
                        {direction.name}
                      </h3>
                      <p className="mt-3 text-base font-normal text-neutral-500">
                        {direction.description}
                      </p>
                      <p className="mt-4 text-sm text-neutral-400">
                        {directionProducts.length} товаров
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link href="/catalog" className="mt-6 inline-block text-base font-medium underline underline-offset-4 md:hidden">
          Смотреть весь каталог
        </Link>
      </div>
    </section>
  );
}
