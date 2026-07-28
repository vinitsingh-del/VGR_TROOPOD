"use client";

import { usePathname } from "next/navigation";
import { CompleteStore } from "../store-components";

export default function StoreRoute() {
  const pathname = usePathname();
  return <CompleteStore pathname={pathname} />;
}
