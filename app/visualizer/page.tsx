import Link from "next/link";

import VisualizerMvp from "@/components/VisualizerMvp";
import {
  getCategoryBySlug,
  getManufacturerBySlug,
  getProductPreviewImage,
  getPublishedProducts,
} from "@/lib/catalog";

export default function VisualizerPage() {
  const products = getPublishedProducts();

  const featuredSlugs = [
    "decomaster-d001",
    "decomaster-d002",
    "decomaster-d030",
    "decomaster-d235",
    "decomaster-d235-115",
    "decomaster-d303",
    "decomaster-d317",
    "decomaster-d328",
  ];

  const matches = featuredSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean)
    .map((product) => {
      const category = getCategoryBySlug(product!.category);
      const manufacturer = getManufacturerBySlug(product!.manufacturer);
      const image = getProductPreviewImage(product!.slug);

      return {
        slug: product!.slug,
        name: product!.name,
        manufacturer: manufacturer?.name ?? product!.manufacturer,
        category: product!.category,
        categoryName: category?.name ?? product!.category,
        image: image?.url,
        price: product!.price,
      };
    });

  return (
    <main>
      <section className="border-b border-neutral-200 bg-[#f7f7f4]">
        <div className="mx-auto max-w-7xl px-6 py-14 md:py-20">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-black"
            >
              ← DECOR
            </Link>
            <p className="mt-8 text-sm font-medium uppercase tracking-[0.16em] text-neutral-400">
              Подбор · визуализация
            </p>
            <h1 className="mt-4 font-display text-5xl font-normal leading-[0.94] tracking-[-0.035em] md:text-7xl">
              Покажите пространство.
              <br />
              Мы подберём детали.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600 md:text-xl">
              Загрузите фотографию помещения, задайте направление и выберите материал.
              Мы соберём подходящий сценарий и покажем релевантные позиции каталога DECOR.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-10 md:py-14">
          <VisualizerMvp matches={matches} />
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">01</p>
              <h2 className="mt-3 text-xl font-medium uppercase tracking-tight">Фото</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Загружается реальное помещение заказчика.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">02</p>
              <h2 className="mt-3 text-xl font-medium uppercase tracking-tight">Сценарий</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Формируется задача, стиль и направление материалов.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">03</p>
              <h2 className="mt-3 text-xl font-medium uppercase tracking-tight">Каталог</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-500">
                Подбор связывается с конкретными позициями DECOR.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
