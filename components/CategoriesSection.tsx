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

const mainDirectionSlugs = [
  "shadow-baseboards",
  "porcelain-stoneware",
  "stone-veneer",
] as const;

export default function CategoriesSection() {
  const publishedProducts = getPublishedProducts();

  const mainDirections = mainDirectionSlugs
    .map((slug) => catalogDirections.find((direction) => direction.slug === slug))
    .filter((direction): direction is (typeof catalogDirections)[number] => Boolean(direction));

  const stuccoDirection = catalogDirections.find(
    (direction) => direction.slug === "stucco-decor",
  );

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

        <div className="mb-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-400">
            Основной каталог DECOR
          </p>
          <p className="mt-2 text-base text-neutral-500">
            LACONISTIQ · DAKO · FlatStone
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {mainDirections.map((direction, index) => {
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

                <div className="pt-6">
                  <span className="text-xs font-medium text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="mb-2 mt-5 text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                    {direction.brandLabel}
                  </p>

                  <h3 className="font-display text-2xl font-normal tracking-[-0.015em]">
                    {direction.name}
                  </h3>

                  <p className="mt-3 text-base font-normal text-neutral-500">
                    {direction.description}
                  </p>

                  <div className="mt-6 border-t border-neutral-100 pt-5">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                      Продукция
                    </p>
                    <div className="mt-3 space-y-2">
                      {directionProducts.slice(0, 3).map((product) => (
                        <div
                          key={product.slug}
                          className="flex items-center justify-between gap-3 text-sm"
                        >
                          <span className="truncate text-neutral-600">{product.name}</span>
                          <span className="shrink-0 text-xs text-neutral-400">{product.sku}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-5 text-sm text-neutral-400">
                    {directionProducts.length} товаров · Смотреть коллекцию →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {stuccoDirection && (
          <div className="mt-16 border-t border-neutral-200 pt-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.12em] text-neutral-400">
                  Также можем подобрать под проект
                </p>
                <h3 className="mt-4 font-display text-3xl font-normal tracking-[-0.02em]">
                  {stuccoDirection.brandLabel}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-neutral-500">
                  {stuccoDirection.description}
                </p>
              </div>

              <Link
                href={"/direction/" + stuccoDirection.slug}
                className="group bg-white p-6 transition-colors duration-200 hover:bg-neutral-50 md:p-7"
              >
                <div className="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
                  <CategoryVisual slug={directionVisuals[stuccoDirection.slug]} />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                      Дополнительное направление
                    </p>
                    <h4 className="mt-3 font-display text-2xl font-normal">
                      {stuccoDirection.name}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-neutral-500">
                      DECOMASTER · Paolo Arte
                    </p>
                    <p className="mt-5 text-sm text-neutral-400">
                      Смотреть каталог →
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        <Link href="/catalog" className="mt-6 inline-block text-base font-medium underline underline-offset-4 md:hidden">
          Смотреть весь каталог
        </Link>
      </div>
    </section>
  );
}
