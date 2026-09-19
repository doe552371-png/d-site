import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();

const PRODUCTS_FILE = path.join(
  ROOT,
  "data",
  "products.ts",
);

const GENERATED_PRODUCTS_FILE = path.join(
  ROOT,
  "data",
  "products.generated.ts",
);

const VARIANTS_FILE = path.join(
  ROOT,
  "data",
  "productVariants.generated.ts",
);

const IMAGES_FILE = path.join(
  ROOT,
  "data",
  "productImages.generated.ts",
);

const PUBLIC_ROOT = path.join(
  ROOT,
  "public",
);

function fail(message) {
  console.error(`✗ ${message}`);
}

function ok(message) {
  console.log(`✓ ${message}`);
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

function extractStringValues(text, field) {
  const regex = new RegExp(
    String.raw`${field}:\s*"([^"]+)"`,
    "g",
  );

  return [...text.matchAll(regex)].map(
    (match) => match[1],
  );
}

async function main() {
  let errors = 0;
  let warnings = 0;

  console.log("=== decor-site catalog check ===");
  console.log("");

  for (const file of [
    PRODUCTS_FILE,
    GENERATED_PRODUCTS_FILE,
    VARIANTS_FILE,
    IMAGES_FILE,
  ]) {
    if (await exists(file)) {
      ok(path.relative(ROOT, file));
    } else {
      fail(`Файл отсутствует: ${path.relative(ROOT, file)}`);
      errors++;
    }
  }

  const productsText = await fs.readFile(
    PRODUCTS_FILE,
    "utf8",
  );

  const generatedProductsText = await fs.readFile(
    GENERATED_PRODUCTS_FILE,
    "utf8",
  );

  const variantsText = await fs.readFile(
    VARIANTS_FILE,
    "utf8",
  );

  const imagesText = await fs.readFile(
    IMAGES_FILE,
    "utf8",
  );

  const productSlugs = [
    ...extractStringValues(productsText, "slug"),
    ...extractStringValues(generatedProductsText, "slug"),
  ];

  const duplicateProducts = productSlugs.filter(
    (slug, index) =>
      productSlugs.indexOf(slug) !== index,
  );

  if (duplicateProducts.length > 0) {
    fail(
      `Дубли товаров: ${[
        ...new Set(duplicateProducts),
      ].join(", ")}`,
    );
    errors++;
  } else {
    ok(`Товаров без duplicate slug: ${productSlugs.length}`);
  }

  const variantIds = extractStringValues(
    variantsText,
    "id",
  );

  const duplicateVariants = variantIds.filter(
    (id, index) =>
      variantIds.indexOf(id) !== index,
  );

  if (duplicateVariants.length > 0) {
    fail(
      `Дубли вариантов: ${[
        ...new Set(duplicateVariants),
      ].join(", ")}`,
    );
    errors++;
  } else {
    ok(`Вариантов без duplicate id: ${variantIds.length}`);
  }

  const imageUrls = extractStringValues(
    imagesText,
    "url",
  );

  const externalUrls = imageUrls.filter(
    (url) =>
      url.startsWith("http://") ||
      url.startsWith("https://"),
  );

  if (externalUrls.length > 0) {
    fail(
      `В runtime остаются внешние изображения: ${externalUrls.length}`,
    );

    for (const url of externalUrls) {
      console.error(`  ${url}`);
    }

    errors++;
  } else {
    ok("Все runtime-изображения локальные");
  }

  const localUrls = imageUrls.filter((url) =>
    url.startsWith("/images/"),
  );

  let missingImages = 0;

  for (const url of localUrls) {
    const relative = url.replace(/^\/+/, "");

    const absolute = path.join(
      PUBLIC_ROOT,
      relative,
    );

    if (!(await exists(absolute))) {
      fail(`Файл изображения отсутствует: ${url}`);
      missingImages++;
    }
  }

  if (missingImages === 0) {
    ok(`Локальные изображения существуют: ${localUrls.length}`);
  } else {
    errors += missingImages;
  }

  const imageProductSlugs = extractStringValues(
    imagesText,
    "productSlug",
  );

  const missingProductImages = imageProductSlugs.filter(
    (slug) => !productSlugs.includes(slug),
  );

  if (missingProductImages.length > 0) {
    fail(
      `Изображения с неизвестным productSlug: ${[
        ...new Set(missingProductImages),
      ].join(", ")}`,
    );
    errors++;
  } else {
    ok("Все изображения привязаны к существующим товарам");
  }

  const imageVariantIds = extractStringValues(
    imagesText,
    "variantId",
  );

  const unknownVariants = imageVariantIds.filter(
    (id) => !variantIds.includes(id),
  );

  if (unknownVariants.length > 0) {
    fail(
      `Изображения с неизвестным variantId: ${[
        ...new Set(unknownVariants),
      ].join(", ")}`,
    );
    errors++;
  } else if (imageVariantIds.length > 0) {
    ok(
      `Все variantId изображений существуют: ${imageVariantIds.length}`,
    );
  }

  console.log("");
  console.log("=== RESULT ===");

  if (errors === 0) {
    console.log("✓ Каталог прошёл проверку.");
    process.exit(0);
  }

  console.log(
    `✗ Ошибок: ${errors}, предупреждений: ${warnings}`,
  );

  process.exit(1);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
