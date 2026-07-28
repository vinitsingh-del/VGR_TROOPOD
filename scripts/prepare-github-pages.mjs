import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/VGR_TROOPOD";
const textExtensions = new Set([".html", ".css", ".js", ".json", ".txt", ".xml"]);
const localRoots = [
  "brand",
  "products",
  "hero-option3.png",
  "vgr-hero-production.png",
  "favicon.svg",
  "file.svg",
  "globe.svg",
  "window.svg",
  "collections",
  "search",
  "account",
  "cart",
  "pages",
  "blogs",
  "policies",
];

const prefixQuotedUrls = (source) => {
  let result = source;

  for (const root of localRoots) {
    for (const quote of ['"', "'", "`"]) {
      result = result.replaceAll(
        `${quote}/${root}`,
        `${quote}${basePath}/${root}`,
      );
    }

  }

  return result;
};

const prefixHtmlAttributes = (source) => {
  let result = source;

  for (const root of localRoots) {
    result = result.replaceAll(
      `href="/${root}`,
      `href="${basePath}/${root}`,
    );
    result = result.replaceAll(
      `src="/${root}`,
      `src="${basePath}/${root}`,
    );
  }

  return result;
};

const prefixCssUrls = (source) => {
  let result = source;

  for (const root of localRoots) {
    result = result
      .replaceAll(`url("/${root}`, `url("${basePath}/${root}`)
      .replaceAll(`url('/${root}`, `url('${basePath}/${root}`)
      .replaceAll(`url(/${root}`, `url(${basePath}/${root}`);
  }

  return result;
};

const processDirectory = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const filePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        await processDirectory(filePath);
        return;
      }

      if (!textExtensions.has(path.extname(entry.name))) return;

      const original = await readFile(filePath, "utf8");
      const extension = path.extname(entry.name);
      const prepared =
        extension === ".html"
          ? prefixHtmlAttributes(original)
          : extension === ".css"
            ? prefixCssUrls(original)
            : extension === ".js"
              ? prefixQuotedUrls(original)
              : original;

      if (prepared !== original) {
        await writeFile(filePath, prepared);
      }
    }),
  );
};

await processDirectory(outputDirectory);
await writeFile(path.join(outputDirectory, ".nojekyll"), "");

await mkdir(path.join(outputDirectory, "404"), { recursive: true });
await copyFile(
  path.join(outputDirectory, "404.html"),
  path.join(outputDirectory, "404", "index.html"),
);

console.log(`Prepared GitHub Pages artifact for ${basePath}`);
