"use client";

import { useMemo, useState } from "react";

import ProductGallery from "@/components/ProductGallery";
import type { ProductImage } from "@/types/product";

type ProductVariant = {
  id: string;
  productSlug: string;
  name: string;
  article: string;
  dimensions: string;
  color: string;
  published: boolean;
};

type ProductOptionsProps = {
  productImages?: ProductImage[];
  productName: string;
  variants?: ProductVariant[];
};

export default function ProductOptions({
  productImages = [],
  productName,
  variants = [],
}: ProductOptionsProps) {
  const publishedVariants = variants.filter(
    (variant) => variant.published,
  );

  const [selectedVariantId, setSelectedVariantId] = useState<
    string | undefined
  >(publishedVariants[0]?.id);

  const selectedVariant = publishedVariants.find(
    (variant) => variant.id === selectedVariantId,
  );

  const visibleImages = useMemo(() => {
    if (!selectedVariantId) {
      return productImages;
    }

    const variantImages = productImages.filter(
      (image) => image.variantId === selectedVariantId,
    );

    if (variantImages.length === 0) {
      return productImages.filter(
        (image) => !image.variantId,
      );
    }

    return variantImages;
  }, [productImages, selectedVariantId]);

  return (
    <div className="space-y-8">
      <div>
        <ProductGallery images={visibleImages} />

        {!visibleImages.length && (
          <p className="mt-3 text-sm text-neutral-500">
            Для товара «{productName}» изображения пока не добавлены.
          </p>
        )}
      </div>

      {publishedVariants.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-medium">
            Вариант
          </h2>

          <div className="flex flex-wrap gap-2">
            {publishedVariants.map((variant) => {
              const isSelected =
                variant.id === selectedVariantId;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() =>
                    setSelectedVariantId(variant.id)
                  }
                  className={[
                    "rounded-md border px-4 py-3 text-left text-sm transition-colors",
                    isSelected
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white hover:border-neutral-400",
                  ].join(" ")}
                >
                  <div className="font-medium">
                    {variant.name}
                  </div>

                  <div
                    className={[
                      "mt-1 text-xs",
                      isSelected
                        ? "text-neutral-300"
                        : "text-neutral-500",
                    ].join(" ")}
                  >
                    {variant.article}
                  </div>
                </button>
              );
            })}
          </div>

          {selectedVariant && (
            <div className="mt-4 space-y-1 text-sm text-neutral-500">
              <div>
                Размер: {selectedVariant.dimensions}
              </div>

              <div>
                Цвет: {selectedVariant.color}
              </div>

              <div>
                Артикул: {selectedVariant.article}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}