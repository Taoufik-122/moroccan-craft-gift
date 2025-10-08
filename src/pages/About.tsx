import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Mail, ArrowRight, Newspaper, Leaf, Users, Briefcase, BookOpen } from "lucide-react";
import myVideo from "@/assets/video_4d48ff1d_1756313657503.mp4";
import heroImage from '@/assets/hero-image.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Color palette
const GOLD = "#D4AF37"; // Elegant Gold
const COPPER = "#B87333"; // Copper
const BLUE = "#0F4C81"; // Moroccan Blue

export default function AboutMORCG() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "about", label: "About Us", icon: BookOpen },
    { id: "artisans", label: "Our Artisans", icon: Users },
    { id: "sustainability", label: "Sustainability", icon: Leaf },
    { id: "press", label: "Press", icon: Newspaper },
    { id: "careers", label: "Careers", icon: Briefcase },
    { id: "blog", label: "Blog", icon: BookOpen },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    
    <div className="min-h-screen bg-[#F8F6F2] text-[#1f2937]">
      {/* Header */}

      <Helmet>
        <title>Moroccan Craft Gift | Authentic Moroccan Handicrafts</title>
        <meta
          name="description"
          content="Discover authentic Moroccan handicrafts: copperware, leather poufs, zellige tiles, and woodwork. Handmade by skilled artisans since 1995."
        />
        <meta name="keywords" content="Moroccan crafts, handmade, copper, leather, zellige, artisanal gifts" />
        <link rel="canonical" href="https://moroccancraftgift.com/" />
        <meta property="og:title" content="Moroccan Craft Gift" />
        <meta property="og:description" content="Handcrafted Moroccan products by skilled artisans. Fair trade and sustainable." />
        <meta property="og:image" content="https://moroccancraftgift.com/og-image.png" />
        <meta property="og:url" content="https://moroccancraftgift.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
{`
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Moroccan Craft Gift",
  "url": "https://moroccancraftgift.com/",
  "logo": "https://moroccancraftgift.com/logo.png",
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61578327795179",
    "https://www.instagram.com/moroccan.craft.gift/"
  ]
}
`}
</script>
      </Helmet>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur border-b border-[#D4AF37]/30 shadow-sm" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl" style={{ background: `linear-gradient(135deg, ${GOLD}, ${COPPER})` }} />
                 <a href="/" className="flex items-center space-x-3">
                           <img 
                             src="/logo.png" 
                             alt="Moroccan Craft Gift Logo" 
                             className="h-12 w-auto object-contain hover:scale-105 transition-transform duration-200"
                           />
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
  About Moroccan Craft Gift
</h2>


                         </a>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="px-3 py-2 rounded-xl text-sm font-medium hover:bg-gray-100 transition"
                  style={{ color: "#111827" }}
                >
                  {label}
                </button>
              ))}
              <a
                href="mailto:hello@moroccancraft.gift"
                className="ml-2 inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow hover:shadow-md transition"
                style={{ backgroundColor: GOLD, color: "white" }}
              >
                Contact Us <Mail size={16} />
              </a>
            </nav>

            {/* Mobile */}
            <button className="md:hidden p-2 rounded-xl hover:bg-gray-100" onClick={() => setOpen((s) => !s)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 py-2 grid gap-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2 text-left hover:bg-gray-50"
                >
                  <Icon size={18} className="opacity-70" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
              <a
                href="mailto:hello@moroccancraft.gift"
                className="mt-2 inline-flex items-center gap-2 rounded-xl px-3 py-2 font-semibold justify-center"
                style={{ backgroundColor: GOLD, color: "white" }}
              >
                Contact Us <Mail size={16} />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="pt-28 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
                Celebrating Moroccan Heritage, <span style={{ color: GOLD }}>Handcrafted</span> for You
              </h1>
              <p className="mt-4 text-gray-600">
                We curate authentic Moroccan handicrafts from master artisans—
                copperware from Fez, leather from Marrakech, woodwork from Essaouira, and more.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#about" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold shadow hover:shadow-md"
                   style={{ backgroundColor: BLUE, color: "white" }}>
                  Learn More <ArrowRight size={16} />
                </a>
                <a href="#blog" className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold border"
                   style={{ borderColor: GOLD, color: "#111827" }}>
                  Read Our Blog
                </a>
              </div>
            </div>
          <motion.div 
  initial={{ opacity: 0 }} 
  animate={{ opacity: 1 }} 
  transition={{ delay: 0.15 }}
  className="h-56 sm:h-64 md:h-72 rounded-3xl shadow-lg overflow-hidden"
>
  <img 
    src={heroImage}  
     
     
    className="w-full h-full object-cover"
  />
</motion.div>
    </motion.div>  
        </div>
      </section>

      {/* About Us */}
    <Section id="about" title="About Us" accent={GOLD}>
        <p>
          Moroccan Craft Gift is a small team driven by love for heritage. Since 1995, we've partnered with
          family workshops and cooperatives to bring fair, beautiful, and durable crafts to the world. We pay
          artisans fairly, keep supply chains transparent, and reinvest in training and tools.
        </p>
        <Stats />
      </Section>

      {/* Our Artisans */}
     <Section id="artisans" title="Our Artisans" accent={COPPER}>
        <Cards
          items={[
            {
              title: "Copper Masters of Fez",
              text: "Hammered trays, lamps, and teapots shaped with centuries-old techniques.",
              img: "/Moroccan craft gift Copper Masters of Fez.png",
            },
            {
              title: "Leather of Marrakech",
              text: "Hand-stitched poufs and bags tanned with vegetal dyes.",
              img: "/Moroccan craft gift Leather of Marrakech.png",
            },
            {
              title: "Zellige & Wood Inlay",
              text: "Geometric tiles and thuya wood marquetry from artisan guilds.",
              img: "/Moroccan craft gift Zellige & Wood Inlay.jpg",
            },
          ]}
        />
      </Section>

      {/* Sustainability */}
     <Section id="sustainability" title="Sustainability" accent={BLUE}>
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            { h: "Fair Trade Pricing", p: "Long-term contracts and transparent margins for artisans." },
            { h: "Natural & Recycled Materials", p: "Vegetal dyes, reclaimed wood, and recycled metals where possible." },
            { h: "Low-Waste Packaging", p: "Plastic-free, recyclable packaging with minimal inks." },
            { h: "Community Investment", p: "1% of revenue funds apprenticeships and tool upgrades." },
          ].map((it, i) => (
            <li key={i} className="rounded-2xl border bg-white p-4 shadow-sm">
              <h4 className="font-semibold">{it.h}</h4>
              <p className="text-gray-600 mt-1">{it.p}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Press */}
     <Section id="press" title="Press" accent={GOLD}>
        <div className="grid gap-6 md:grid-cols-3">
          {["Casa ", "Marrakech ", "Fez "].map((name, i) => (
            <div key={i} className="rounded-2xl border bg-white p-6 shadow-sm flex items-center justify-center text-lg font-semibold text-gray-500">
              {name}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a
            href="mailto:press@moroccancraft.gift"
            className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 font-semibold shadow hover:shadow-md"
            style={{ backgroundColor: GOLD, color: "white" }}
          >
            Press Inquiries <Mail size={16} />
          </a>
        </div>
      </Section>

      {/* Careers */}
    <Section id="careers" title="Careers" accent={COPPER}>
        <p className="text-gray-600">We're growing! Open roles below—remote-friendly within Morocco.</p>
     {/*    <div className="mt-4 grid gap-4">
          {[
            { role: "E‑commerce Manager", type: "Full-time", loc: "Fez / Remote" },
            { role: "Content Creator (Arabic/English/French)", type: "Part-time", loc: "Remote" },
            { role: "Logistics Coordinator", type: "Contract", loc: "Casablanca" },
          ].map((job, i) => (
            <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-semibold">{job.role}</h4>
                <p className="text-sm text-gray-600">{job.type} • {job.loc}</p>
              </div>
              <a
                href={`mailto:careers@moroccancraft.gift?subject=Application: ${encodeURIComponent(job.role)}`}
                className="mt-3 sm:mt-0 inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold border"
                style={{ borderColor: GOLD, color: "#111827" }}
              >
                Apply Now <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>*/}
      </Section>

      {/* Blog */}
     <Section id="blog" title="Blog" accent={BLUE}>
        <Cards
          items={[
            {
              title: "Choosing the Perfect Copper Lamp",
              text: "A quick guide to shapes, finishes, and maintenance.",
              img: "/Morocan craft gift Choosing the Perfect Copper Lamp.png",
            },
            {
              title: "Behind the Leather Pouf",
              text: "From tanning to stitching: the full journey.",
              img: "/Moroccan craft gift Behind the Leather Pouf_result.jpg",
            },
            {
              title: "Zellige Patterns 101",
              text: "How artisans craft timeless geometry.",
              img: "/Moroccan craft gift Zellige Patterns 101.jpg",
            },
          ]}
        />
        <div className="mt-6">
          <a href="#" className="font-semibold underline">View all posts</a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 sm:grid-cols-2">
          <div>
            <div className="font-black text-lg" style={{ color: BLUE }}>Moroccan Craft Gift</div>
            <p className="text-gray-600 mt-2">Authentic crafts, fairly made. © {new Date().getFullYear()}</p>
          </div>
          <div className="flex items-center gap-3 sm:justify-end">
            <a href="mailto:hello@moroccancraft.gift" className="inline-flex items-center gap-2 rounded-xl px-4 py-2 font-semibold shadow hover:shadow-md"
               style={{ backgroundColor: GOLD, color: "white" }}>
              Contact <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Section({ id, title, accent, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-8 w-1.5 rounded-full" style={{ background: accent }} />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Cards({ items }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((card, i) => (
        <article key={i} className="group overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="h-40 sm:h-44 md:h-48 w-full overflow-hidden">
            <img src={card.img} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg">{card.title}</h3>
            <p className="mt-1 text-gray-600">{card.text}</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold border"
              style={{ borderColor: GOLD, color: "#111827" }}>
              Read More <ArrowRight size={16} />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

function Stats() {
  const stats = [
    { k: "1995", v: "Founded" },
    { k: "150+", v: "Artisans" },
    { k: "10+", v: "Cities" },
    { k: "1%", v: "Community Fund" },
  ];
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={i} className="rounded-2xl border bg-white p-5 shadow-sm text-center">
          <div className="text-2xl font-extrabold" style={{ color: BLUE }}>{s.k}</div>
          <div className="text-gray-600 text-sm">{s.v}</div>
        </div>
      ))}
         {/* زر واتساب ثابت */}
      <a
        href="https://wa.me/212687879451"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 transition-colors z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.8.73 5.53 2.11 7.95L.5 31.5l7.74-2.04A15.45 15.45 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28c-2.46 0-4.87-.66-6.97-1.91l-.5-.3-4.6 1.21 1.23-4.48-.33-.55A12.96 12.96 0 1 1 16 28.5zm7.27-9.55c-.4-.2-2.36-1.16-2.73-1.3-.37-.13-.64-.2-.9.2s-1.04 1.3-1.28 1.57c-.24.27-.47.3-.87.1s-1.7-.63-3.24-2.01c-1.2-1.07-2-2.4-2.24-2.8-.23-.4-.02-.62.17-.82.18-.18.4-.47.6-.7.2-.23.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.9-2.15-1.23-2.95-.32-.77-.65-.67-.9-.68h-.77c-.26 0-.68.1-1.03.5s-1.35 1.32-1.35 3.2 1.38 3.72 1.57 3.98c.2.27 2.72 4.15 6.6 5.82.92.4 1.64.64 2.2.82.92.3 1.77.26 2.44.16.74-.11 2.36-.96 2.7-1.89.34-.93.34-1.72.24-1.89-.1-.17-.36-.27-.76-.47z"/>
        </svg>
      </a>
    </div>
  );
}
