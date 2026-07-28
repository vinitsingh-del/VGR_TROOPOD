"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  collectionMeta,
  formatPrice,
  productBySlug,
  products,
  productsForCollection,
  type Product,
} from "./store-data";

type CartLine = { slug: string; quantity: number };

const CART_KEY = "vgr-complete-cart";
const CART_EVENT = "vgr-cart-change";

const readCart = (): CartLine[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeCart = (lines: CartLine[]) => {
  window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new CustomEvent(CART_EVENT));
};

export function useVgrCart() {
  const [lines, setLines] = useState<CartLine[]>([]);

  useEffect(() => {
    const sync = () => setLines(readCart());
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const addItem = (product: Pick<Product, "slug">, quantity = 1) => {
    const next = readCart();
    const existing = next.find((line) => line.slug === product.slug);
    if (existing) existing.quantity += quantity;
    else next.push({ slug: product.slug, quantity });
    writeCart(next);
  };

  const changeItem = (slug: string, quantity: number) => {
    const next = readCart()
      .map((line) => (line.slug === slug ? { ...line, quantity } : line))
      .filter((line) => line.quantity > 0);
    writeCart(next);
  };

  const removeItem = (slug: string) => writeCart(readCart().filter((line) => line.slug !== slug));
  const clearCart = () => writeCart([]);
  const count = lines.reduce((sum, line) => sum + line.quantity, 0);
  const detailedLines = lines
    .map((line) => ({ ...line, product: productBySlug(line.slug) }))
    .filter((line): line is CartLine & { product: Product } => Boolean(line.product));
  const subtotal = detailedLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  return { lines: detailedLines, count, subtotal, addItem, changeItem, removeItem, clearCart };
}

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const [shop, setShop] = useState(false);
  const { count } = useVgrCart();

  return (
    <>
      <div className="offerBar">
        Complimentary delivery above ₹499 <span>•</span> 2-year warranty <span>•</span> 7-day returns
      </div>
      <header className="storeHeader">
        <button className="storeMenuButton" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">
          ☰
        </button>
        <a className="logo" href="/" aria-label="VGR Voyager home">
          <img src="/brand/vgr-logo-official.png" alt="VGR Voyager" />
        </a>
        <nav className={menu ? "storeNav open" : "storeNav"} aria-label="Main navigation">
          <a href="/collections/new-arrival">New arrivals</a>
          <a href="/collections/category-men">Men</a>
          <a href="/collections/category-women">Women</a>
          <a href="/collections/vgr-professional-use-tools">Professional</a>
          <button
            className={shop ? "shopTrigger active" : "shopTrigger"}
            onClick={() => setShop(!shop)}
            aria-expanded={shop}
          >
            Shop all <span>⌄</span>
          </button>
        </nav>
        <div className="storeActions">
          <a href="/search" aria-label="Search">⌕</a>
          <a href="/account" aria-label="Account">○</a>
          <a className="bag" href="/cart" aria-label={`Shopping bag with ${count} items`}>
            Bag <b>{count}</b>
          </a>
        </div>
        <div className={shop ? "megaMenu open" : "megaMenu"}>
          <div>
            <span>For him</span>
            <a href="/collections/hair-trimmer">Hair trimmers</a>
            <a href="/collections/clipper">Hair clippers</a>
            <a href="/collections/shaver">Shavers</a>
            <a href="/collections/vgr-personal-use-trimmer">Personal-use tools</a>
          </div>
          <div>
            <span>For her</span>
            <a href="/collections/hair-volumizer">Hair volumizers</a>
            <a href="/collections/hair-straightener">Hair straighteners</a>
            <a href="/collections/hair-dryer">Hair dryers</a>
            <a href="/collections/womens-grooming-tools">All women’s grooming</a>
          </div>
          <div>
            <span>Specialist</span>
            <a href="/collections/vgr-professional-use-tools">Professional series</a>
            <a href="/collections/pet-grooming-tools">Pet grooming</a>
            <a href="/collections/lint-remover">Lint removers</a>
            <a href="/collections/red-series">Limited red series</a>
          </div>
          <div className="megaFeature">
            <p>Power that performs</p>
            <strong>THE COMPLETE VGR EDIT</strong>
            <a href="/collections/all">Explore all products →</a>
          </div>
        </div>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <>
      <section className="serviceStrip" aria-label="Shopping benefits">
        <div><strong>#1</strong><span>Best sellers<small>On Amazon & Flipkart</small></span></div>
        <div><strong>↩</strong><span>Easy returns<small>Simple replacement support</small></span></div>
        <div><strong>↗</strong><span>Fast shipping<small>Estimated 1–3 working days</small></span></div>
        <div><strong>✓</strong><span>Secure payments<small>Safe and fast checkout</small></span></div>
      </section>
      <footer className="completeFooter">
        <div className="footerLead">
          <a className="logo" href="/"><img src="/brand/vgr-logo-official.png" alt="VGR Voyager" /></a>
          <p>Professional grooming technology for every version of you.</p>
          <div className="socialLinks">
            <a href="https://www.instagram.com/vgrofficial.in/?hl=en">Instagram</a>
            <a href="https://www.youtube.com/channel/UCqj-oy1d6GfD-SejpChtWQA">YouTube</a>
            <a href="https://www.facebook.com/vgrofficial.in">Facebook</a>
          </div>
        </div>
        <div className="footerColumn">
          <h3>Shop</h3>
          <a href="/collections/category-men">Men</a>
          <a href="/collections/category-women">Women</a>
          <a href="/collections/vgr-professional-use-tools">Professional</a>
          <a href="/collections/pet-grooming-tools">Pet grooming</a>
          <a href="/collections/lint-remover">Fabric care</a>
        </div>
        <div className="footerColumn">
          <h3>Customer services</h3>
          <a href="/pages/track-order">Track your order</a>
          <a href="/pages/vgr-warranty-policy">Warranty policy</a>
          <a href="/pages/vgr-warranty-registration">Register warranty</a>
          <a href="/pages/contact">Contact us</a>
          <a href="/pages/e-catalog">E-catalogue</a>
        </div>
        <div className="footerColumn">
          <h3>VGR</h3>
          <a href="/pages/about-us">About us</a>
          <a href="/pages/careers">Careers</a>
          <a href="/pages/collab">Community</a>
          <a href="/blogs/news">Blog & news</a>
          <a href="/policies/privacy-policy">Privacy policy</a>
        </div>
        <div className="footerColumn footerContact">
          <h3>Customer care</h3>
          <a href="mailto:customercare@vgrofficial.in">customercare@vgrofficial.in</a>
          <a href="tel:18002578939">1800 257 8939</a>
          <a href="tel:01171366411">011-71366411</a>
          <p>Mon–Sat, 10am–6pm</p>
        </div>
        <div className="footerBottom">
          <span>© 2026 VGR India Official Private Limited</span>
          <nav>
            <a href="/policies/shipping-policy">Shipping</a>
            <a href="/policies/refund-policy">Returns</a>
            <a href="/policies/terms-of-service">Terms</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const saving = Math.max(0, Math.round((1 - product.price / product.oldPrice) * 100));
  return (
    <article className="catalogProduct">
      <a className="catalogVisual" href={`/products/${product.slug}`}>
        <span className="catalogBadge">{product.badge}</span>
        <span className="saving">Save {saving}%</span>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      </a>
      <div className="catalogInfo">
        <p>{product.category}</p>
        <a href={`/products/${product.slug}`}><h3>{product.name}</h3></a>
        <div className="catalogRating"><span>★ {product.rating.toFixed(1)}</span><small>Verified</small></div>
        <div className="catalogPrice"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.oldPrice)}</del></div>
        <button onClick={() => onAdd(product)}>Quick add +</button>
      </div>
    </article>
  );
}

