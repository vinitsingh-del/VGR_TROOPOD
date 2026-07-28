"use client";

import { useState } from "react";

const products = [
  { name: "Rosso Professional Trimmer", category: "The Men's Edit", price: "₹1,599", old: "₹2,499", image: "/products/rosso.webp", tone: "wine", badge: "Icon" },
  { name: "V-484 Hot Air Brush", category: "The Women's Edit", price: "₹3,199", old: "₹4,299", image: "/products/hot-air-brush.webp", tone: "blush", badge: "New" },
  { name: "V-401 Pro Hair Dryer", category: "The Pro Edit", price: "₹8,999", old: "₹11,999", image: "/products/hair-dryer.jpg", tone: "black", badge: "Salon" },
  { name: "V-071 Precision Trimmer", category: "Everyday Icons", price: "₹999", old: "₹1,399", image: "/products/v071.jpg", tone: "cream", badge: "Loved" },
];

export default function Home() {
  const [cart, setCart] = useState(0);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState("");

  const add = (name: string) => {
    setCart((value) => value + 1);
    setToast(`${name} added to your edit`);
    window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <main>
      <div className="offerBar">Complimentary delivery above ₹499 <span>•</span> 2-year warranty <span>•</span> 7-day returns</div>
      <header className="header">
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">☰</button>
        <a className="logo" href="#top" aria-label="VGR home">VGR</a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          <a href="#men" onClick={() => setMenu(false)}>Men</a>
          <a href="#women" onClick={() => setMenu(false)}>Women</a>
          <a href="#pro" onClick={() => setMenu(false)}>Professional</a>
          <a href="#edits" onClick={() => setMenu(false)}>The Edits</a>
        </nav>
        <div className="actions">
          <button aria-label="Search">⌕</button>
          <button aria-label="Account">○</button>
          <button className="bag" aria-label={`Shopping bag with ${cart} items`}>Bag <b>{cart}</b></button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="heroPhoto" />
        <span className="sideLabel menLabel">FOR HIM</span>
        <span className="sideLabel womenLabel">FOR HER</span>
        <div className="heroCenter">
          <p className="kicker">Precision meets expression</p>
          <h1><span>Own your</span><em>signature</em></h1>
          <p className="heroText">High-performance grooming tools, designed for every version of you.</p>
          <div className="heroButtons">
            <a href="#men" className="button light">Shop Men</a>
            <a href="#women" className="button outline">Shop Women</a>
          </div>
        </div>
        <a className="scrollCue" href="#edits"><span>Discover the edits</span>↓</a>
      </section>

      <section className="trust">
        <span>01 <strong>Professional performance</strong></span>
        <span>02 <strong>Designed in detail</strong></span>
        <span>03 <strong>Made for every day</strong></span>
      </section>

      <section className="manifesto">
        <p className="kicker burgundy">The VGR philosophy</p>
        <h2>Grooming is not a routine.<br /><em>It is how you arrive.</em></h2>
        <p>Precision technology meets modern self-expression. Whether your signature is sharp, soft or entirely your own, VGR gives you the tools to wear it with confidence.</p>
      </section>

      <section className="edits" id="edits">
        <a className="editCard mensEdit" id="men" href="#shop">
          <div className="editNumber">01</div>
          <img src="/products/rosso.webp" alt="VGR professional men's trimmer" />
          <div className="editCopy">
            <p>Precision. Power. Presence.</p>
            <h2>The Men's<br /><em>Edit</em></h2>
            <span>Explore the collection →</span>
          </div>
        </a>
        <a className="editCard womensEdit" id="women" href="#shop">
          <div className="editNumber">02</div>
          <img src="/products/hair-curler.png" alt="VGR women's styling tool" />
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
          <div className="shopTabs"><button className="active">All</button><button>Men</button><button>Women</button><button>Pro</button></div>
        </header>
        <div className="productGrid">
          {products.map((product) => (
            <article className="product" key={product.name}>
              <div className={`productVisual ${product.tone}`}>
                <span className="tag">{product.badge}</span>
                <button className="wish" aria-label={`Save ${product.name}`}>♡</button>
                <img src={product.image} alt={product.name} />
                <button className="quick" onClick={() => add(product.name)}>Add to edit +</button>
              </div>
              <p>{product.category}</p>
              <h3>{product.name}</h3>
              <div className="price"><strong>{product.price}</strong><del>{product.old}</del><span>★ 4.8</span></div>
            </article>
          ))}
        </div>
      </section>

      <section className="proStory" id="pro">
        <div className="proImage">
          <img src="/products/hair-dryer.jpg" alt="VGR professional hair dryer" />
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
          <a className="button goldButton" href="#shop">Discover Pro</a>
        </div>
      </section>

      <section className="socialProof">
        <div><strong>4.8</strong><span>★★★★★<small>From verified customers</small></span></div>
        <blockquote>“Feels luxurious, performs beautifully, and finally looks as considered as the rest of my routine.”<footer>— Aanya, verified buyer</footer></blockquote>
      </section>

      <section className="journal">
        <p className="kicker burgundy">The VGR Journal</p>
        <h2>Style is personal.<br /><em>Technique is everything.</em></h2>
        <div className="journalCards">
          <article><span>01</span><h3>The art of the clean line</h3><a href="#men">Read the story →</a></article>
          <article><span>02</span><h3>Volume without compromise</h3><a href="#women">Read the story →</a></article>
          <article><span>03</span><h3>Your five-minute signature</h3><a href="#shop">Read the story →</a></article>
        </div>
      </section>

      <section className="newsletter">
        <p className="kicker">The inner circle</p>
        <h2>Stay in the <em>edit.</em></h2>
        <p>New launches, styling notes and private offers, curated for you.</p>
        <form onSubmit={(event) => event.preventDefault()}>
          <label className="srOnly" htmlFor="email">Email address</label>
          <input id="email" type="email" placeholder="Your email address" />
          <button>Join →</button>
        </form>
      </section>

      <footer className="footer">
        <a className="logo" href="#top">VGR</a>
        <p>Tools for your signature.</p>
        <nav><a href="#men">Men</a><a href="#women">Women</a><a href="#pro">Professional</a><a href="#edits">Our Story</a></nav>
        <small>© 2026 VGR India · Concept redesign</small>
      </footer>
      {toast && <div className="toast" role="status">{toast}</div>}
    </main>
  );
}
