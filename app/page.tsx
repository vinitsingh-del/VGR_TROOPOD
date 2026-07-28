"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useVgrCart } from "./store-components";
import { formatPrice, productBySlug, type Product } from "./store-data";

const signatureProducts = [
  { slug: "rosso-professional-beard-moustache-trimmer", name: "Rosso Professional Trimmer", category: "The Men's Edit", audience: "men", price: "₹1,599", old: "₹2,499", image: "/products/rosso.webp", tone: "wine", badge: "Icon" },
  { slug: "vgr-v-492-hot-air-brush-black", name: "V-492 Hot Air Brush", category: "The Women's Edit", audience: "women", price: "₹2,299", old: "₹2,999", image: "/products/hot-air-brush.webp", tone: "blush", badge: "New" },
  { slug: "vgr-v-640hd-professional-hair-dryer-barber-series", name: "V-640HD Pro Hair Dryer", category: "The Pro Edit", audience: "pro", price: "₹7,499", old: "₹13,499", image: "/brand/hair-dryer.jpg", tone: "black", badge: "Salon" },
  { slug: "vgr-v-583-automatic-hair-curler", name: "Automatic Hair Curler", category: "Everyday Icons", audience: "women", price: "₹3,799", old: "₹5,199", image: "/brand/hair-curler.webp", tone: "cream", badge: "Loved" },
];

const selectProducts = (slugs: string[]) =>
  slugs.map((slug) => productBySlug(slug)).filter((product): product is Product => Boolean(product));

const limitedProducts = selectProducts([
  "vgr-mr-super-power-stepless-pro-4-in-1-barber",
  "rosso-professional-beard-moustache-trimmer",
  "vgr-v-640hd-professional-hair-dryer-barber-series",
  "vgr-v-583-automatic-hair-curler",
]);

const personalProducts = selectProducts([
  "vgr-v-071-hair-trimmer-for-men-silver",
  "vgr-v-937-hair-trimmer-for-men-black",
  "vgr-v-290-hair-trimmer-for-men-gold",
  "vgr-v-932-pocket-hair-trimmer-for-men-black",
]);

const dryerProducts = selectProducts([
  "vgr-v-640hd-professional-hair-dryer-barber-series",
  "vgr-v-445-professional-bldc-hair-dryer",
  "vgr-v-469-professional-hair-dryer",
  "vgr-v-421-hair-dryer-unisex-green",
]);

const bestSellerProducts = selectProducts([
  "vgr-v-071-hair-trimmer-for-men-silver",
  "vgr-v-937-hair-trimmer-for-men-black",
  "vgr-v-583-automatic-hair-curler",
]);

const bestSellerConcerns: Record<string, string> = {
  "vgr-v-071-hair-trimmer-for-men-silver": "Beard shaping & precise hairline detailing",
  "vgr-v-937-hair-trimmer-for-men-black": "Everyday trimming with travel-ready control",
  "vgr-v-583-automatic-hair-curler": "Fast, consistent curls with anti-tangle styling",
};

const categories = [
  { title: "Men’s Grooming", copy: "Precision for every line", href: "/collections/category-men", image: productBySlug("vgr-v-071-hair-trimmer-for-men-silver")?.image },
  { title: "Women’s Grooming", copy: "Shape, smooth and shine", href: "/collections/category-women", image: productBySlug("vgr-v-583-automatic-hair-curler")?.image },
  { title: "Professional Grooming", copy: "Salon power without compromise", href: "/collections/vgr-professional-use-tools", image: productBySlug("vgr-mr-super-power-stepless-pro-4-in-1-barber")?.image },
  { title: "Pet’s Grooming", copy: "Quiet, confident care", href: "/collections/pet-grooming-tools", image: productBySlug("vgr-v-208-professional-pet-hair-clipper")?.image },
  { title: "Baby Care", copy: "Gentle tools for little ones", href: "https://vgrofficial.in/collections/baby", image: "https://vgrofficial.in/cdn/shop/files/AnyConv.com__2.0-24-700x700-1_4a0d8f38-25af-4a88-b8bd-d0c10859c76f_1.webp?v=1740977051&width=700" },
  { title: "Lifestyle Essentials", copy: "Care for the things you wear", href: "/collections/lint-remover", image: productBySlug("vgr-v-818-professional-lint-remover-lint-roller-green")?.image },
];

