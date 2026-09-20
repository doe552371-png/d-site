import Link from "next/link";

import CategoriesSection from "@/components/CategoriesSection";
import RequestForm from "@/components/RequestForm";

export default function Home() {
  const actions = [
    {
      number: "01",
      title: "Смотреть каталог",
      description: "Материалы, варианты и характеристики",
      href: "/catalog",
    },
    {
      number: "02",
      title: "Помочь с подбором",
      description: "Фото пространства → решение → материалы",
      href: "/visualizer",
    },
    {
      number: "03",
      title: "Передать проект",
      description: "Проект / ТЗ → комплектация → расчёт",
      href: "/pro",
    },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                01 / Архитектурный декор
              </p>

              <h1 className="mt-8 max-w-4xl text-6xl font-normal leading-[0.93] tracking-[-0.04em] text-neutral-900 sm:text-7xl lg:text-[88px]">
                Детали, которые
                <br />
                создают пространство
              </h1>

              <p className="font-body mt-8 max-w-xl text-base font-normal leading-7 text-neutral-500 sm:text-[17px]">
                Декоративные панели, молдинги, плинтусы, каменный шпон и другие
                материалы для современных интерьеров.
              </p>
            </div>

            <div className="border-t border-neutral-300 pt-2">
              <p className="font-body pb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                С чего начать
              </p>

              <div className="space-y-2">
                {actions.map((action) => (
                  <Link
                    key={action.number}
                    href={action.href}
                    className="group grid grid-cols-[40px_1fr_auto] items-center gap-3 rounded-md border border-neutral-200 px-4 py-4 transition-colors hover:border-black hover:bg-neutral-50"
                  >
                    <span className="font-body text-[12px] font-medium tabular-nums text-neutral-400">
                      {action.number}
                    </span>
                    <span>
                      <span className="font-body block text-sm font-medium text-neutral-900">
                        {action.title}
                      </span>
                      <span className="font-body mt-1 block text-[12px] leading-5 text-neutral-500">
                        {action.description}
                      </span>
                    </span>
                    <span className="font-body text-base text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-black">
                      →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTION */}
      <section id="selection" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                02 / Подбор
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.03em] text-neutral-900 sm:text-5xl">
                Не знаете,
                <br />
                что выбрать?
              </h2>
            </div>

            <div className="max-w-2xl lg:pt-8">
              <p className="font-body text-base font-normal leading-7 text-neutral-600 sm:text-[17px]">
                Начните с фотографии помещения. Выберите направление, стиль и
                категорию материала — мы соберём сценарий для AI-визуализации и
                привяжем его к каталогу DECOR.
              </p>
              <Link
                href="/visualizer"
                className="font-body mt-7 inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-center text-[13px] font-medium text-white transition-opacity hover:opacity-80"
              >
                Запустить подбор
              </Link>
              <p className="font-body mt-4 text-[13px] font-normal leading-6 text-neutral-500">
                Артикул знать не нужно — достаточно показать пространство.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section id="b2b" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                03 / Для профессионалов
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.03em] text-neutral-900 sm:text-5xl">
                Есть проект
                <br />
                или ТЗ?
              </h2>
            </div>

            <div className="max-w-2xl lg:pt-8">
              <p className="font-body text-base font-normal leading-7 text-neutral-600 sm:text-[17px]">
                Передайте проект — поможем подобрать материалы, собрать
                комплектацию и подготовить решение под объект.
              </p>
              <Link
                href="/pro"
                className="font-body mt-7 inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-center text-[13px] font-medium text-white transition-opacity hover:opacity-80"
              >
                Передать проект
              </Link>
              <p className="font-body mt-4 text-[13px] font-normal leading-6 text-neutral-500">
                Один каталог для частных клиентов, дизайнеров и строительных
                компаний.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST */}
      <section id="request" className="border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                04 / Заявка
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.03em] text-neutral-900 sm:text-5xl">
                Расскажите
                <br />
                о задаче
              </h2>
              <p className="font-body mt-5 max-w-xl text-base font-normal leading-7 text-neutral-500">
                Подойдёт фото, размеры, план помещения или просто описание.
                Не обязательно знать название материала.
              </p>
            </div>

            <div className="max-w-2xl lg:pt-3">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* ABOUT */}
      <section id="about" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                05 / DECOR
              </p>
              <h2 className="mt-5 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.03em] text-neutral-900 sm:text-5xl">
                Материалы как часть решения
              </h2>
            </div>

            <p className="font-body max-w-2xl text-base font-normal leading-7 text-neutral-600 sm:text-[17px] lg:pt-8">
              Мы собираем каталог интерьерных материалов и помогаем подобрать
              конкретное решение под задачу, пространство и бюджет — от первого
              выбора до поставки.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-body text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
                Контакты
              </p>
              <p className="font-body mt-3 text-[13px] font-normal leading-6 text-neutral-500">
                Подбор, расчёт и вопросы по материалам — через заявку.
              </p>
            </div>

            <Link
              href="#request"
              className="font-body inline-flex w-fit items-center justify-center rounded-md bg-black px-6 py-3 text-center text-[13px] font-medium text-white transition-opacity hover:opacity-80"
            >
              Оставить заявку
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