function ProductGrid({ items, onAdded }: { items: Product[]; onAdded?: (product: Product) => void }) {
  const { addItem } = useVgrCart();
  const add = (product: Product) => {
    addItem(product);
    onAdded?.(product);
  };
  return <div className="catalogGrid">{items.map((product) => <ProductCard key={product.slug} product={product} onAdd={add} />)}</div>;
}

function PageFrame({ children }: { children: React.ReactNode }) {
  return (
    <main className="completeStore">
      <SiteHeader />
      {children}
      <SiteFooter />
    </main>
  );
}

function CollectionPage({ slug }: { slug: string }) {
  const meta = collectionMeta[slug] || collectionMeta.all;
  const base = useMemo(() => productsForCollection(slug), [slug]);
  const [sort, setSort] = useState("featured");
  const [audience, setAudience] = useState("all");
  const [toast, setToast] = useState("");

  const shown = useMemo(() => {
    const filtered = audience === "all" ? [...base] : base.filter((product) => product.audience === audience);
    if (sort === "low") filtered.sort((a, b) => a.price - b.price);
    if (sort === "high") filtered.sort((a, b) => b.price - a.price);
    if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);
    return filtered;
  }, [audience, base, sort]);

  const added = (product: Product) => {
    setToast(`${product.shortName} added to your bag`);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <PageFrame>
      <section className="collectionHero">
        <p>{meta.eyebrow}</p>
        <h1>{meta.title}</h1>
        <span>{meta.description}</span>
      </section>
      <section className="catalogShell">
        <div className="categoryRail" aria-label="Product categories">
          <a href="/collections/hair-trimmer">Trimmers</a>
          <a href="/collections/clipper">Clippers</a>
          <a href="/collections/hair-dryer">Hair dryers</a>
          <a href="/collections/hair-volumizer">Volumizers</a>
          <a href="/collections/pet-grooming-tools">Pet</a>
          <a href="/collections/lint-remover">Fabric care</a>
        </div>
        <div className="catalogToolbar">
          <div className="audienceFilters" aria-label="Filter products">
            {["all", "men", "women", "professional", "pet", "utility"].map((value) => (
              <button key={value} className={audience === value ? "active" : ""} onClick={() => setAudience(value)}>
                {value === "all" ? "All" : value}
              </button>
            ))}
          </div>
          <label>
            Sort by
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="rating">Best rated</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
            </select>
          </label>
        </div>
        <div className="resultsMeta">{shown.length} products</div>
        {shown.length ? <ProductGrid items={shown} onAdded={added} /> : <EmptyState title="No products in this filter" />}
      </section>
      {toast && <div className="toast" role="status">{toast}</div>}
    </PageFrame>
  );
}

