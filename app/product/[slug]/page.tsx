import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const category = categories.find(
    (item) => item.slug === product.category,
  );

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <Link
            href={`/category/${product.category}`}
            className="text-sm font-medium text-neutral-500 underline underline-offset-4"
          >
            ← {category?.name ?? "Категория"}
          </Link>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="aspect-[4/5] bg-neutral-100" />

            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
                {category?.name}
              </p>

              <h1 className="mt-5 text-5xl font-semibold uppercase leading-[0.98] tracking-tight md:text-7xl">
                {product.name}
              </h1>

              <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-neutral-500">
                {product.description}
              </p>

              <div className="mt-10 border-t border-neutral-200 pt-6">
                <p className="text-sm font-medium uppercase tracking-[0.1em] text-neutral-400">
                  Стоимость
                </p>

                <p className="mt-2 text-xl font-semibold">
                  {product.price}
                </p>
              </div>

              <a
                href="#request"
                className="mt-10 inline-flex w-fit bg-black px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Запросить информацию
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="request"
        className="border-t border-neutral-200"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
              Запрос
            </p>

            <h2 className="mt-4 text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
              Узнать подробнее
            </h2>

            <p className="mt-6 text-lg font-medium leading-8 text-neutral-500">
              Оставьте заявку, чтобы узнать наличие, стоимость и
              получить дополнительную информацию о материале.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Ваше имя"
                className="border border-neutral-300 px-5 py-4 outline-none transition-colors focus:border-black"
              />

              <input
                type="tel"
                placeholder="Телефон"
                className="border border-neutral-300 px-5 py-4 outline-none transition-colors focus:border-black"
              />
            </div>

            <button
              type="button"
              className="mt-4 bg-black px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
            >
              Отправить запрос
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}