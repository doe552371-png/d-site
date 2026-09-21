import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "data", "productVariants.import.json");
const OUTPUT = path.join(ROOT, "data", "productVariants.generated.ts");

const REQUIRED_FIELDS = [
  "id",
  "productSlug",
  "name",
  "article",
  "dimensions",
  "color",
  "published",
];

function validateVariant(item, index) {
  for (const field of REQUIRED_FIELDS) {
    if (
      item[field] === undefined ||
      item[field] === null ||
      item[field] === ""
    ) {
      throw new Error(
        `Вариант #${index + 1}: отсутствует поле "${field}"`,
      );
    }
  }

  if (typeof item.published !== "boolean") {
    throw new Error(
      `Вариант #${index + 1}: "published" должен быть boolean`,
    );
  }
}

function escape(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, "\\n");
}

async function main() {
  const variants = JSON.parse(
    await fs.readFile(INPUT, "utf8"),
  );

  if (!Array.isArray(variants)) {
    throw new Error(
      "productVariants.import.json должен содержать массив",
    );
  }

  const ids = new Set();

  variants.forEach((variant, index) => {
    validateVariant(variant, index);

    if (ids.has(variant.id)) {
      throw new Error(
        `Дублирующийся variant id: ${variant.id}`,
      );
    }

    ids.add(variant.id);
  });

  const records = variants.map((variant) => {
    return `  {
    id: "${escape(variant.id)}",
    productSlug: "${escape(variant.productSlug)}",
    name: "${escape(variant.name)}",
    article: "${escape(variant.article)}",
    dimensions: "${escape(variant.dimensions)}",
    color: "${escape(variant.color)}",
    published: ${variant.published},
  },`;
  });

  const output = `export interface ProductVariant {
  id: string;
  productSlug: string;
  name: string;
  article: string;
  dimensions: string;
  color: string;
  published: boolean;
}

export const productVariantsGenerated: ProductVariant[] = [
${records.join("\n")}
];
`;

  await fs.writeFile(OUTPUT, output, "utf8");

  console.log(
    `Generated ${variants.length} variant(s).`,
  );
  console.log(
    `Output: ${path.relative(ROOT, OUTPUT)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
