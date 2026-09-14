import Link from "next/link";

const categories = [
  {
    slug: "wall-panels",
    name: "Декоративные панели",
    description: "Панели для стен и потолков",
  },
  {
    slug: "decorative-plaster",
    name: "Декоративная штукатурка",
    description: "Фактурные покрытия для интерьера",
  },
  {
    slug: "wallpaper",
    name: "Обои",
    description: "Современные интерьерные покрытия",
  },
  {
    slug: "moldings",
    name: "Молдинги",
    description: "Детали для стен и потолков",
  },
  {
    slug: "porcelain-stoneware",
    name: "Керамогранит",
    description: "Износостойкие покрытия для интерьера",
  },
  {
    slug: "engineered-board",
    name: "Инженерная доска",
    description: "Натуральные деревянные покрытия для пола",
  },
  {
    slug: "stone-veneer",
    name: "Каменный шпон",
    description: "Тонкий натуральный камень для стен и мебели",
  },
];

export default function CategoriesSection() {
  return (
    <section className="border-t border-neutral-200">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between gap-8">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.12em] text-neutral-500">
              Каталог
            </p>

            <h2 className="text-3xl font-semibold uppercase leading-tight tracking-tight md:text-5xl">
              Материалы для интерьера
            </h2>
          </div>

          <Link
            href="/catalog"
            className="hidden text-sm font-medium underline underline-offset-4 md:block"
          >
            Смотреть весь каталог
          </Link>
        </div>

        <div className="grid gap-px bg-neutral-200 md:grid-cols-2">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group bg-white p-8 transition-colors hover:bg-neutral-50 md:p-10"
            >
              <div className="flex min-h-40 flex-col justify-between">
                <span className="text-xs font-medium text-neutral-400">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-2xl font-semibold uppercase tracking-tight">
                    {category.name}
                  </h3>

                  <p className="mt-3 text-base font-medium text-neutral-500">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/catalog"
          className="mt-8 inline-block text-sm font-medium underline underline-offset-4 md:hidden"
        >
          Смотреть весь каталог
        </Link>
      </div>
    </section>
  );
}