function ProductPage({ slug }: { slug: string }) {
  const product = productBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [activeInfo, setActiveInfo] = useState("details");
  const [toast, setToast] = useState("");
  const { addItem } = useVgrCart();

  if (!product) return <NotFoundPage />;

  const recommendations = products
    .filter((item) => item.slug !== product.slug && (item.audience === product.audience || item.category === product.category))
    .slice(0, 4);
  const saving = Math.round((1 - product.price / product.oldPrice) * 100);

  const add = () => {
    addItem(product, quantity);
    setToast(`${quantity} × ${product.shortName} added to your bag`);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <PageFrame>
      <div className="breadcrumbs"><a href="/">Home</a><span>/</span><a href={`/collections/${product.groups[0]}`}>{product.category}</a><span>/</span><b>{product.shortName}</b></div>
      <section className="pdp">
        <div className="pdpGallery">
          <div className="pdpThumbs" aria-label="Product gallery">
            {[0, 1, 2, 3].map((item) => (
              <button key={item} aria-label={`View product image ${item + 1}`}>
                <img src={product.image} alt="" />
              </button>
            ))}
          </div>
          <div className="pdpMainImage">
            <span>{product.badge}</span>
            <img src={product.image} alt={product.name} />
            <small>Hover to explore detail</small>
          </div>
        </div>
        <div className="pdpInfo">
          <p className="pdpEyebrow">{product.category} / VGR official</p>
          <h1>{product.name}</h1>
          <div className="pdpRating"><strong>{product.rating.toFixed(1)} ★★★★★</strong><a href="#reviews">Verified ratings</a></div>
          <div className="featureChips">{product.features.map((feature) => <span key={feature}>{feature}</span>)}</div>
          <div className="pdpPrice">
            <strong>{formatPrice(product.price)}</strong>
            <del>{formatPrice(product.oldPrice)}</del>
            <span>Save {saving}%</span>
          </div>
          <p className="tax">Tax included. Free delivery on prepaid orders.</p>
          <div className="deliveryNote"><b>▣</b><span><strong>Fast, complimentary delivery</strong><small>Estimated dispatch within 1–3 working days</small></span></div>
          <h2>Active offers</h2>
          <div className="offerCards">
            <div><span>Most popular</span><strong>Get 5% instant off</strong><small>Use code VGR5</small></div>
            <div><span>Prepaid off</span><strong>5% extra on prepaid</strong><small>Auto-applied at checkout</small></div>
          </div>
          <div className="buyRow">
            <div className="quantity" aria-label="Quantity selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="addBag" onClick={add}>Add to bag</button>
          </div>
          <button className="buyNow" onClick={() => { add(); window.location.href = "/cart"; }}>Buy now</button>
          <div className="paymentTrust"><span>✓ 2-year warranty</span><span>↩ 7-day returns</span><span>◈ Secure payment</span></div>
        </div>
      </section>
      <section className="pdpDetails">
        <div className="detailNav">
          {["details", "technology", "delivery", "care"].map((key) => (
            <button key={key} className={activeInfo === key ? "active" : ""} onClick={() => setActiveInfo(key)}>
              {key}
            </button>
          ))}
        </div>
        <div className="detailContent">
          {activeInfo === "details" && <><p>Product information</p><h2>Designed to perform.<br />Built to last.</h2><span>{product.description}</span></>}
          {activeInfo === "technology" && <><p>VGR engineering</p><h2>Power with precision.</h2><span>{product.features.join(". ")}. Every control is designed for easy, repeatable grooming.</span></>}
          {activeInfo === "delivery" && <><p>Delivery & returns</p><h2>Fast from VGR India.</h2><span>Orders are dispatched within 1–3 working days. Eligible products can be returned or replaced within seven days of delivery.</span></>}
          {activeInfo === "care" && <><p>Product care</p><h2>Keep the performance.</h2><span>Clean attachments after use, store the product dry and use only the supplied cable or adaptor for charging.</span></>}
        </div>
        <div className="detailVisual"><img src={product.image} alt="" loading="lazy" decoding="async" /></div>
      </section>
      <section className="recommendations">
        <header><p>You may also like</p><h2>Complete your edit</h2></header>
        <ProductGrid items={recommendations} onAdded={(item) => { setToast(`${item.shortName} added to your bag`); window.setTimeout(() => setToast(""), 1800); }} />
      </section>
      <section className="reviews" id="reviews">
        <div><strong>{product.rating.toFixed(1)}</strong><span>★★★★★<small>Verified VGR customers</small></span></div>
        <blockquote>“Professional quality, strong performance and a finish that feels genuinely premium.”<footer>— Verified buyer</footer></blockquote>
      </section>
      {toast && <div className="toast" role="status">{toast}</div>}
    </PageFrame>
  );
}

