import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const INPUT = path.join(
  ROOT,
  "data",
  "products.import.json",
);

const OUTPUT = path.join(
  ROOT,
  "data",
  "products.generated.ts",
);

const REQUIRED_FIELDS = [
  "slug",
  "sku",
  "name",
  "manufacturer",
  "category",
  "published",
];

function validateProduct(product, index) {
  for (const field of REQUIRED_FIELDS) {
    if (
      product[field] === undefined ||
      product[field] === null ||
      product[field] === ""
    ) {
      throw new Error(
        `Товар #${index + 1}: отсутствует поле "${field}"`,
      );
    }
  }

  if (typeof product.published !== "boolean") {
    throw new Error(
      `Товар #${index + 1}: "published" должен быть boolean`,
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
  const raw = await fs.readFile(
    INPUT,
    "utf8",
  );

  const products = JSON.parse(raw);

  if (!Array.isArray(products)) {
    throw new Error(
      "products.import.json должен содержать массив товаров",
    );
  }

  const slugs = new Set();

  products.forEach((product, index) => {
    validateProduct(product, index);

    if (slugs.has(product.slug)) {
      throw new Error(
        `Дублирующийся slug: ${product.slug}`,
      );
    }

    slugs.add(product.slug);
  });

  const records = products.map((product) => {
    const description = product.description
      ? `\n    description: "${escape(product.description)}",`
      : "";

    return `  {
    slug: "${escape(product.slug)}",
    sku: "${escape(product.sku)}",
    name: "${escape(product.name)}",
    manufacturer: "${escape(product.manufacturer)}",
    category: "${escape(product.category)}",${description}
    published: ${product.published},
  },`;
  });

  const output = `export interface Product {
  slug: string;
  sku: string;
  name: string;
  manufacturer: string;
  category: string;
  description?: string;
  published: boolean;
}

export const productsGenerated: Product[] = [
${records.join("\n")}
];
`;

  await fs.writeFile(
    OUTPUT,
    output,
    "utf8",
  );

  console.log(
    `Generated ${products.length} product(s).`,
  );

  console.log(
    `Output: ${path.relative(ROOT, OUTPUT)}`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
