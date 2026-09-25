import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { catalogDirections } from "@/data/directions";
import { categories } from "@/data/categories";
import {
  getCategoryBySlug,
  getManufacturerBySlug,
  getProductPreviewImage,
  getProductsByDirection,
} from "@/lib/catalog";

type DirectionPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function DirectionPage({ params }: DirectionPageProps) {
  const { slug } = await params;
  const direction = catalogDirections.find((item) => item.slug === slug);

  if (!direction || direction.slug === "custom-order") {
    notFound();
  }

  const directionProducts = getProductsByDirection(slug);
  const directionCategories = categories.filter((category) =>
    directionProducts.some((product) => product.category === category.slug),
  );

  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <Link href="/catalog" className="text-sm font-medium text-neutral-500 underline underline-offset-4">
            ← Вернуться в каталог
          </Link>

          <p className="mb-5 mt-10 text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
            Направление
          </p>

          <h1 className="max-w-5xl font-display text-5xl font-normal leading-[0.98] tracking-[-0.025em] md:text-7xl">
            {direction.name}
          </h1>

          <p className="mt-8 max-w-2xl text-lg font-normal leading-8 text-neutral-500">
            {direction.description}
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-neutral-500">
              Категории
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-[-0.02em] md:text-4xl">
              {directionProducts.length} материалов
            </h2>
          </div>

          <div className="mb-16 flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-500">
            {directionCategories.map((category) => (
              <Link
                key={category.slug}
                href={"/category/" + category.slug}
                className="underline underline-offset-4"
              >
                {category.name}
              </Link>
            ))}
          </div>

          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {directionProducts.map((product, index) => {
              const manufacturer = getManufacturerBySlug(product.manufacturer);
              const category = getCategoryBySlug(product.category);
              const image = getProductPreviewImage(product.slug);

              return (
                <Link key={product.slug} href={"/product/" + product.slug} className="group">
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                    {image && (
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 360px"
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
                    <h3 className="mt-2 text-xl font-medium uppercase tracking-tight">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mt-3 text-base font-medium leading-7 text-neutral-500">
                        {product.description}
                      </p>
                    )}
                    {product.dimensions && (
                      <p className="mt-3 text-sm font-medium text-neutral-500">
                        {product.dimensions}
                      </p>
                    )}
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
