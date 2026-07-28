"use client";

import { useState } from "react";
import { SiteFooter, useVgrCart } from "./store-components";
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

const categories = [
  { title: "Hair Trimmers", copy: "Precision for every line", href: "/collections/hair-trimmer", image: productBySlug("vgr-v-071-hair-trimmer-for-men-silver")?.image },
  { title: "Hair Clippers", copy: "Power for every cut", href: "/collections/clipper", image: productBySlug("vgr-v-001-professional-hair-clipper-for-men-green")?.image },
  { title: "Hair Dryers", copy: "Fast, controlled airflow", href: "/collections/hair-dryer", image: productBySlug("vgr-v-640hd-professional-hair-dryer-barber-series")?.image },
  { title: "Styling & Volume", copy: "Shape, smooth and shine", href: "/collections/hair-volumizer", image: productBySlug("vgr-v-492-hot-air-brush-black")?.image },
  { title: "Pet Grooming", copy: "Quiet, pet-safe care", href: "/collections/pet-grooming-tools", image: productBySlug("vgr-v-240-professional-pet-trimmer")?.image },
  { title: "Fabric Care", copy: "Keep favourites looking new", href: "/collections/lint-remover", image: productBySlug("vgr-v-818-professional-lint-remover-lint-roller-green")?.image },
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

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");
  const [signatureTab, setSignatureTab] = useState("all");
  const { count: cart, addItem } = useVgrCart();

  const add = (product: { slug: string; name: string }) => {
    addItem(product);
    setToast(`${product.name} added to your edit`);
    window.setTimeout(() => setToast(""), 1800);
  };

  const shownSignatures = signatureTab === "all"
    ? signatureProducts
    : signatureProducts.filter((product) => product.audience === signatureTab);

  return (
    <main>
      <div className="offerBar">Complimentary delivery above ₹499 <span>•</span> 2-year warranty <span>•</span> 7-day returns</div>
      <header className="header">
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">☰</button>
        <a className="logo" href="#top" aria-label="VGR Voyager home"><img src="/brand/vgr-logo-official.png" alt="VGR Voyager" /></a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="/collections/category-men" onClick={() => setMenu(false)}>Men</a>
          <a href="/collections/category-women" onClick={() => setMenu(false)}>Women</a>
          <a href="/collections/vgr-professional-use-tools" onClick={() => setMenu(false)}>Professional</a>
          <a href="/collections/all" onClick={() => setMenu(false)}>All Products</a>
        </nav>
        <div className="actions">
          <a href="/search" aria-label="Search">⌕</a>
          <a href="/account" aria-label="Account">○</a>
          <a className="bag" href="/cart" aria-label={`Shopping bag with ${cart} items`}>Bag <b>{cart}</b></a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="heroPhoto" />
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
        <a className="scrollCue" href="#edits"><span>Discover the edits</span>↓</a>
      </section>

      <section className="trust">
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

      <section className="campaignShelf limitedCampaign">
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

      <section className="proStory" id="pro">
        <div className="proImage">
          <img src="/brand/editorial-women.png" alt="VGR professional barber using VGR grooming tools" loading="lazy" decoding="async" />
          <span>PRO / 01</span>
        </div>
        <div className="proCopy">
          <p className="kicker gold">The professional series</p>
          <h2>Performance,<br /><em>elevated.</em></h2>
          <p>Salon-grade power. Editorial precision. Engineered for artists who refuse to compromise.</p>
          <div className="specs">
            <div><strong>110K</strong><span>RPM high-speed motor</span></div>
            <div><strong>2 yr</strong><span>Complete warranty</span></div>
            <div><strong>Ion+</strong><span>Advanced hair care</span></div>
          </div>
          <a className="button goldButton" href="/collections/vgr-professional-use-tools">Discover Pro</a>
        </div>
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

      <section className="marketplaceProof">
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
        <div><strong>4.8</strong><span>★★★★★<small>From verified customers</small></span></div>
        <blockquote>“Feels luxurious, performs beautifully, and finally looks as considered as the rest of my routine.”<footer>— Aanya, verified buyer</footer></blockquote>
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

      <SiteFooter />
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}
