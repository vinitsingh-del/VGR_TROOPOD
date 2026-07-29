/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
"use client";

import { CSSProperties, FormEvent, useEffect, useRef, useState } from "react";
import { products, type Product } from "../store-data";
import s from "./v2.module.css";
import { categories, heroes, partners } from "./v2-data";

const nav = ["Bestsellers", "New arrivals", "Men’s grooming", "Women’s grooming", "Professional grooming", "Pet’s grooming", "Baby care", "Lifestyle essentials", "Shop by budget", "Offers & deals"];
const concernNames = ["Beard", "Hair", "Body", "Foot", "Pet Care"];
const reelPosters = [
  "https://vgrofficial.in/cdn/shop/files/preview_images/464df9ba4bfe4a1b8e1de879546d8b84.thumbnail.0000000000.jpg?v=1757922230&width=800",
  "https://vgrofficial.in/cdn/shop/files/preview_images/e58766a027f542339753ebe0221c2c9b.thumbnail.0000000000.jpg?v=1747461425&width=800",
  "https://vgrofficial.in/cdn/shop/files/v-484_1.webp?v=1741004665&width=800",
  "https://vgrofficial.in/cdn/shop/files/WhatsApp_Image_2025-12-19_at_11.02.24_AM.jpg?v=1768494346&width=800",
];
const videoUrl = heroes[0].video!;
const rangeItems = [
  ["VGR Trimmers","https://vgrofficial.in/cdn/shop/files/zqodvesbryao3p9ded8p.webp?v=1761639395&width=900","trimmer"],
  ["VGR Clippers","https://vgrofficial.in/cdn/shop/files/533af7b5-a57f-4726-b636-006a90caab6c.jpg?v=1764419222&width=900","clipper"],
  ["VGR Shavers","https://vgrofficial.in/cdn/shop/files/ccdbczcp38ndkcpzy8s0.webp?v=1747482564&width=900","shaver"],
  ["VGR Hair Dryers","https://vgrofficial.in/cdn/shop/files/V-469-Black_bc3121e6-2515-43f2-8bdc-20d5c168a388.webp?v=1760331654&width=900","hair-dryer"],
  ["VGR Straighteners","https://vgrofficial.in/cdn/shop/files/511.1.webp?v=1741061727&width=900","hair-straightener"],
  ["VGR Curlers","https://vgrofficial.in/cdn/shop/files/AnyConv.com__new1_79b4f13b-098b-4c18-a252-911621100be4_1.webp?v=1741072099&width=900","hair-volumizer"],
  ["VGR Epilators","https://cdn.shopify.com/s/files/1/0710/2716/3427/files/WhatsApp_Image_2024-09-28_at_12.54.32_PM.webp?v=1741077204","womens-grooming-tools"],
  ["VGR Hot Air Brushes","https://vgrofficial.in/cdn/shop/files/VGR_V-492_Hot_Air_Brush.webp?v=1764066945&width=900","hair-volumizer"],
  ["VGR Callus Removers","https://vgrofficial.in/cdn/shop/files/1Artboard1.webp?v=1741080624&width=900","callus-remover"],
  ["VGR Lint Removers","https://vgrofficial.in/cdn/shop/files/1.1.png?v=1740124210&width=900","lint-remover"],
  ["VGR Pet Clippers","https://cdn.shopify.com/s/files/1/0710/2716/3427/files/1.1_10.webp?v=1741413726","pet-grooming-tools"],
  ["VGR Baby Care","https://vgrofficial.in/cdn/shop/files/AnyConv.com__9.0-8-700x700_1_1.webp?v=1740977051&width=700","baby-care"],
] as const;
const engineeringItems = [
  ["Precision blades","M8 36L36 8l4 4-28 28H8z M19 29l-4-4 M25 23l-4-4 M31 17l-4-4"],
  ["Powerful motors","M24 8a16 16 0 1 0 0 32 16 16 0 0 0 0-32z M24 16a8 8 0 1 0 0 16 8 8 0 0 0 0-16z M24 20v8 M20 24h8"],
  ["Smart protection","M24 5l15 6v11c0 10-6 17-15 21-9-4-15-11-15-21V11z M17 24l5 5 10-11"],
  ["Endurance tested","M24 7a17 17 0 1 0 17 17 M24 14v11l8 5 M38 8v9h-9"],
] as const;

