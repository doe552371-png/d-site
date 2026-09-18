import Link from "next/link";
import RequestForm from "@/components/RequestForm";

export default function ProPartnerPage() {
  return (
    <main>
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <Link href="/pro" className="text-sm font-medium text-neutral-500 underline underline-offset-4">
            ← Вернуться в ПРО
          </Link>
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                Партнёрство
              </p>
              <h1 className="mt-5 text-4xl font-semibold uppercase leading-[0.98] tracking-tight text-neutral-900 sm:text-6xl">
                Стать партнёром DECOR PRO
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-600">
                Оставьте контакты и кратко опишите, с какими проектами работаете.
                Мы свяжемся и обсудим формат сотрудничества.
              </p>
            </div>
            <div className="lg:pt-8">
              <RequestForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