const heroSlides = [
  { type: "video", label: "VGR performance film" },
  { type: "editorial", label: "For every version of you" },
  { type: "image", label: "Rosso professional series", image: "https://vgrofficial.in/cdn/shop/files/p8ua4c8ywkihlerdrhgq.webp?v=1761639395&width=1500" },
  { type: "image", label: "Professional barber series", image: "https://vgrofficial.in/cdn/shop/files/WhatsApp_Image_2025-12-19_at_11.02.24_AM.jpg?v=1768494346&width=1500" },
];

const totalRange = [
  ["Trimmers", "/collections/hair-trimmer"],
  ["Clippers", "/collections/clipper"],
  ["Shavers", "/collections/shaver"],
  ["Hair Dryers", "/collections/hair-dryer"],
  ["Straighteners", "/collections/hair-straightener"],
  ["Curlers", "/collections/womens-grooming-tools"],
  ["Volumizers", "/collections/hair-volumizer"],
  ["Epilators", "/collections/category-women"],
  ["Pet Clippers", "/collections/pet-grooming-tools"],
  ["Baby Clippers", "https://vgrofficial.in/collections/baby"],
  ["Lint Removers", "/collections/lint-remover"],
];

function HomeProductShelf({ items, onAdd }: { items: Product[]; onAdd: (product: Product) => void }) {
  return (
    <div className="homeProductShelf">
      {items.map((product) => {
        const saving = Math.max(0, Math.round((1 - product.price / product.oldPrice) * 100));
        return (
          <article className="homeShelfProduct" key={product.slug}>
            <a className="homeShelfVisual" href={`/products/${product.slug}`}>
              <span className="homeShelfBadge">{product.badge}</span>
              <span className="homeShelfSaving">Save {saving}%</span>
              <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
            </a>
            <p>{product.category}</p>
            <a href={`/products/${product.slug}`}><h3>{product.name}</h3></a>
            <div><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.oldPrice)}</del><span>★ {product.rating.toFixed(1)}</span></div>
            <button onClick={() => onAdd(product)}>Add to bag +</button>
          </article>
        );
      })}
    </div>
  );
}

function HomeBestSellerCard({ product, onAdd }: { product: Product; onAdd: (product: Product) => void }) {
  const saving = Math.max(0, Math.round((1 - product.price / product.oldPrice) * 100));
  return (
    <article className="bestSellerCard">
      <a className="bestSellerVisual" href={`/products/${product.slug}`}>
        <span className="bestSellerBadge">Bestseller</span>
        <span className="bestSellerSaving">Save {saving}%</span>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
      </a>
      <div className="bestSellerInfo">
        <p>{product.category}</p>
        <a href={`/products/${product.slug}`}><h3>{product.name}</h3></a>
        <span className="bestSellerConcern"><b>Concern</b>{bestSellerConcerns[product.slug]}</span>
        <div className="bestSellerRating"><span>★ {product.rating.toFixed(1)}</span><a href={`/products/${product.slug}`}>Customer reviews →</a></div>
        <div className="bestSellerPrice"><strong>{formatPrice(product.price)}</strong><del>{formatPrice(product.oldPrice)}</del></div>
        <div className="dispatchBar"><span>Fast dispatch</span><b>Estimated 1–3 working days</b></div>
        <button onClick={() => onAdd(product)}>Add to cart +</button>
      </div>
    </article>
  );
}

