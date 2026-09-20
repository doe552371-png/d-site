import Image from "next/image";
import Link from "next/link";

import {
  getCategoryBySlug,
  getManufacturerBySlug,
  getProductPreviewImage,
  searchPublishedProducts,
} from "@/lib/catalog";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() ?? "";
  const results = query ? searchPublishedProducts(query) : [];

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
            Поиск
          </p>
          <h1 className="font-display text-5xl font-normal leading-[0.98] tracking-[-0.025em] md:text-7xl">
            {query ? `Результаты для «${query}»` : "Поиск по каталогу"}
          </h1>
          {query && (
            <p className="mt-6 text-base text-neutral-500">
              Найдено: {results.length}
            </p>
          )}
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          {!query ? (
            <p className="text-base text-neutral-500">
              Введите название, артикул, категорию или производителя.
            </p>
          ) : results.length === 0 ? (
            <div className="border border-neutral-200 p-8">
              <p className="text-base font-medium text-neutral-600">
                Ничего не найдено.
              </p>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Попробуйте другой запрос.
              </p>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((product) => {
                const category = getCategoryBySlug(product.category);
                const manufacturer = getManufacturerBySlug(product.manufacturer);
                const image = getProductPreviewImage(product.slug);

                return (
                  <Link key={product.slug} href={`/product/${product.slug}`} className="group">
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
                      <h2 className="mt-2 text-lg font-medium uppercase tracking-tight">
                        {product.name}
                      </h2>
                      {product.description && (
                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                          {product.description}
                        </p>
                      )}
                      <p className="mt-4 text-sm font-medium">{product.price}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}