import Link from "next/link";

import CategoriesSection from "@/components/CategoriesSection";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="flex min-h-[78vh] items-center border-b border-neutral-200">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Архитектурный декор
            </p>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold uppercase leading-[0.96] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
              Детали, которые
              <br />
              создают пространство
            </h1>

            <p className="mt-8 max-w-xl text-lg font-medium leading-8 text-neutral-500">
              Панели, молдинги, плинтусы, каменный шпон и другие
              материалы для современных интерьеров.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="rounded-md bg-black px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Смотреть каталог
              </Link>

              <Link
                href="#selection"
                className="rounded-md border border-neutral-300 px-7 py-4 text-sm font-medium transition-colors hover:bg-neutral-100"
              >
                Помочь с подбором
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTION */}
      <section id="selection" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Подбор
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                Не знаете, с чего начать?
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-neutral-600">
                Расскажите, какой результат хотите получить. Можно начать
                с фотографии, размеров или просто описания задачи — мы
                поможем подобрать подходящие материалы и решение.
              </p>

              <Link
                href="#request"
                className="mt-8 inline-flex rounded-md bg-black px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Начать подбор
              </Link>

              <p className="mt-5 text-sm leading-6 text-neutral-500">
                Не обязательно знать название материала или артикул.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DECOR PRO */}
      <section id="professionals" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                DECOR PRO
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
                Рабочее пространство для профессионалов
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-neutral-600">
                Для дизайнеров, архитекторов, строителей и комплектаторов.
                Передавайте проекты и ТЗ, подбирайте материалы, работайте
                с расчётами, спецификациями, коммерческими предложениями
                и заказами — в одном пространстве DECOR.
              </p>

              <Link
                href="/pro"
                className="mt-8 inline-flex rounded-md bg-black px-7 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                Перейти в ПРО
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CategoriesSection />
    </main>
  );
}