function HomeFooter() {
  return (
    <>
      <section className="serviceStrip" aria-label="Shopping benefits">
        <div><strong>#1</strong><span>Bestsellers<small>Available on leading marketplaces</small></span></div>
        <div><strong>↩</strong><span>Easy support<small>Returns and replacement guidance</small></span></div>
        <div><strong>↗</strong><span>Fast shipping<small>Estimated 1–3 working days</small></span></div>
        <div><strong>✓</strong><span>Secure payments<small>Safe and fast checkout</small></span></div>
      </section>
      <footer className="completeFooter homeCompleteFooter">
        <div className="footerLead">
          <a className="logo" href="#top"><img src="/brand/vgr-logo-official.png" alt="VGR Voyager" /></a>
          <p>Professional grooming technology for every version of you.</p>
          <form className="footerSignup" onSubmit={(event) => event.preventDefault()}>
            <label className="srOnly" htmlFor="footer-email">Email address</label>
            <input id="footer-email" type="email" inputMode="email" autoComplete="email" placeholder="Email for launches & offers" />
            <button>Join →</button>
          </form>
          <div className="socialLinks">
            <a href="https://www.instagram.com/vgrofficial.in/?hl=en">Instagram</a>
            <a href="https://www.youtube.com/channel/UCqj-oy1d6GfD-SejpChtWQA">YouTube</a>
            <a href="https://www.facebook.com/vgrofficial.in">Facebook</a>
          </div>
        </div>
        <div className="footerColumn">
          <h3>Shop</h3>
          <a href="/collections/category-men">Men’s grooming</a>
          <a href="/collections/category-women">Women’s grooming</a>
          <a href="/collections/vgr-professional-use-tools">Professional</a>
          <a href="/collections/pet-grooming-tools">Pet grooming</a>
          <a href="https://vgrofficial.in/collections/baby">Baby care</a>
          <a href="/collections/lint-remover">Lifestyle essentials</a>
        </div>
        <div className="footerColumn">
          <h3>Customer service</h3>
          <a href="/pages/track-order">Track your order</a>
          <a href="/pages/vgr-warranty-policy">Warranty policy</a>
          <a href="/pages/vgr-warranty-registration">Register warranty</a>
          <a href="/pages/contact">Contact us</a>
          <a href="/pages/e-catalog">E-catalogue</a>
        </div>
        <div className="footerColumn">
          <h3>Discover VGR</h3>
          <a href="/pages/about-us">About us</a>
          <a href="/blogs/news">Blog & news</a>
          <a href="/pages/collab">Events & collaborations</a>
          <a href="/pages/contact">Our store</a>
          <a href="/pages/careers">Careers</a>
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
            <a href="/policies/privacy-policy">Privacy</a>
            <a href="/policies/terms-of-service">Terms</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [signatureTab, setSignatureTab] = useState("all");
  const [heroSlide, setHeroSlide] = useState(0);
  const [signupOpen, setSignupOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { count: cart, addItem } = useVgrCart();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setHeroSlide((slide) => (slide + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSignupOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const add = (product: { slug: string; name: string }) => {
    addItem(product);
    setToast(`${product.name} added to your edit`);
    window.setTimeout(() => setToast(""), 1800);
  };

  const shownSignatures = signatureTab === "all"
    ? signatureProducts
    : signatureProducts.filter((product) => product.audience === signatureTab);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    window.location.href = `${base}/search?q=${encodeURIComponent(query)}`;
  };

  return (
    <main>
      <div className="offerBar">Complimentary delivery above ₹499 <span>•</span> 2-year warranty <span>•</span> 7-day returns</div>
      <header className="header homeHeader">
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">☰</button>
        <a className="logo" href="#top" aria-label="VGR Voyager home"><img src="/brand/vgr-logo-official.png" alt="VGR Voyager" /></a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#bestsellers" onClick={() => setMenu(false)}>Bestseller</a>
          <a href="/collections/new-arrival" onClick={() => setMenu(false)}>New Arrival</a>
          <a href="/collections/category-men" onClick={() => setMenu(false)}>Men’s Grooming</a>
          <a href="/collections/category-women" onClick={() => setMenu(false)}>Women’s Grooming</a>
          <a href="/collections/vgr-professional-use-tools" onClick={() => setMenu(false)}>Professional</a>
          <a href="/collections/pet-grooming-tools" onClick={() => setMenu(false)}>Pet’s Grooming</a>
          <a href="https://vgrofficial.in/collections/baby" onClick={() => setMenu(false)}>Baby Care</a>
          <a href="/collections/lint-remover" onClick={() => setMenu(false)}>Lifestyle Essentials</a>
          <details className="budgetNav">
            <summary>Shop By Budget</summary>
            <div>
              <a href="/collections/under-1000-models">Under ₹800</a>
              <a href="/collections/under-1000-models">Under ₹1,000</a>
              <a href="/collections/product-under-1500">Under ₹1,500</a>
              <a href="/collections/product-under-2000">Under ₹2,000</a>
              <a href="/collections/product-under-2500">Under ₹2,500</a>
            </div>
          </details>
          <a href="#offers" onClick={() => setMenu(false)}>Offers & Deals</a>
        </nav>
        <div className="actions">
          <form className="homeSearchForm" role="search" onSubmit={submitSearch}>
            <label className="srOnly" htmlFor="home-search">Search VGR products</label>
            <input id="home-search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search products" />
            <button aria-label="Submit search">⌕</button>
          </form>
          <a className="mobileSearch" href="/search" aria-label="Search">⌕</a>
          <a className="accountLink" href="/account" aria-label="Account">Account</a>
          <a className="bag" href="/cart" aria-label={`My cart with ${cart} items`}>My Cart <b>{cart}</b></a>
        </div>
      </header>

      <section className="hero heroSlider" id="top" aria-roledescription="carousel" aria-label="VGR featured campaigns">
        <div className="heroSlides">
          {heroSlides.map((slide, index) => (
            <div className={`heroSlide ${slide.type} ${heroSlide === index ? "active" : ""}`} aria-hidden={heroSlide !== index} key={slide.label}>
              {slide.type === "video" && (
                <video autoPlay muted loop playsInline preload="metadata" poster="https://vgrofficial.in/cdn/shop/files/preview_images/464df9ba4bfe4a1b8e1de879546d8b84.thumbnail.0000000000.jpg?v=1757922230&width=2560">
                  <source src="https://vgrofficial.in/cdn/shop/videos/c/vp/464df9ba4bfe4a1b8e1de879546d8b84/464df9ba4bfe4a1b8e1de879546d8b84.HD-1080p-7.2Mbps-57484565.mp4?v=0" type="video/mp4" />
                </video>
              )}
              {slide.type === "editorial" && <div className="heroPhoto" />}
              {slide.type === "image" && <img src={slide.image} alt={slide.label} />}
            </div>
          ))}
        </div>
        <div className="heroGlow leftGlow" />
        <div className="heroGlow rightGlow" />
        <span className="sideLabel menLabel">FOR HIM</span>
        <span className="sideLabel womenLabel">FOR HER</span>
        <div className="heroCenter">
          <p className="kicker">Precision meets expression</p>
          <h1><span>Own your</span><em>signature</em></h1>
          <p className="heroText">High-performance grooming tools, designed for every version of you.</p>
          <div className="heroButtons">
            <a href="/collections/category-men" className="button light">Shop Men</a>
            <a href="/collections/category-women" className="button outline">Shop Women</a>
          </div>
        </div>
        <div className="heroSliderControls" aria-label="Choose hero slide">
          {heroSlides.map((slide, index) => (
            <button className={heroSlide === index ? "active" : ""} onClick={() => setHeroSlide(index)} aria-label={`Show slide ${index + 1}: ${slide.label}`} aria-current={heroSlide === index ? "true" : undefined} key={slide.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </button>
          ))}
        </div>
        <a className="scrollCue" href="#edits"><span>Discover the edits</span>↓</a>
      </section>

      <section className="trust homeStickyTrust">
        <span>01 <strong>Professional performance</strong></span>
        <span>02 <strong>Designed in detail</strong></span>
        <span>03 <strong>Made for every day</strong></span>
      </section>

      <section className="homeCategoryDiscovery">
        <header className="homeBlockHeader">
          <div><p className="kicker burgundy">Find your tool</p><h2>Shop by category</h2></div>
          <a href="/collections/all">View all products →</a>
        </header>
        <div className="homeCategoryGrid">
          {categories.map((category, index) => (
            <a className={`homeCategoryCard category${index + 1}`} href={category.href} key={category.title}>
              <img src={category.image} alt="" loading="lazy" decoding="async" />
              <div><p>{category.copy}</p><h3>{category.title}</h3><span>Shop category →</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="bestSellerSection" id="bestsellers">
        <header className="homeBlockHeader">
          <div><p className="kicker burgundy">Chosen again and again</p><h2>VGR Bestsellers</h2></div>
          <div className="campaignCopy"><p>High-performing tools for the concerns customers shop most.</p><a href="/collections/all">Shop all bestsellers →</a></div>
        </header>
        <div className="bestSellerLayout">
          <div className="bestSellerGrid">
            {bestSellerProducts.map((product) => <HomeBestSellerCard product={product} onAdd={add} key={product.slug} />)}
          </div>
          <aside className="bestSellerProof">
            <p className="kicker gold">Customer proof</p>
            <div><strong>4.5+</strong><span>★★★★★<small>Ratings across featured picks</small></span></div>
            <h3>What shoppers value</h3>
            <ul><li>Precise, controlled grooming</li><li>Easy everyday handling</li><li>Dependable performance</li></ul>
            <a href="/collections/all">Read product reviews →</a>
          </aside>
        </div>
      </section>

      <section className="totalRangeSection">
        <header className="homeBlockHeader">
          <div><p className="kicker burgundy">The complete collection</p><h2>One brand. Your total range.</h2></div>
          <p>From first touch-up to professional finish, find the right VGR tool for every routine.</p>
        </header>
        <div className="totalRangeGrid">
          {totalRange.map(([name, href], index) => <a href={href} key={name}><span>{String(index + 1).padStart(2, "0")}</span><strong>{name}</strong><b>→</b></a>)}
        </div>
      </section>

      <section className="brandWorld">
        <header>
          <p className="kicker gold">VGR Voyager</p>
          <h2>Built to move grooming forward.</h2>
          <p>Founded in 2016, VGR develops performance-led grooming technology for personal, professional and family care.</p>
        </header>
        <div className="brandWorldGrid">
          <article><span>01</span><h3>Brand Story</h3><p>A modern grooming brand shaped around self-expression, dependable performance and considered design.</p><a href="/pages/about-us">Discover our story →</a></article>
          <article><span>02</span><h3>Engineering</h3><p>Tools developed around control, comfort and purpose—from precision cutting to advanced styling technology.</p><a href="#engineering">Explore the engineering →</a></article>
          <article><span>03</span><h3>Global Presence</h3><p>VGR serves grooming communities across international markets through retail and authorised online channels.</p><a href="#marketplaces">See where to shop →</a></article>
        </div>
      </section>

      <section className="campaignShelf limitedCampaign" id="offers">
        <header className="homeBlockHeader">
          <div><p className="kicker gold">The statement range</p><h2>Explore VGR<br />Limited Edition</h2></div>
          <div className="campaignCopy"><p>Rare finishes. Salon-grade power. Signature tools made to stand apart.</p><a href="/collections/red-series">View limited editions →</a></div>
        </header>
        <HomeProductShelf items={limitedProducts} onAdd={add} />
      </section>

      <section className="manifesto">
        <p className="kicker burgundy">The VGR philosophy</p>
        <h2>Grooming is not a routine.<br /><em>It is how you arrive.</em></h2>
        <p>Precision technology meets modern self-expression. Whether your signature is sharp, soft or entirely your own, VGR gives you the tools to wear it with confidence.</p>
      </section>

      <section className="edits" id="edits">
        <a className="editCard mensEdit" id="men" href="/collections/category-men">
          <div className="editNumber">01</div>
          <img src="/products/rosso.webp" alt="VGR professional men's trimmer" loading="lazy" decoding="async" />
          <div className="editCopy">
            <p>Precision. Power. Presence.</p>
            <h2>The Men's<br /><em>Edit</em></h2>
            <span>Explore the collection →</span>
          </div>
        </a>
        <a className="editCard womensEdit" id="women" href="/collections/category-women">
          <div className="editNumber">02</div>
          <img src="/brand/hair-curler.webp" alt="VGR automatic hair curler" loading="lazy" decoding="async" />
          <div className="editCopy">
            <p>Shape. Style. Shine.</p>
            <h2>The Women's<br /><em>Edit</em></h2>
            <span>Explore the collection →</span>
          </div>
        </a>
      </section>

      <section className="shop" id="shop">
        <header className="sectionHeader">
          <div><p className="kicker burgundy">Curated for you</p><h2>The signatures</h2></div>
          <div className="shopTabs">
            {["all", "men", "women", "pro"].map((tab) => (
              <button key={tab} className={signatureTab === tab ? "active" : ""} onClick={() => setSignatureTab(tab)}>
                {tab === "all" ? "All" : tab}
              </button>
            ))}
          </div>
        </header>
        <div className="productGrid">
          {shownSignatures.map((product) => (
            <article className="product" key={product.name}>
              <div className={`productVisual ${product.tone}`}>
                <span className="tag">{product.badge}</span>
                <button className="wish" aria-label={`Save ${product.name}`}>♡</button>
                <a className="productImageLink" href={`/products/${product.slug}`}><img src={product.image} alt={product.name} loading="lazy" decoding="async" /></a>
                <button className="quick" onClick={() => add(product)}>Add to edit +</button>
              </div>
              <p>{product.category}</p>
              <h3><a href={`/products/${product.slug}`}>{product.name}</a></h3>
              <div className="price"><strong>{product.price}</strong><del>{product.old}</del><span>★ 4.8</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="campaignShelf personalCampaign">
        <header className="homeBlockHeader">
          <div><p className="kicker burgundy">Everyday precision</p><h2>VGR Personal<br />Use Trimmers</h2></div>
          <div className="campaignCopy"><p>Bestselling tools for quick touch-ups, clean lines and a reliable everyday finish.</p><a href="/collections/vgr-personal-use-trimmer">Shop personal trimmers →</a></div>
        </header>
        <HomeProductShelf items={personalProducts} onAdd={add} />
      </section>

      <section className="proStory" id="engineering">
        <div className="proImage">
          <img src="/brand/editorial-women.png" alt="VGR professional barber using VGR grooming tools" loading="lazy" decoding="async" />
          <span>PRO / 01</span>
        </div>
        <div className="proCopy">
          <p className="kicker gold">VGR engineering</p>
          <h2>Precision,<br /><em>engineered.</em></h2>
          <p>Purpose-built motors, considered ergonomics and control-led technology for confident personal and professional grooming.</p>
          <div className="specs">
            <div><strong>Control</strong><span>Purpose-led settings</span></div>
            <div><strong>2 yr</strong><span>Complete warranty</span></div>
            <div><strong>Type-C</strong><span>Selected cordless tools</span></div>
          </div>
          <a className="button goldButton" href="/collections/vgr-professional-use-tools">Discover Pro</a>
        </div>
      </section>

      <section className="engineeringTrust" aria-label="VGR engineering principles">
        <div><span>01</span><strong>Precision blades</strong><p>Designed for controlled detailing and reliable cutting.</p></div>
        <div><span>02</span><strong>Performance motors</strong><p>Power selected for each tool and grooming purpose.</p></div>
        <div><span>03</span><strong>Everyday ergonomics</strong><p>Balanced forms designed for confident handling.</p></div>
        <div><span>04</span><strong>2-year warranty</strong><p>Product support built into every eligible purchase.</p></div>
      </section>

      <section className="audienceGateway">
        <a className="audienceCard womenGateway" href="/collections/womens-grooming-tools">
          <img src={productBySlug("vgr-v-583-automatic-hair-curler")?.image} alt="VGR women's grooming tools" loading="lazy" decoding="async" />
          <div><p>Style your way</p><h2>Women’s<br />Grooming</h2><span>Explore women’s tools →</span></div>
        </a>
        <a className="audienceCard petGateway" href="/collections/pet-grooming-tools">
          <img src={productBySlug("vgr-v-208-professional-pet-hair-clipper")?.image} alt="VGR pet grooming tools" loading="lazy" decoding="async" />
          <div><p>Quiet, confident care</p><h2>Pet<br />Grooming</h2><span>Explore pet tools →</span></div>
        </a>
      </section>

      <section className="campaignShelf dryerCampaign">
        <header className="homeBlockHeader">
          <div><p className="kicker burgundy">Air performance</p><h2>VGR Hair<br />Dryer Series</h2></div>
          <div className="campaignCopy"><p>Travel-ready essentials and high-speed BLDC systems for faster, more controlled drying.</p><a href="/collections/hair-dryer">View all hair dryers →</a></div>
        </header>
        <HomeProductShelf items={dryerProducts} onAdd={add} />
      </section>

      <section className="budgetShop">
        <div><p className="kicker gold">Shop your range</p><h2>Performance at<br />every price.</h2></div>
        <nav aria-label="Shop by price">
          <a href="/collections/under-1000-models"><span>01</span><strong>Products under ₹1,000</strong><b>→</b></a>
          <a href="/collections/product-under-1500"><span>02</span><strong>Products under ₹1,500</strong><b>→</b></a>
          <a href="/collections/product-under-2000"><span>03</span><strong>Products under ₹2,000</strong><b>→</b></a>
          <a href="/collections/product-under-2500"><span>04</span><strong>Products under ₹2,500</strong><b>→</b></a>
        </nav>
      </section>

      <section className="marketplaceProof" id="marketplaces">
        <p className="kicker burgundy">Official online partners</p>
        <h2>Find VGR everywhere.</h2>
        <div>
          <a href="https://www.amazon.in/stores/VGRofficial/page/A0942DD1-E312-4DEB-9900-E58EF5DF211D">amazon</a>
          <a href="https://www.flipkart.com/health-personal-care-appliances/personal-care-appliances/trimmers/vgr~brand/pr?sid=zlw,79s,by3">Flipkart</a>
          <a href="https://www.jiomart.com/search/vgr">JioMart</a>
          <a href="https://blinkit.com/brand/vgr/19204">blinkit</a>
          <a href="https://www.zeptonow.com/uncl/vgr">zepto</a>
        </div>
        <p>Shop from VGR India and authorised marketplace destinations.</p>
      </section>

      <section className="socialProof">
        <div><strong>4.5+</strong><span>★★★★★<small>Across featured product ratings</small></span></div>
        <blockquote>Precision, control and dependable performance—the qualities customers value across VGR’s featured picks.<footer>Explore individual product reviews for verified detail.</footer></blockquote>
      </section>

      <section className="homepageFaq">
        <header><p className="kicker burgundy">Before you choose</p><h2>Good tools.<br />Clear answers.</h2></header>
        <div>
          <details><summary>Which VGR tool is right for personal use?<span>+</span></summary><p>Start with the personal-use trimmer edit for everyday beard, hairline and touch-up needs. Professional tools are designed for higher-frequency salon use.</p></details>
          <details><summary>How quickly will my order arrive?<span>+</span></summary><p>Most orders are dispatched promptly and estimated delivery is generally within 1–3 working days, depending on your serviceable location.</p></details>
          <details><summary>How does the VGR warranty work?<span>+</span></summary><p>Keep your invoice and register the product after purchase. Eligible manufacturing issues are handled through VGR customer care and the warranty process.</p></details>
          <details><summary>Can I return or replace a product?<span>+</span></summary><p>Eligible return or replacement requests should be raised within seven days of delivery with the original packaging and purchase details.</p></details>
        </div>
      </section>

      <section className="journal">
        <p className="kicker burgundy">The VGR Journal</p>
        <h2>Style is personal.<br /><em>Technique is everything.</em></h2>
        <div className="journalCards">
          <article><span>01</span><h3>The art of the clean line</h3><a href="/blogs/news">Read the story →</a></article>
          <article><span>02</span><h3>Volume without compromise</h3><a href="/blogs/news">Read the story →</a></article>
          <article><span>03</span><h3>Your five-minute signature</h3><a href="/blogs/news">Read the story →</a></article>
        </div>
      </section>

      <section className="newsletter">
        <p className="kicker">The inner circle</p>
        <h2>Stay in the <em>edit.</em></h2>
        <p>New launches, styling notes and private offers, curated for you.</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="srOnly" htmlFor="email">Email address</label>
          <input id="email" type="email" inputMode="email" autoComplete="email" placeholder="Your email address" />
          <button>Join →</button>
        </form>
      </section>

      <HomeFooter />
      {signupOpen && (
        <div className="signupBackdrop" onMouseDown={(event) => event.target === event.currentTarget && setSignupOpen(false)}>
          <section className="signupPopup" role="dialog" aria-modal="true" aria-labelledby="signup-title">
            <button className="signupClose" onClick={() => setSignupOpen(false)} aria-label="Close sign-up">×</button>
            <p className="kicker gold">Join the VGR edit</p>
            <h2 id="signup-title">Be first to know what’s next.</h2>
            <p>Get new launches, grooming guidance and member-only offer alerts delivered to your inbox.</p>
            <form onSubmit={(event) => { event.preventDefault(); setSignupOpen(false); setToast("Welcome to the VGR edit"); }}>
              <label className="srOnly" htmlFor="signup-email">Email address</label>
              <input id="signup-email" type="email" inputMode="email" autoComplete="email" placeholder="Your email address" required autoFocus />
              <button>Sign me up →</button>
            </form>
            <small>By joining, you agree to receive VGR marketing updates. Unsubscribe anytime.</small>
          </section>
        </div>
      )}
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}
