import Link from "next/link";
import { notFound } from "next/navigation";
import { categories } from "@/data/categories";
import { products } from "@/data/products";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.slug,
  );

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <Link
            href="/catalog"
            className="text-sm font-medium text-neutral-500 underline underline-offset-4"
          >
            ← Вернуться в каталог
          </Link>

          <p className="mb-5 mt-12 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
            Категория
          </p>

          <h1 className="max-w-5xl text-5xl font-semibold uppercase leading-[0.98] tracking-tight md:text-7xl">
            {category.name}
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-neutral-500">
            {category.description}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
                Коллекция
              </p>

              <h2 className="mt-3 text-3xl font-semibold uppercase tracking-tight md:text-4xl">
                {categoryProducts.length} материалов
              </h2>
            </div>
          </div>

          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {categoryProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="group"
              >
                <div className="aspect-[4/5] bg-neutral-100 transition-colors group-hover:bg-neutral-200" />

                <div className="pt-5">
                  <h3 className="text-xl font-semibold uppercase tracking-tight">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-base font-medium leading-7 text-neutral-500">
                    {product.description}
                  </p>

                  <p className="mt-4 text-sm font-medium">
                    {product.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}