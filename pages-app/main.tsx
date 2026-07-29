import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CollectionV2, HomeV2 } from "../app/v2/v2-components";

const repositoryBase = "/VGR_TROOPOD/v2";

function localRoute() {
  const route = window.location.pathname.slice(repositoryBase.length) || "/";
  return route.startsWith("/collection") ? "collection" : "home";
}

function App() {
  const [route, setRoute] = useState(localRoute);

  useEffect(() => {
    const updateLinks = () => {
      document.querySelectorAll<HTMLAnchorElement>('a[href^="/v2"]').forEach((link) => {
        const href = link.getAttribute("href");
        if (href) link.setAttribute("href", `${repositoryBase}${href.slice(3) || "/"}`);
      });
      document.querySelectorAll<HTMLImageElement>('img[src^="/brand/"]').forEach((image) => {
        const src = image.getAttribute("src");
        if (src) {
          const restored = src === "/brand/vgr-voyager-logo.png" ? "/brand/vgr-logo-official.png" : src;
          image.setAttribute("src", `${repositoryBase}${restored}`);
        }
      });
    };

    const onRoute = () => setRoute(localRoute());
    updateLinks();
    const observer = new MutationObserver(updateLinks);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.addEventListener("popstate", onRoute);
    return () => {
      observer.disconnect();
      window.removeEventListener("popstate", onRoute);
    };
  });

  return route === "collection" ? <CollectionV2 /> : <HomeV2 />;
}

createRoot(document.getElementById("root")!).render(<App />);
