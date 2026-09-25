import Link from "next/link";

import Hero from "@/components/Hero";
import CategoriesSection from "@/components/CategoriesSection";
import RequestForm from "@/components/RequestForm";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <Hero />

      {/* CATALOG */}
      <CategoriesSection />

      {/* PROJECT SELECTION */}
      <section id="selection">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="text-center">
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">Под проект</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Есть проект или ТЗ?</h2>
            </div>
            <div className="max-w-2xl">
              <p className="font-body text-lg font-normal leading-8 text-neutral-600">
                Покажите проект, ТЗ или фотографию пространства — поможем подобрать
                подходящие материалы из каталога DECOR и проверить их в интерьере.
              </p>
              <Link href="/visualizer" className="decor-button decor-button-primary mt-7">Начать подбор</Link>
              <p className="font-body mt-4 text-sm font-normal leading-6 text-neutral-500">
                Для дизайнеров, архитекторов, строительных компаний и комплектаторов.
              </p>
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

      {/* ABOUT */}
      <section id="about">
        <div className="mx-auto max-w-7xl px-6 py-28 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="text-center">
              <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">DECOR</p>
              <h2 className="mt-4 max-w-xl text-4xl font-normal leading-[1.02] tracking-[-0.025em] text-neutral-900 sm:text-5xl">Материалы для интерьера и архитектурных проектов</h2>
            </div>
            <p className="font-body max-w-2xl text-lg font-normal leading-8 text-neutral-600">
              Подбираем и поставляем специализированные материалы для дизайнеров, архитекторов, строительных компаний и комплектаторов — от выбора позиции до поставки.
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
