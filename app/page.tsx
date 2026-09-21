import Link from "next/link";

import CategoriesSection from "@/components/CategoriesSection";
import RequestForm from "@/components/RequestForm";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative min-h-[calc(100svh-76px)] overflow-hidden bg-neutral-900 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://www.oracdecor.com/media/wysiwyg/homepage/hero-RoelfienVos_1.png)",
          }}
          role="img"
          aria-label="Интерьер с архитектурными молдингами"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />

        <div className="relative mx-auto flex min-h-[calc(100svh-76px)] w-full max-w-[1600px] flex-col justify-between px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="max-w-5xl pt-[18vh]">
            <p className="font-body text-xs font-medium uppercase tracking-[0.28em] text-white/75">
              архитектурный декор
            </p>

            <h1 className="mt-6 max-w-5xl text-[clamp(56px,8vw,128px)] font-normal leading-[0.86] tracking-[-0.055em] text-white">
              Архитектура
              <br />
              начинается
              <br />
              с деталей.
            </h1>

            <p className="font-body mt-8 max-w-lg text-base leading-7 text-white/80 sm:text-lg">
              Молдинги, панели и декоративные элементы для современных интерьеров.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/catalog"
                className="decor-button decor-button-light"
              >
                Смотреть каталог
              </Link>
              <Link
                href="/visualizer"
                className="decor-button decor-button-light-outline"
              >
                Не знаете, что выбрать?
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* SELECTION */}
      <section id="selection">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="text-center">
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Подбор</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Не знаете, что выбрать?</h2>
            </div>
            <div className="max-w-2xl">
              <p className="font-body text-lg font-normal leading-8 text-neutral-600">
                Начните с фотографии помещения. Выберите направление, стиль и
                категорию материала — мы соберём сценарий для AI-визуализации и
                привяжем его к каталогу DECOR.
              </p>
              <Link href="/visualizer" className="decor-button decor-button-primary mt-7">Запустить подбор</Link>
              <p className="font-body mt-4 text-sm font-normal leading-6 text-neutral-500">Артикул знать не нужно — достаточно показать пространство.</p>
            </div>
          </div>
        </div>
      </section>

      {/* B2B */}
      <section id="b2b">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="text-center">
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Для дизайнеров и бизнеса</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Есть проект или ТЗ?</h2>
            </div>
            <div className="max-w-2xl">
              <p className="font-body text-lg font-normal leading-8 text-neutral-600">
                Передайте проект — поможем подобрать материалы, собрать
                комплектацию и подготовить решение под объект.
              </p>
              <Link href="/pro" className="font-body mt-7 inline-flex rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80">Передать проект</Link>
              <p className="font-body mt-4 text-sm font-normal leading-6 text-neutral-500">Один каталог для частных клиентов, дизайнеров и строительных компаний.</p>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST */}
      <section id="request">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="text-center">
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Заявка</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Расскажите о задаче</h2>
              <p className="font-body mt-4 max-w-xl text-base font-normal leading-7 text-neutral-500">
                Подойдёт фото, размеры, план помещения или просто описание.
                Не обязательно знать название материала.
              </p>
            </div>
            <div className="max-w-2xl"><RequestForm /></div>
          </div>
        </div>
      </section>

      <CategoriesSection />

      {/* ABOUT */}
      <section id="about">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="text-center">
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">DECOR</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Материалы как часть решения</h2>
            </div>
            <p className="font-body max-w-2xl text-lg font-normal leading-8 text-neutral-600">
              Мы собираем каталог интерьерных материалов и помогаем подобрать
              конкретное решение под задачу, пространство и бюджет — от первого
              выбора до поставки.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-28">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Контакты</p>
              <p className="font-body mt-3 text-base font-normal text-neutral-500">Подбор, расчёт и вопросы по материалам — через заявку.</p>
            </div>
            <Link href="#request" className="font-body inline-flex w-fit rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-80">Оставить заявку</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