function VisualIcon({ path }: { path: string }) {
  return <svg className={s.visualIcon} viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d={path}/></svg>;
}

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen,setSeen] = useState(false);
  useEffect(()=>{
    const node=ref.current;
    if(!node) return;
    const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){setSeen(true);observer.disconnect()}},{threshold:.18,rootMargin:"0px 0px -8% 0px"});
    observer.observe(node);
    return()=>observer.disconnect();
  },[]);
  return { ref, seen };
}

export function Header({ cart }: { cart: number }) {
  const [open, setOpen] = useState(false);
  useEffect(()=>{
    if(!open) return;
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    return()=>{document.body.style.overflow=previous};
  },[open]);
  return <><div className={s.offer}>Free shipping above ₹499 · 2-year warranty · Extra 10% off on prepaid orders</div><header className={s.header}>
    <div className={s.headTop}>
      <button className={s.menuButton} onClick={() => setOpen(!open)} aria-label={open?"Close menu":"Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? "×" : "☰"}</button>
      <span className={s.headNote}>VGR Voyager · India</span>
      <a className={s.logo} href="/v2"><img src="/brand/vgr-voyager-logo.png" alt="VGR Voyager" /></a>
      <div className={s.actions}>
        <button className={`${s.iconButton} ${s.hideSmall}`} aria-label="Search">⌕</button>
        <button className={`${s.iconButton} ${s.hideSmall}`} aria-label="Account">♙</button>
        <button className={s.iconButton} aria-label="Wishlist">♡<span className={s.badge}>0</span></button>
        <button className={s.iconButton} aria-label={`Cart with ${cart} items`}>Bag<span className={s.badge}>{cart}</span></button>
      </div>
    </div>
    <div className={s.navRow}><nav className={s.nav}>{nav.map((x,i)=><a key={x} href={i===0?"#bestsellers":i===1?"#new":i===8?"/v2/collection?budget=1000":i===9?"#bestsellers":"/v2/collection"}>{x}</a>)}</nav><label className={s.search}><input aria-label="Search VGR products" placeholder="Search products" /><span>⌕</span></label></div>
    <nav id="mobile-navigation" className={`${s.mobileNav} ${open?s.open:""}`}>{nav.map(x=><a key={x} href="/v2/collection" onClick={()=>setOpen(false)}>{x}<span>→</span></a>)}</nav>
  </header></>;
}

function ProductCard({ p, add }: { p: Product; add: (p:Product)=>void }) {
  const saving = Math.round((1-p.price/p.oldPrice)*100);
  return <article className={s.card}><a className={s.cardVisual} href={`https://vgrofficial.in/products/${p.slug}`}><span className={s.pill}>{p.badge}</span><button className={s.wish} aria-label={`Save ${p.shortName}`}>♡</button><img src={p.image} alt={p.name} loading="lazy" width="600" height="750" /></a><div className={s.cardInfo}><span className={s.meta}>{p.category} · Save {saving}%</span><h3>{p.name}</h3><div className={s.rating}><span>★★★★★</span><small>{p.rating.toFixed(1)} verified</small></div><div className={s.price}><strong>₹{p.price.toLocaleString("en-IN")}</strong><del>₹{p.oldPrice.toLocaleString("en-IN")}</del></div><div className={s.urgency}><i /></div><button className={s.add} onClick={()=>add(p)}>Add to cart</button></div></article>
}

function Footer() {
  return <><section className={s.newsletter}><div><p className={s.eyebrow}>The VGR edit</p><h2>Good grooming, delivered.</h2></div><form className={s.signup} onSubmit={(e)=>e.preventDefault()}><input type="email" inputMode="email" placeholder="Your email address" aria-label="Email address" required /><button>Join us →</button></form></section><footer className={s.footer}><div className={s.footerGrid}><div><img className={s.footerLogo} src="/brand/vgr-voyager-logo.png" alt="VGR Voyager" /><p>Professional grooming technology for every version of you.</p></div><div><h3>Shop</h3><a href="/v2/collection">Men</a><a href="/v2/collection">Women</a><a href="/v2/collection">Professional</a><a href="/v2/collection">Pet grooming</a></div><div><h3>About VGR</h3><a href="https://vgrofficial.in/pages/about-us">Our story</a><a href="https://vgrofficial.in/pages/contact">Contact us</a><a href="https://vgrofficial.in/blogs/news">Journal</a><a href="https://vgrofficial.in/pages/careers">Careers</a></div><div><h3>Support</h3><a href="https://vgrofficial.in/pages/track-order">Track order</a><a href="https://vgrofficial.in/pages/vgr-warranty-registration">Warranty</a><a href="https://vgrofficial.in/policies/refund-policy">Returns</a><a href="https://vgrofficial.in/pages/e-catalog">E-catalogue</a></div><div><h3>Visit & connect</h3><a href="https://vgrofficial.in/pages/contact">Our stores</a><a href="https://www.instagram.com/vgrofficial.in/">Instagram</a><a href="https://www.youtube.com/channel/UCqj-oy1d6GfD-SejpChtWQA">YouTube</a><a href="tel:18002578939">1800 257 8939</a></div></div><div className={s.footerBottom}><span>© 2026 VGR India Official Private Limited</span><span>Privacy · Shipping · Terms</span></div></footer><a className={s.whatsapp} href="https://wa.me/9118002578939" aria-label="Chat on WhatsApp">WA</a></>;
}

export function HomeV2() {
  const [hero,setHero]=useState(0), [cart,setCart]=useState(0), [toast,setToast]=useState(""), [concern,setConcern]=useState(0), [popup,setPopup]=useState(true), [reel,setReel]=useState(false);
  const rangeReveal=useReveal(), engineeringReveal=useReveal();
  useEffect(()=>{const id=setInterval(()=>setHero(v=>(v+1)%heroes.length),5000);return()=>clearInterval(id)},[]);
  const add=(p:Product)=>{setCart(v=>v+1);setToast(`${p.shortName} added to your bag`);setTimeout(()=>setToast(""),2200)};
  const concernProducts=[products.slice(0,4),products.slice(4,8),products.slice(14,18),products.slice(-6,-2),products.filter(p=>p.audience==="pet").slice(0,4)][concern];
  return <main className={s.shell}><Header cart={cart}/><section className={s.hero} aria-label="Featured stories">{heroes.map((h,i)=><div key={h.title} className={`${s.slide} ${h.align==="right"?s.right:""} ${i===hero?s.active:""}`} aria-hidden={i!==hero} style={{"--hero-media":`url("${h.image??h.poster}")`} as CSSProperties}>{h.video?<video autoPlay muted loop playsInline poster={h.poster}><source src={h.video}/></video>:<img className={h.mediaFit==="contain"?s.mediaContain:""} src={h.image} alt="" width="1800" height="1000"/>}<div className={s.heroCopy}><p className={s.eyebrow}>{h.eyebrow}</p><h1>{h.title}</h1><p>{h.copy}</p><a className={s.primary} href={h.href}>{h.cta}</a></div></div>)}<div className={s.heroControls}><div className={s.dots}>{heroes.map((_,i)=><button key={i} className={i===hero?s.activeDot:""} onClick={()=>setHero(i)} aria-label={`Show slide ${i+1}`}/>)}</div><button onClick={()=>setHero((hero+5)%6)} aria-label="Previous slide">←</button><button onClick={()=>setHero((hero+1)%6)} aria-label="Next slide">→</button></div></section>
  <section className={s.trust}><div><b>✓</b><span>2-year warranty</span></div><div><b>↗</b><span>Fast India-wide delivery</span></div><div><b>↩</b><span>7-day returns</span></div><div><b>★</b><span>Verified ratings</span></div></section>
  <section className={s.section}><div className={s.sectionHead}><div><p className={s.eyebrow}>Find your ritual</p><h2>Grooming, for everyone.</h2></div><a className={s.textLink} href="/v2/collection">Shop all categories →</a></div><div className={s.categoryRail}>{categories.map(c=><a className={s.category} href={c.href} key={c.name}><img src={c.image} alt={c.name} loading="lazy" width="700" height="900"/><div className={s.categoryText}><p>{c.kicker}</p><h3>{c.name}</h3><span>Explore →</span></div></a>)}</div></section>
  <section className={`${s.section} ${s.paper}`} id="bestsellers"><div className={s.sectionHead}><div><p className={s.eyebrow}>Most loved</p><h2>VGR bestsellers.</h2></div><a className={s.textLink} href="/v2/collection">View all →</a></div><div className={s.bestLayout}><div className={s.productRail}>{products.slice(0,6).map(p=><ProductCard p={p} add={add} key={p.slug}/>)}</div><aside className={s.testimonial}><p className={s.eyebrow}>Real results</p><blockquote>“Precise, powerful and built to last. It feels like a professional tool in your hand.”</blockquote><strong>Verified VGR customer</strong><small>★★★★★ · Product review</small></aside></div></section>
  <section className={`${s.section} ${s.range}`} id="new"><div className={s.sectionHead}><div><p className={s.eyebrow}>The complete edit</p><h2>Total range.</h2></div></div><div ref={rangeReveal.ref} className={`${s.rangeGrid} ${rangeReveal.seen?s.visualsRevealed:""}`}>{rangeItems.map(([name,image,group],i)=><a href={`/v2/collection?group=${group}`} key={name} style={{"--item-index":i} as CSSProperties}><span className={s.rangeNumber}>{String(i+1).padStart(2,"0")}</span><span className={s.rangeVisual}><img src={image} alt={name} loading="lazy" width="500" height="500"/></span><b>{name}</b></a>)}</div></section>
  <section className={s.section}><div className={s.sectionHead}><div><p className={s.eyebrow}>Start with what matters</p><h2>Shop by concern.</h2></div><a className={s.textLink} href="/v2/collection">View all solutions →</a></div><div className={s.concernTabs}>{concernNames.map((x,i)=><button className={i===concern?s.selected:""} onClick={()=>setConcern(i)} key={x}>{x}</button>)}</div><div className={s.concernGrid}>{concernProducts.map(p=><ProductCard p={p} add={add} key={p.slug}/>)}</div></section>
  <section className={s.story}><div className={s.storyMedia}><img src="https://vgrofficial.in/cdn/shop/files/WhatsApp_Image_2025-12-19_at_11.02.24_AM.jpg?v=1768494346&width=1500" alt="VGR professional grooming tools" loading="lazy"/></div><div className={s.storyCopy}><p className={s.eyebrow}>The VGR story</p><h2>Built in India. Grooming the world.</h2><p>VGR brings professional performance into everyday routines through considered engineering, durable design and tools made for real people—from first-time users to working professionals.</p><div className={s.stats}><div><strong>25+</strong><span>Countries</span></div><div><strong>6</strong><span>Care worlds</span></div><div><strong>2 yr</strong><span>Warranty</span></div></div><a className={s.textLink} href="https://vgrofficial.in/pages/about-us">Read our story →</a></div></section>
  <section className={s.engineering}><p className={s.eyebrow}>VGR engineering</p><h2>Performance, considered.</h2><p>From precision-cut blades and high-torque motors to smart heat control and fast charging, every detail is designed around dependable results and confident handling.</p><div ref={engineeringReveal.ref} className={`${s.engineeringGrid} ${engineeringReveal.seen?s.visualsRevealed:""}`}>{engineeringItems.map(([name,path],i)=><div key={name} style={{"--item-index":i} as CSSProperties}><b>{String(i+1).padStart(2,"0")}</b><VisualIcon path={path}/><span>{name}</span></div>)}</div></section>
  <section className={s.partners}><p className={s.eyebrow}>Available on leading ecommerce platforms</p><div className={s.partnerGrid}>{partners.map(([name,url])=><img src={url} alt={name} loading="lazy" key={name}/>)}</div></section>
  <section className={`${s.section} ${s.paper}`}><div className={s.sectionHead}><div><p className={s.eyebrow}>Watch & learn</p><h2>Grooming in motion.</h2></div></div><div className={s.reels}>{reelPosters.map((x,i)=><button className={s.reel} onClick={()=>setReel(true)} key={x}><img src={x} alt="" loading="lazy"/><span><b>{["The precision edit","Meet Rosso","Your styling ritual","Power for professionals"][i]}</b>Tap to watch</span><i className={s.play}>▶</i></button>)}</div></section>
  <section className={s.section}><div className={s.sectionHead}><div><p className={s.eyebrow}>The VGR journal</p><h2>Know your tools.</h2></div><a className={s.textLink} href="https://vgrofficial.in/blogs/news">Read all →</a></div><div className={s.journalGrid}>{[["How to choose the right trimmer",products[1].image],["The guide to salon-grade tools",products[8].image],["Five steps to effortless styling",products[13].image]].map(([title,img])=><a className={s.journalCard} href="https://vgrofficial.in/blogs/news" key={title}><img src={img} alt="" loading="lazy"/><p className={s.eyebrow}>VGR guide</p><h3>{title}</h3><span>Read story →</span></a>)}</div></section>
  <section className={`${s.section} ${s.paper}`}><div className={s.faq}><div className={s.sectionHead}><div><p className={s.eyebrow}>Need to know</p><h2>Frequently asked.</h2></div></div>{[["How do I choose the right VGR tool?","Start with your grooming concern and usage frequency. Home users can choose the personal series, while barbers and stylists should explore VGR Professional."],["Do VGR products include a warranty?","Eligible VGR tools include warranty support. Register your product after purchase and keep your invoice for service."],["How quickly will my order arrive?","Most orders are dispatched promptly and typically arrive within 1–3 working days depending on your location."],["Can I return or replace a product?","Eligible unused products can be returned according to VGR’s published returns and replacement policy."],["Where can I buy genuine VGR products?","Shop at vgrofficial.in or through VGR’s verified marketplace stores shown above."]].map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
  <Footer/>
  {popup&&<div className={s.popupBackdrop} role="dialog" aria-modal="true" aria-label="Welcome offer"><div className={s.popup}><button className={s.close} onClick={()=>setPopup(false)} aria-label="Close">×</button><img src={products[0].image} alt="VGR Rosso trimmer"/><div className={s.popupCopy}><p className={s.eyebrow}>Welcome to VGR</p><h2>Get 10% off your first ritual.</h2><p>Sign up for new launches, expert grooming guides and members-only offers.</p><form className={s.signup} onSubmit={(e:FormEvent)=>{e.preventDefault();setPopup(false)}}><input type="email" inputMode="email" placeholder="Email address" required/><button>Unlock offer →</button></form></div></div></div>}
  {reel&&<div className={s.modal} onClick={()=>setReel(false)} role="dialog" aria-modal="true"><video src={videoUrl} controls autoPlay muted playsInline onClick={e=>e.stopPropagation()}/></div>}
  {toast&&<div className={s.toast}>{toast}</div>}</main>;
}

export function CollectionV2() {
  const [cart,setCart]=useState(0),[visible,setVisible]=useState(9),[toast,setToast]=useState("");
  const add=(p:Product)=>{setCart(v=>v+1);setToast(`${p.shortName} added to your bag`);setTimeout(()=>setToast(""),2200)};
  return <main className={s.shell}><Header cart={cart}/><section className={s.collectionHero}><div><p className={s.eyebrow}>The VGR collection</p><h1>Tools for every ritual.</h1><p>Engineered performance across personal, professional and everyday care.</p></div></section><section className={s.section}><div className={s.collectionTools}><div className={s.subtabs}>{["All","Beard","Hair","Body","Women","Professional"].map(x=><button key={x}>{x}</button>)}</div><select className={s.sort} aria-label="Sort products"><option>Featured</option><option>Price: low to high</option><option>Rating</option></select><button className={s.mobileFilter}>Filter</button></div><div className={s.collectionLayout}><aside className={s.filters}><details open><summary>Category</summary>{["Trimmers","Clippers","Shavers","Hair styling","Personal care"].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}</details><details open><summary>Shop by budget</summary>{["Under ₹800","Under ₹1,000","Under ₹1,500","Under ₹2,500"].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}</details><details><summary>Availability</summary><label><input type="checkbox"/> In stock</label></details></aside><div><div className={s.collectionGrid}>{products.slice(0,visible).map(p=><ProductCard p={p} add={add} key={p.slug}/>)}</div>{visible<products.length&&<button className={`${s.primary} ${s.load}`} onClick={()=>setVisible(v=>v+6)}>Load more products</button>}</div></div></section><Footer/>{toast&&<div className={s.toast}>{toast}</div>}</main>;
}
