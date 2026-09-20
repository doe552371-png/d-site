import Link from "next/link";

import CategoriesSection from "@/components/CategoriesSection";
import RequestForm from "@/components/RequestForm";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="flex min-h-[78vh] items-center border-b border-neutral-200">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-24">
          <div className="max-w-5xl">
            <p className="text-sm font-medium tracking-[0.2em] text-neutral-500">
              архитектурный декор
            </p>

            <h1 className="mt-8 max-w-4xl text-5xl font-medium leading-[0.96] tracking-tight text-neutral-900 sm:text-6xl lg:text-7xl">
              Детали, которые
              <br />
              создают пространство
            </h1>

            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-neutral-500">
              Панели, молдинги, плинтусы, каменный шпон и другие
              материалы для современных интерьеров.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="rounded-md bg-black px-7 py-4 text-base font-medium text-white transition-opacity hover:opacity-80"
              >
                Смотреть каталог
              </Link>

              <Link
                href="#selection"
                className="rounded-md border border-neutral-300 px-7 py-4 text-base font-medium transition-colors hover:bg-neutral-100"
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

              <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Не знаете, что выбрать?
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-neutral-600">
                Начните с фотографии помещения. Выберите направление, стиль
                и категорию материала — мы соберём сценарий для AI-визуализации
                и привяжем его к каталогу DECOR.
              </p>

              <Link
                href="/visualizer"
                className="mt-8 inline-flex rounded-md bg-black px-7 py-4 text-base font-medium text-white transition-opacity hover:opacity-80"
              >
                Запустить подбор
              </Link>

              <p className="mt-5 text-sm leading-6 text-neutral-500">
                Артикул знать не нужно — достаточно показать пространство.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST */}
      <section id="request" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Заявка
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Расскажите о задаче
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-500">
                Подойдёт фото, размеры, план помещения или просто описание.
                Не обязательно знать название материала.
              </p>
            </div>

            <div className="max-w-2xl">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* ABOUT */}
      <section id="about" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                DECOR
              </p>

              <h2 className="mt-4 max-w-xl text-3xl font-medium tracking-tight text-neutral-900 sm:text-4xl">
                Материалы как часть решения
              </h2>
            </div>

            <p className="max-w-2xl text-lg leading-8 text-neutral-600">
              Мы собираем каталог интерьерных материалов и помогаем
              подобрать конкретное решение под задачу, пространство и
              бюджет — от первого выбора до поставки.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Контакты
              </p>

              <p className="mt-3 text-base text-neutral-500">
                Подбор, расчёт и вопросы по материалам — через заявку.
              </p>
            </div>

            <Link
              href="#request"
              className="inline-flex w-fit rounded-md bg-black px-7 py-4 text-base font-medium text-white transition-opacity hover:opacity-80"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