function SearchPage() {
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const results = query.trim()
    ? products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()))
    : products.slice(0, 8);

  return (
    <PageFrame>
      <section className="utilityHero"><p>Find your tool</p><h1>Search VGR</h1></section>
      <section className="searchPage">
        <label htmlFor="store-search">Search products and categories</label>
        <div className="searchField"><span>⌕</span><input id="store-search" type="search" inputMode="search" enterKeyHint="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “trimmer”, “hair dryer” or “pet”" autoFocus /></div>
        <p>{results.length} {query ? "matching" : "featured"} products</p>
        <ProductGrid items={results} onAdded={(product) => { setToast(`${product.shortName} added to your bag`); window.setTimeout(() => setToast(""), 1800); }} />
      </section>
      {toast && <div className="toast" role="status">{toast}</div>}
    </PageFrame>
  );
}

function CartPage() {
  const { lines, subtotal, changeItem, removeItem, clearCart } = useVgrCart();
  const [notice, setNotice] = useState("");

  const checkout = () => {
    setNotice("Checkout is ready for Shopify integration.");
    window.setTimeout(() => setNotice(""), 2200);
  };

  return (
    <PageFrame>
      <section className="utilityHero"><p>Your selection</p><h1>Shopping bag</h1></section>
      <section className="cartPage">
        {!lines.length ? (
          <EmptyState title="Your bag is waiting" copy="Explore the complete VGR edit and add the tools that fit your routine." action="/collections/all" />
        ) : (
          <div className="cartLayout">
            <div className="cartLines">
              {lines.map(({ product, quantity }) => (
                <article key={product.slug} className="cartLine">
                  <a href={`/products/${product.slug}`}><img src={product.image} alt={product.name} /></a>
                  <div><p>{product.category}</p><a href={`/products/${product.slug}`}><h2>{product.shortName}</h2></a><button onClick={() => removeItem(product.slug)}>Remove</button></div>
                  <div className="quantity">
                    <button onClick={() => changeItem(product.slug, quantity - 1)} aria-label={`Decrease ${product.shortName}`}>−</button>
                    <span>{quantity}</span>
                    <button onClick={() => changeItem(product.slug, quantity + 1)} aria-label={`Increase ${product.shortName}`}>+</button>
                  </div>
                  <strong>{formatPrice(product.price * quantity)}</strong>
                </article>
              ))}
              <button className="clearCart" onClick={clearCart}>Clear bag</button>
            </div>
            <aside className="cartSummary">
              <p>Order summary</p>
              <div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div>
              <div><span>Delivery</span><strong>Complimentary</strong></div>
              <div className="total"><span>Total</span><strong>{formatPrice(subtotal)}</strong></div>
              <button onClick={checkout}>Secure checkout →</button>
              <small>Taxes included. Final discounts are calculated at checkout.</small>
            </aside>
          </div>
        )}
      </section>
      {notice && <div className="toast" role="status">{notice}</div>}
    </PageFrame>
  );
}

