"use client";

import { useState } from "react";

const products = [
  { name: "Rosso Pro Trimmer", type: "Men · Professional", price: "₹1,599", old: "₹2,499", rating: "5.0", image: "/products/rosso.webp", badge: "Bestseller" },
  { name: "V-484 Hot Air Brush", type: "Women · Styling", price: "₹3,199", old: "₹4,299", rating: "4.8", image: "/products/hot-air-brush.webp", badge: "New" },
  { name: "V-401 Pro Hair Dryer", type: "Professional · Salon", price: "₹8,999", old: "₹11,999", rating: "4.9", image: "/products/hair-dryer.jpg", badge: "Pro Series" },
  { name: "V-071 Precision Trimmer", type: "Men · Everyday", price: "₹999", old: "₹1,399", rating: "4.5", image: "/products/v071.jpg", badge: "Popular" },
];

const categories = [
  { title: "Precision Trimmers", kicker: "Sharp lines. Clean confidence.", image: "/products/v071.jpg" },
  { title: "Hair Styling", kicker: "Your style, engineered.", image: "/products/hot-air-brush.webp" },
  { title: "Salon Performance", kicker: "Power built for professionals.", image: "/products/hair-dryer.jpg" },
];

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="icon" aria-hidden="true">{children}</span>;
}

export default function Home() {
  const [cart, setCart] = useState(0);
  const [menu, setMenu] = useState(false);

  return (
    <main>
      <div className="announcement">2 Year Warranty <b>•</b> Free Shipping above ₹499 <b>•</b> 7-Day Returns</div>
      <header className="header">
        <button className="menuButton" onClick={() => setMenu(!menu)} aria-label="Toggle menu">☰</button>
        <a className="logo" href="#top" aria-label="VGR home">VGR</a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#men" onClick={() => setMenu(false)}>Men</a>
          <a href="#women" onClick={() => setMenu(false)}>Women</a>
          <a href="#professional" onClick={() => setMenu(false)}>Professional</a>
          <a href="#essentials" onClick={() => setMenu(false)}>Essentials</a>
        </nav>
        <div className="utilities">
          <button aria-label="Search"><Icon>⌕</Icon></button>
          <button className="account" aria-label="Account"><Icon>○</Icon></button>
          <button className="cart" aria-label={`Cart with ${cart} items`}><Icon>▢</Icon><span>{cart}</span></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <span className="seriesLabel">VGR PRO</span>
          <p className="eyebrow">Professional grooming technology</p>
          <h1><span>Engineered</span><span>for your edge</span></h1>
          <p className="heroText">High-performance grooming tools built for precision, power and everyday confidence.</p>
          <div className="heroActions">
            <a className="button primary" href="#bestsellers">Shop Bestsellers</a>
            <a className="button secondary" href="#professional">Explore Pro Series</a>
          </div>
        </div>
        <div className="heroVisual" aria-label="VGR premium professional trimmer">
          <div className="heroImage" />
          <div className="specCard"><strong>400 min</strong><span>Professional runtime</span></div>
        </div>
      </section>

      <section className="trustBar" aria-label="Shopping benefits">
        <div><Icon>♢</Icon><span><strong>2 Year Warranty</strong><small>Built to perform, backed to last</small></span></div>
        <div><Icon>▱</Icon><span><strong>Free Shipping</strong><small>On prepaid orders above ₹499</small></span></div>
        <div><Icon>↶</Icon><span><strong>7-Day Returns</strong><small>Simple, stress-free support</small></span></div>
      </section>

      <section className="section intro" id="men">
        <div>
          <p className="eyebrow">Find your tool</p>
          <h2>One standard.<br />Every routine.</h2>
        </div>
        <p>From first-pass precision to salon-grade styling, VGR gives every routine the performance it deserves.</p>
      </section>

      <section className="categoryGrid">
        {categories.map((category, index) => (
          <a className="categoryCard" href="#bestsellers" key={category.title} id={index === 1 ? "women" : undefined}>
            <img src={category.image} alt="" />
            <span className="categoryIndex">0{index + 1}</span>
            <div>
              <p>{category.kicker}</p>
              <h3>{category.title}</h3>
              <span className="textLink">Explore category →</span>
            </div>
          </a>
        ))}
      </section>

      <section className="section productsSection" id="bestsellers">
        <div className="sectionHead">
          <div><p className="eyebrow">Most wanted</p><h2>Designed to outperform.</h2></div>
          <a className="textLink" href="#essentials">Shop all products →</a>
        </div>
        <div className="productGrid">
          {products.map((product) => (
            <article className="productCard" key={product.name}>
              <div className="productImage">
                <span className="badge">{product.badge}</span>
                <button className="heart" aria-label={`Save ${product.name}`}>♡</button>
                <img src={product.image} alt={product.name} />
                <button className="quickAdd" onClick={() => setCart(cart + 1)}>Quick add +</button>
              </div>
              <p className="productType">{product.type}</p>
              <h3>{product.name}</h3>
              <div className="productMeta"><span><strong>{product.price}</strong> <del>{product.old}</del></span><span>★ {product.rating}</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="technology" id="professional">
        <div className="techVisual">
          <img src="/products/rosso.webp" alt="VGR Rosso professional trimmer" />
          <span className="orbit one">01</span><span className="orbit two">02</span><span className="orbit three">03</span>
        </div>
        <div className="techCopy">
          <p className="eyebrow light">Inside the performance</p>
          <h2>More power.<br />Less compromise.</h2>
          <p className="techLead">Every detail is engineered for a smoother, faster and more controlled grooming experience.</p>
          <div className="techSpecs">
            <div><strong>7,000</strong><span>RPM turbo motor</span></div>
            <div><strong>400</strong><span>Minutes runtime</span></div>
            <div><strong>Type-C</strong><span>Universal charging</span></div>
          </div>
          <a className="button lightButton" href="#bestsellers">Discover Rosso Pro</a>
        </div>
      </section>

      <section className="editorial" id="essentials">
        <div className="editorialCopy">
          <p className="eyebrow">VGR at home</p>
          <h2>Your routine.<br />Your signature.</h2>
          <p>Professional results should not require a professional appointment. Bring precision, care and confidence into every day.</p>
          <a className="textLink" href="#bestsellers">Build your grooming kit →</a>
        </div>
        <img src="/products/hair-curler.png" alt="VGR automatic hair curler" />
      </section>

      <section className="reviews">
        <div className="ratingBlock"><span>4.7</span><div>★★★★★<small>Average customer rating</small></div></div>
        <blockquote>“The build quality feels genuinely premium, the battery lasts for weeks, and the cut is cleaner than tools twice the price.”<footer>— Verified VGR customer</footer></blockquote>
      </section>

      <section className="newsletter">
        <p className="eyebrow">Stay sharp</p>
        <h2>Get launches, grooming tips<br />and members-only offers.</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="srOnly" htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="Enter your email address" />
          <button type="submit">Join VGR →</button>
        </form>
      </section>

      <footer className="footer">
        <a className="logo footerLogo" href="#top">VGR</a>
        <p>Professional grooming technology for everyone.</p>
        <div className="footerLinks"><a href="#men">Men</a><a href="#women">Women</a><a href="#professional">Professional</a><a href="#essentials">Support</a></div>
        <small>© 2026 VGR India. Concept redesign.</small>
      </footer>
    </main>
  );
}
