import Link from "next/link";
import { categories } from "@/data/categories";
import { manufacturers } from "@/data/manufacturers";
import { products } from "@/data/products";

export default function CatalogPage() {
  const publishedProducts = products.filter(
    (product) => product.published,
  );

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
            Каталог
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold uppercase leading-[0.98] tracking-tight md:text-7xl">
            Материалы
            <br />
            для интерьера
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-neutral-500">
            Декоративные и отделочные материалы для жилых,
            коммерческих и общественных пространств.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="grid gap-4 md:grid-cols-2">
            {categories.map((category, index) => {
              const categoryProducts = publishedProducts.filter(
                (product) => product.category === category.slug,
              );

              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group border border-neutral-200 bg-white p-8 transition-colors hover:bg-neutral-50 md:p-10"
                >
                  <div className="flex min-h-56 flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <span className="text-sm font-medium text-neutral-400">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm text-neutral-400">
                        {categoryProducts.length} товаров
                      </span>
                    </div>

                    <div>
                      <h2 className="max-w-xl text-2xl font-semibold uppercase leading-tight tracking-tight md:text-3xl">
                        {category.name}
                      </h2>

                      <p className="mt-4 max-w-md text-base font-medium leading-7 text-neutral-500">
                        {category.description}
                      </p>

                      <span className="mt-8 block text-2xl font-light transition-transform duration-300 group-hover:translate-x-2">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
                Производители
              </p>

              <h2 className="text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
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
                (product) =>
                  product.manufacturer === manufacturer.slug,
              );

              if (manufacturerProducts.length === 0) {
                return null;
              }

              return (
                <div
                  key={manufacturer.slug}
                  className="border border-neutral-200 p-8"
                >
                  <p className="text-xl font-semibold uppercase tracking-tight">
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
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
                Избранное
              </p>

              <h2 className="text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
                Популярные материалы
              </h2>
            </div>

            <span className="hidden text-sm text-neutral-400 md:block">
              {publishedProducts.length} материалов
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {publishedProducts.slice(0, 8).map((product) => {
              const category = categories.find(
                (item) => item.slug === product.category,
              );

              const manufacturer = manufacturers.find(
                (item) => item.slug === product.manufacturer,
              );

              return (
                <Link
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/5] bg-neutral-100 transition-colors group-hover:bg-neutral-200" />

                  <div className="pt-5">
                    <p className="text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                      {manufacturer?.name}
                    </p>

                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.1em] text-neutral-400">
                      {category?.name}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold uppercase tracking-tight">
                      {product.name}
                    </h3>

                    <p className="mt-2 text-sm font-medium leading-6 text-neutral-500">
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