function AccountPage() {
  const [notice, setNotice] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setNotice("Account access is ready for Shopify customer login.");
    window.setTimeout(() => setNotice(""), 2200);
  };
  return (
    <PageFrame>
      <section className="accountPage">
        <div><p>The VGR circle</p><h1>Welcome back.</h1><span>Track orders, manage warranties and keep your grooming edit in one place.</span></div>
        <form onSubmit={submit}>
          <h2>Sign in</h2>
          <label htmlFor="account-email">Email address</label>
          <input id="account-email" type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" required />
          <label htmlFor="account-password">Password</label>
          <input id="account-password" type="password" autoComplete="current-password" placeholder="••••••••" required />
          <button>Continue</button>
          <a href="/pages/contact">Need help accessing your account?</a>
        </form>
      </section>
      {notice && <div className="toast" role="status">{notice}</div>}
    </PageFrame>
  );
}

const policyContent: Record<string, { title: string; eyebrow: string; intro: string; sections: { heading: string; copy: string }[] }> = {
  "privacy-policy": {
    title: "Privacy policy",
    eyebrow: "Your information",
    intro: "VGR respects your privacy and handles personal information responsibly across browsing, ordering and support.",
    sections: [
      { heading: "Information we collect", copy: "We may collect contact, order, payment-status and browsing information required to serve your request and improve the store." },
      { heading: "How it is used", copy: "Information is used to process orders, provide customer service, prevent misuse and communicate service or product updates." },
      { heading: "Your choices", copy: "You may request access, correction or deletion of eligible personal data by contacting VGR customer care." },
    ],
  },
  "shipping-policy": {
    title: "Shipping policy",
    eyebrow: "Fast delivery",
    intro: "Orders are normally processed promptly and delivered across serviceable locations in India.",
    sections: [
      { heading: "Dispatch", copy: "Most orders are dispatched within one to three working days after successful payment or order verification." },
      { heading: "Tracking", copy: "Tracking details are shared after dispatch. Delivery timing can vary by location, service availability and public holidays." },
      { heading: "Support", copy: "If an order appears delayed, contact customer care with the order number for a status check." },
    ],
  },
  "refund-policy": {
    title: "Refund & return policy",
    eyebrow: "Easy support",
    intro: "Eligible VGR purchases can be supported through a straightforward return or replacement process.",
    sections: [
      { heading: "Eligibility", copy: "Report a damaged, incorrect or eligible return request within seven days of delivery with the original packaging and proof of purchase." },
      { heading: "Assessment", copy: "VGR support may request clear product images or video to assess the condition and determine the correct resolution." },
      { heading: "Refund timing", copy: "Approved refunds are returned to the original payment method after the returned product is received and verified." },
    ],
  },
  "terms-of-service": {
    title: "Terms of service",
    eyebrow: "Store terms",
    intro: "These terms govern use of the VGR India website, product information, ordering and customer services.",
    sections: [
      { heading: "Store use", copy: "Use the website lawfully and provide accurate information when placing an order, requesting support or registering a warranty." },
      { heading: "Products & pricing", copy: "Availability, offers, specifications and pricing may be updated. Confirmed order details govern each completed purchase." },
      { heading: "Liability", copy: "Use products according to the supplied instructions and safety information. Statutory consumer rights remain unaffected." },
    ],
  },
  "contact-information": {
    title: "Contact information",
    eyebrow: "VGR customer care",
    intro: "Our support team is available Monday to Saturday, 10am to 6pm, excluding national holidays.",
    sections: [
      { heading: "Customer care", copy: "Email customercare@vgrofficial.in or call 1800 257 8939, 011-71366411 or +91 9667796740." },
      { heading: "Wholesale", copy: "For wholesale and bulk enquiries, contact Mr. Sudhir Rastogi at +91 9667796741." },
      { heading: "Company", copy: "This store is owned by VGR India Official Private Limited." },
    ],
  },
};

