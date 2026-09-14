import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <main>
      <section className="flex min-h-[80vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Архитектурный декор
            </p>

            <h1 className="text-5xl font-semibold uppercase leading-[0.98] tracking-tight md:text-7xl">
              Детали, которые
              <br />
              создают пространство
            </h1>

            <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-neutral-500">
              Декоративные панели, молдинги и интерьерные материалы
              для современных жилых и коммерческих пространств.
            </p>

            <div className="mt-10 flex gap-4">
              <a
                href="/catalog"
                className="bg-black px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Смотреть каталог
              </a>

              <a
                href="#request"
                className="border border-neutral-300 px-7 py-4 text-sm font-medium transition-colors hover:bg-neutral-100"
              >
                Оставить заявку
              </a>
            </div>
          </div>
        </div>
      </section>

      <CategoriesSection />
    </main>
  );
}