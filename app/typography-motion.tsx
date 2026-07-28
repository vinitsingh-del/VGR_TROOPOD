"use client";

import { useLayoutEffect } from "react";

const headingSelector = "h1,h2,h3";

const eyebrowSelector = [
  ".kicker",
  ".collectionHero>p",
  ".utilityHero>p",
  ".contentHero>p",
  ".aboutHero>div>p",
  ".accountPage>div>p",
  ".recommendations>header>p",
  ".leadership>p",
  ".supportDetails>p",
].join(",");

const subtitleSelector = [
  ".heroText",
  ".collectionHero>span",
  ".utilityHero>span",
  ".contentHero>span",
  ".aboutHero>div>span",
  ".accountPage>div>span",
  ".campaignCopy>p",
  ".manifesto>p:last-child",
  ".proCopy>p:not(.kicker)",
  ".marketplaceProof>p:last-child",
  ".newsletter>p:not(.kicker)",
  ".aboutIntro>p",
  ".supportDetails>span",
].join(",");

const statSelector = [
  ".trust strong",
  ".specs strong",
  ".aboutStats strong",
  ".serviceStrip strong",
  ".socialProof>div>strong",
].join(",");

const calloutSelector = [
  ".homeBlockHeader>a",
  ".campaignCopy>a",
  ".editCopy>span",
  ".audienceCard>div>span",
  ".journalCards a",
].join(",");

const motionSelector = [
  headingSelector,
  eyebrowSelector,
  subtitleSelector,
  statSelector,
  calloutSelector,
].join(",");

type MotionVariant = "hero" | "headline" | "card" | "eyebrow" | "subtitle" | "stat" | "callout";

const getVariant = (element: HTMLElement): MotionVariant => {
  if (element.matches(".hero h1")) return "hero";
  if (
    element.matches(
      ".pdpInfo>h2,.blogGrid h2,.cartLine h2,.policyPage h2,.editorialPage h2,.accountPage form h2,.supportDetails h2,.emptyState h2",
    )
  ) {
    return "card";
  }
  if (element.matches("h1,h2")) return "headline";
  if (element.matches("h3")) return "card";
  if (element.matches(eyebrowSelector)) return "eyebrow";
  if (element.matches(subtitleSelector)) return "subtitle";
  if (element.matches(statSelector)) return "stat";
  return "callout";
};

export default function TypographyMotion() {
  useLayoutEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.classList.remove("type-motion-ready");
      return;
    }

    root.classList.add("type-motion-ready");

    const pending = new Set<HTMLElement>();
    let scrollFrame = 0;

    const reveal = (element: HTMLElement) => {
      element.classList.add("is-type-visible");
      element.addEventListener(
        "transitionend",
        () => element.classList.add("is-type-settled"),
        { once: true },
      );
      pending.delete(element);
      observer.unobserve(element);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        });
      },
      {
        rootMargin: "0px 0px -7% 0px",
        threshold: 0.04,
      },
    );

    const decorate = (scope: ParentNode) => {
      const elements: HTMLElement[] = [];

      if (scope instanceof HTMLElement && scope.matches(motionSelector)) {
        elements.push(scope);
      }

      elements.push(...Array.from(scope.querySelectorAll<HTMLElement>(motionSelector)));

      elements.forEach((element) => {
        if (element.dataset.typeMotion || element.closest(".srOnly,[aria-hidden='true']")) return;
        element.dataset.typeMotion = getVariant(element);
        element.classList.add("type-motion");
        pending.add(element);
        observer.observe(element);
      });
    };

    const catchFastScroll = () => {
      scrollFrame = 0;
      const viewportHeight = window.innerHeight;
      pending.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= viewportHeight * 0.98 && rect.bottom >= 0) reveal(element);
      });
    };

    const queueFastScrollCheck = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(catchFastScroll);
    };

    decorate(document.body);
    scrollFrame = window.requestAnimationFrame(catchFastScroll);
    window.addEventListener("scroll", queueFastScrollCheck, { passive: true });

    const mutations = new MutationObserver((records) => {
      records.forEach((record) => {
        record.addedNodes.forEach((node) => {
          if (node instanceof HTMLElement) decorate(node);
        });
      });
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
      window.removeEventListener("scroll", queueFastScrollCheck);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      root.classList.remove("type-motion-ready");
    };
  }, []);

  return null;
}