function PolicyPage({ slug }: { slug: string }) {
  const content = policyContent[slug] || policyContent["contact-information"];
  return (
    <PageFrame>
      <section className="contentHero"><p>{content.eyebrow}</p><h1>{content.title}</h1><span>{content.intro}</span></section>
      <article className="policyPage">
        {content.sections.map((section, index) => <section key={section.heading}><span>0{index + 1}</span><div><h2>{section.heading}</h2><p>{section.copy}</p></div></section>)}
        <p className="policyNote">For the latest order-specific guidance, contact VGR customer care with your order details.</p>
      </article>
    </PageFrame>
  );
}

function AboutPage() {
  return (
    <PageFrame>
      <section className="aboutHero">
        <div><p>About VGR</p><h1>Precision for every expression.</h1><span>A global personal-grooming brand built around innovation, quality and accessible professional performance.</span></div>
        <img src="/brand/editorial-women.png" alt="VGR professional grooming" decoding="async" />
      </section>
      <section className="aboutIntro">
        <span>Company profile</span>
        <h2>Technology, craftsmanship and confidence—since 2016.</h2>
        <p>VGR creates trimmers, clippers, shavers, hair dryers, straighteners, curlers, hot-air brushes and specialist personal-care tools. Every range is designed to make professional grooming more dependable, intuitive and accessible.</p>
      </section>
      <section className="aboutStats">
        <div><strong>300+</strong><span>Grooming tools</span></div>
        <div><strong>Global</strong><span>Brand presence</span></div>
        <div><strong>ISO 9001</strong><span>Quality system</span></div>
        <div><strong>2016</strong><span>VGR founded</span></div>
      </section>
      <section className="aboutValues">
        <header><p>Why choose VGR</p><h2>Built around the way you groom.</h2></header>
        <div>
          <article><span>01</span><h3>Premium quality</h3><p>Thoughtful materials, modern styling and controlled manufacturing.</p></article>
          <article><span>02</span><h3>Pro performance</h3><p>Motors, blades and heat systems designed to deliver repeatable results.</p></article>
          <article><span>03</span><h3>Easy to use</h3><p>Ergonomic forms and clear controls make every tool feel intuitive.</p></article>
          <article><span>04</span><h3>Dependable support</h3><p>Warranty and customer care support continue after your purchase.</p></article>
        </div>
      </section>
      <section className="leadership">
        <p>Leadership</p>
        <h2>The people behind VGR India</h2>
        <div><article><span>Founder & CEO</span><h3>Mr. Kumar Gaurav</h3></article><article><span>Operations Head & CFO</span><h3>Mr. Sumit Wadhwa</h3></article><article><span>Sales Manager</span><h3>Mr. Sudhir Rastogi</h3></article><article><span>Marketing Manager</span><h3>Mr. Hrithik Sharma</h3></article></div>
      </section>
    </PageFrame>
  );
}

