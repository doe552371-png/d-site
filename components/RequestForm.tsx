"use client";

import { useState } from "react";

type RequestFormProps = {
  productName?: string;
};

export default function RequestForm({
  productName = "",
}: RequestFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          message,
          product: productName,
          website,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setName("");
      setPhone("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 border border-neutral-200 bg-neutral-50 p-6">
        <p className="text-lg font-semibold">
          Заявка отправлена
        </p>

        <p className="mt-2 text-base text-neutral-500">
          Мы получили ваш запрос и свяжемся с вами.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10"
    >
      <textarea
        name="message"
        placeholder="Расскажите о задаче"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        maxLength={2000}
        rows={5}
        className="mt-4 w-full resize-y border border-neutral-300 px-5 py-4 outline-none transition-colors focus:border-black"
      />

      <div
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          type="text"
          name="website"
          value={website}
          onChange={(event) =>
            setWebsite(event.target.value)
          }
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          required
          maxLength={100}
          autoComplete="name"
          className="border border-neutral-300 px-5 py-4 outline-none transition-colors focus:border-black"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Телефон"
          value={phone}
          onChange={(event) =>
            setPhone(event.target.value)
          }
          required
          maxLength={50}
          autoComplete="tel"
          className="border border-neutral-300 px-5 py-4 outline-none transition-colors focus:border-black"
        />
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm font-medium text-red-600">
          Не удалось отправить заявку. Попробуйте ещё раз.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 rounded-md bg-black px-7 py-4 text-base font-semibold text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading"
          ? "Отправка..."
          : "Отправить запрос"}
      </button>
    </form>
  );
}