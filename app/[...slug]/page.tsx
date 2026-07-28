import { CompleteStore } from "../store-components";
import { products } from "../store-data";

const collectionSlugs = Array.from(
  new Set(["all", ...products.flatMap((product) => product.groups)]),
);

const fixedRoutes = [
  ...collectionSlugs.map((slug) => ["collections", slug]),
  ...products.map((product) => ["products", product.slug]),
  ...[
    "about-us",
    "contact",
    "vgr-warranty-policy",
    "vgr-warranty-registration",
    "track-order",
    "e-catalog",
    "careers",
    "collab",
  ].map((slug) => ["pages", slug]),
  ...[
    "privacy-policy",
    "shipping-policy",
    "refund-policy",
    "terms-of-service",
    "contact-information",
  ].map((slug) => ["policies", slug]),
  ["search"],
  ["cart"],
  ["account"],
  ["blogs", "news"],
];

export const dynamicParams = false;

export function generateStaticParams() {
  return fixedRoutes.map((slug) => ({ slug }));
}

export default async function StoreRoute({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  return <CompleteStore pathname={`/${slug.join("/")}`} />;
}