const pageMeta: Record<string, { eyebrow: string; title: string; intro: string; form?: "contact" | "warranty" | "track" }> = {
  contact: { eyebrow: "Customer care", title: "How can we help?", intro: "Contact VGR for product guidance, order support, warranty assistance or business enquiries.", form: "contact" },
  "vgr-warranty-policy": { eyebrow: "Protected performance", title: "Warranty policy", intro: "VGR products include warranty support against eligible manufacturing defects. Keep your invoice and register the product for a faster claim experience." },
  "vgr-warranty-registration": { eyebrow: "Register your VGR", title: "Warranty registration", intro: "Register your product details and purchase information to simplify future warranty support.", form: "warranty" },
  "track-order": { eyebrow: "Order support", title: "Track your order", intro: "Enter your order number and registered email or mobile number to check dispatch and delivery progress.", form: "track" },
  "e-catalog": { eyebrow: "The full range", title: "VGR e-catalogue", intro: "Explore grooming tools for men, women, professionals, pets and everyday fabric care—all in one curated destination." },
  careers: { eyebrow: "Work with VGR", title: "Careers", intro: "Join a fast-moving grooming and personal-care brand shaping modern performance, design and customer experience." },
  collab: { eyebrow: "VGR community", title: "Collaborate with us", intro: "Creators, barbers, stylists, educators and grooming professionals can build meaningful work with VGR." },
};

function GeneralPage({ slug }: { slug: string }) {
  if (slug === "about-us") return <AboutPage />;
  const meta = pageMeta[slug] || pageMeta.contact;
  const [notice, setNotice] = useState("");
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setNotice("Thank you. Your request has been captured for VGR.");
    window.setTimeout(() => setNotice(""), 2400);
  };
  return (
    <PageFrame>
      <section className="contentHero"><p>{meta.eyebrow}</p><h1>{meta.title}</h1><span>{meta.intro}</span></section>
      {meta.form ? (
        <section className="supportLayout">
          <div className="supportDetails">
            <p>Direct support</p>
            <h2>VGR Customer Care</h2>
            <a href="mailto:customercare@vgrofficial.in">customercare@vgrofficial.in</a>
            <a href="tel:18002578939">1800 257 8939</a>
            <span>Monday–Saturday · 10am–6pm</span>
          </div>
          <form className="supportForm" onSubmit={submit}>
            <label htmlFor="support-name">Full name</label><input id="support-name" autoComplete="name" required />
            <label htmlFor="support-email">Email address</label><input id="support-email" type="email" inputMode="email" autoComplete="email" required />
            {meta.form === "track" && <><label htmlFor="support-order">Order number</label><input id="support-order" autoComplete="off" required placeholder="VGR-000000" /></>}
            {meta.form === "warranty" && <><label htmlFor="support-model">Product model</label><input id="support-model" required placeholder="For example, V-071" /><label htmlFor="support-date">Purchase date</label><input id="support-date" type="date" required /></>}
            {meta.form === "contact" && <><label htmlFor="support-topic">How can we help?</label><select id="support-topic"><option>Product guidance</option><option>Order support</option><option>Warranty support</option><option>Wholesale enquiry</option></select><label htmlFor="support-message">Message</label><textarea id="support-message" rows={5} required /></>}
            <button>{meta.form === "track" ? "Track order" : "Submit request"} →</button>
          </form>
        </section>
      ) : (
        <section className="editorialPage">
          <article><span>01</span><h2>Built for growth</h2><p>VGR combines product innovation, wide distribution and a strong customer-first operating culture.</p></article>
          <article><span>02</span><h2>Work with impact</h2><p>Build across product, sales, design, operations, content and customer experience.</p></article>
          <article><span>03</span><h2>Start a conversation</h2><p>Share your profile, collaboration idea or business proposal with the VGR team.</p><a href="/pages/contact">Contact VGR →</a></article>
        </section>
      )}
      {slug === "e-catalog" && <section className="recommendations"><header><p>Catalogue highlights</p><h2>Explore the range</h2></header><ProductGrid items={products.slice(0, 8)} /></section>}
      {notice && <div className="toast" role="status">{notice}</div>}
    </PageFrame>
  );
}

