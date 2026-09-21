"use client";

import { useState } from "react";

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-black"
        aria-label={open ? "Закрыть поиск" : "Открыть поиск"}
        aria-expanded={open}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16l4.5 4.5" />
        </svg>
      </button>

      {open && (
        <form
          action="/search"
          method="get"
          className="absolute right-0 top-11 z-20 w-[min(82vw,360px)] rounded-md border border-neutral-300 bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        >
          <div className="flex items-center gap-2">
            <input
              autoFocus
              name="q"
              type="search"
              placeholder="Поиск по каталогу"
              className="h-10 min-w-0 flex-1 border-0 bg-transparent px-2 text-[14px] outline-none"
            />
            <button
              type="submit"
              className="decor-button decor-button-primary decor-button-compact"
            >
              Найти
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
