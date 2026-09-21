"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
});

type ScrollMotion = {
  progress: number;
};

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const motionRef = useRef<ScrollMotion>({ progress: 0 });

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        motionRef.current.progress = 0.35;
        gsap.set(".hero-line", { yPercent: 0, opacity: 1 });
        gsap.set(".hero-form", { clearProps: "all" });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.15,
        },
      });

      timeline
        .to(
          motionRef.current,
          {
            progress: 1,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          ".hero-line-1",
          {
            yPercent: -115,
            opacity: 0,
            ease: "power2.in",
            duration: 0.3,
          },
          0.18,
        )
        .to(
          ".hero-line-2",
          {
            yPercent: -95,
            opacity: 0,
            ease: "power2.in",
            duration: 0.34,
          },
          0.24,
        )
        .to(
          ".hero-line-3",
          {
            yPercent: -75,
            opacity: 0,
            ease: "power2.in",
            duration: 0.38,
          },
          0.3,
        )
        .to(
          ".hero-copy",
          {
            yPercent: -18,
            ease: "none",
            duration: 0.8,
          },
          0,
        )
        .to(
          ".hero-form-a",
          {
            xPercent: 12,
            yPercent: -26,
            rotation: 12,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          ".hero-form-b",
          {
            xPercent: -12,
            yPercent: 18,
            rotation: -16,
            scale: 1.18,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .to(
          ".hero-form-c",
          {
            xPercent: 7,
            yPercent: 30,
            rotation: 8,
            scale: 0.86,
            ease: "none",
            duration: 1,
          },
          0,
        )
        .fromTo(
          ".hero-scroll-note",
          { opacity: 1, y: 0 },
          { opacity: 0, y: -16, ease: "none", duration: 0.25 },
          0.1,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200svh] overflow-clip bg-white text-neutral-950"
    >
      <div className="sticky top-0 h-[100svh] min-h-[680px] overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(206,146,95,0.22),transparent_34%),radial-gradient(circle_at_87%_72%,rgba(181,110,67,0.12),transparent_24%)]" />
          <div className="hero-form hero-form-a absolute right-[12%] top-[12%] h-[38vw] w-[26vw] min-h-[240px] min-w-[170px] rounded-[42%_58%_54%_46%/42%_42%_58%_58%] border border-[#B56E43]/18 bg-[#B56E43]/[0.035]" />
          <div className="hero-form hero-form-b absolute right-[32%] bottom-[9%] h-[24vw] w-[38vw] min-h-[180px] min-w-[260px] rounded-[58%_42%_36%_64%/44%_53%_47%_56%] border border-[#B56E43]/12" />
          <div className="hero-form hero-form-c absolute left-[4%] top-[30%] h-[13vw] w-[13vw] min-h-[100px] min-w-[100px] rounded-full border border-black/[0.06]" />
        </div>

        <HeroScene motion={motionRef} />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1600px] flex-col justify-between px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
          <div className="hero-copy max-w-4xl pt-[15vh]">
            <p className="font-body text-sm font-medium uppercase tracking-[0.2em] text-black/45">
              DECOR / ARCHITECTURAL MATERIALS
            </p>

            <h1 className="mt-5 max-w-5xl text-[clamp(56px,8vw,128px)] font-normal leading-[0.86] tracking-[-0.055em] text-black">
              <span className="block overflow-hidden">
                <span className="hero-line hero-line-1 inline-block">Архитектура</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line hero-line-2 inline-block">начинается</span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-line hero-line-3 inline-block">с деталей.</span>
              </span>
            </h1>

            <p className="font-body mt-8 max-w-lg text-base leading-7 text-black/65 sm:text-lg">
              Молдинги, панели и декоративные элементы для современных интерьеров.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/catalog" className="decor-button decor-button-primary">
                Смотреть каталог
              </Link>
              <Link
                href="/visualizer"
                className="decor-button decor-button-secondary"
              >
                Не знаете, что выбрать?
              </Link>
            </div>
          </div>

          <div className="hero-scroll-note flex items-center gap-4 pb-4 text-xs font-medium uppercase tracking-[0.18em] text-black/40">
            <span className="h-px w-12 bg-black/20" />
            <span>Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