function BlogPage() {
  const articles = [
    { number: "01", title: "How to choose the right trimmer", category: "Men’s grooming", image: products[0].image },
    { number: "02", title: "Volume without heat damage", category: "Hair styling", image: products[17].image },
    { number: "03", title: "The professional fade toolkit", category: "Barber series", image: products[9].image },
    { number: "04", title: "A calmer pet-grooming routine", category: "Pet care", image: products[25].image },
    { number: "05", title: "Keep fabrics looking new", category: "Fabric care", image: products[29].image },
    { number: "06", title: "Five-minute everyday styling", category: "VGR guide", image: products[18].image },
  ];
  return (
    <PageFrame>
      <section className="contentHero"><p>The VGR journal</p><h1>Technique is everything.</h1><span>Grooming education, product guidance and professional inspiration from VGR.</span></section>
      <section className="blogGrid">{articles.map((article) => <article key={article.number}><div><img src={article.image} alt="" loading="lazy" decoding="async" /><span>{article.number}</span></div><p>{article.category}</p><h2>{article.title}</h2><a href="/blogs/news">Read the story →</a></article>)}</section>
    </PageFrame>
  );
}

function EmptyState({ title, copy = "Try another category or explore all VGR products.", action = "/collections/all" }: { title: string; copy?: string; action?: string }) {
  return <div className="emptyState"><span>VGR</span><h2>{title}</h2><p>{copy}</p><a href={action}>Explore all products →</a></div>;
}

function NotFoundPage() {
  return (
    <PageFrame>
      <section className="notFound"><span>404</span><h1>This edit has moved.</h1><p>Return to the full VGR collection and continue exploring.</p><a href="/collections/all">Shop all VGR →</a></section>
    </PageFrame>
  );
}

export function CompleteStore({ pathname }: { pathname: string }) {
  const clean = pathname.split("?")[0].replace(/\/+$/, "") || "/";
  const parts = clean.split("/").filter(Boolean);
  if (parts[0] === "collections") return <CollectionPage slug={parts[1] || "all"} />;
  if (parts[0] === "products") return <ProductPage slug={parts[1] || ""} />;
  if (parts[0] === "pages") return <GeneralPage slug={parts[1] || "about-us"} />;
  if (parts[0] === "policies") return <PolicyPage slug={parts[1] || "contact-information"} />;
  if (parts[0] === "search") return <SearchPage />;
  if (parts[0] === "cart") return <CartPage />;
  if (parts[0] === "account") return <AccountPage />;
  if (parts[0] === "blogs") return <BlogPage />;
  return <NotFoundPage />;
}
