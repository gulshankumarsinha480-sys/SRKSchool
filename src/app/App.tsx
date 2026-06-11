import { useState } from "react";
import { Link } from "react-router";
import { EnquiryForm } from "./EnquiryForm";
import schoolBuilding from "../imports/a608a9f0-d495-4218-9000-bbaa43389dd8.jpeg";
import procession from "../imports/f64231b0-9640-4dd1-9ac1-5cb1c242059b.jpeg";
import independenceDay from "../imports/6a3ce17a-dd5b-47ae-9474-87d2711308df.jpeg";
import culturalDance from "../imports/1ce297e4-3e6d-4f0e-8626-1355b011664f.jpeg";
import awardCeremony1 from "../imports/3429b2d8-0e2e-4718-8887-37fa1c582b27.jpeg";
import awardCeremony2 from "../imports/8447c28d-a9cd-4e6a-a33f-168b683a91b6.jpeg";
import awardCeremony3 from "../imports/9f96df38-9db3-44d9-9ecb-be53217f05d1.jpeg";
import audience from "../imports/9582a195-6d26-445d-b3fd-267546dd4458.jpeg";
import principalPhoto from "../imports/de98e893-e9f3-4e2f-ada4-4cb1221f6d3b.jpeg";

const navLinks = ["Home", "About", "Activities", "Gallery", "Contact"];

const galleryItems = [
  { src: independenceDay, label: "Independence Day" },
  { src: culturalDance, label: "Annual Function" },
  { src: procession, label: "School Procession" },
  { src: awardCeremony1, label: "Award Ceremony" },
  { src: awardCeremony2, label: "Award Ceremony" },
  { src: awardCeremony3, label: "Special Honours" },
  { src: audience, label: "Community Gathering" },
];

const coCurricular = [
  {
    icon: "🏅",
    title: "Sports & Athletics",
    desc: "Cricket, football, kabaddi, and athletics tournaments foster physical fitness, sportsmanship, and healthy competition among students.",
  },
  {
    icon: "🎭",
    title: "Annual Function – Udaan",
    desc: "Our flagship cultural event 'Udaan' brings together dance, drama, music, and skits — celebrating creativity and stage confidence.",
  },
  {
    icon: "🎨",
    title: "Art & Craft",
    desc: "Students explore painting, drawing, and craft work, nurturing fine motor skills and creative expression from an early age.",
  },
  {
    icon: "🗣️",
    title: "Debate & Quiz",
    desc: "Inter-class debates and quiz competitions sharpen critical thinking, public speaking, and general knowledge.",
  },
  {
    icon: "🇮🇳",
    title: "National Celebrations",
    desc: "Independence Day, Republic Day, and Gandhi Jayanti are celebrated with patriotic fervour — parades, speeches, and cultural programmes.",
  },
  {
    icon: "🤝",
    title: "Community Service",
    desc: "Students participate in cleanliness drives, awareness programmes, and community outreach — building empathy and civic responsibility.",
  },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }} className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">SRK</div>
            <div>
              <div className="font-bold text-foreground leading-tight text-sm">S.R.K. Public School</div>
              <div className="text-xs text-muted-foreground leading-tight">Haldia, West Bengal</div>
            </div>
          </div>
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">{link}</a>
              </li>
            ))}
            <li>
              <Link to="/admissions" className="bg-primary text-white text-sm px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
                Admissions
              </Link>
            </li>
          </ul>
          <button className="md:hidden text-foreground p-2" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-foreground mb-1" style={{ transform: menuOpen ? "rotate(45deg) translate(3px, 3px)" : "" }} />
            <div className="w-5 h-0.5 bg-foreground mb-1" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="w-5 h-0.5 bg-foreground" style={{ transform: menuOpen ? "rotate(-45deg) translate(3px, -3px)" : "" }} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-foreground/70 hover:text-primary py-1" onClick={() => setMenuOpen(false)}>{link}</a>
            ))}
            <Link
              to="/admissions"
              className="bg-primary text-white text-sm px-4 py-2 rounded-full text-center mt-1"
              onClick={() => setMenuOpen(false)}
            >
              Admissions Open
            </Link>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="home" className="relative pt-16 h-[85vh] min-h-[500px] flex items-end">
        <img src={schoolBuilding} alt="S.R.K. Public School" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
          <div className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">Est. Haldia, West Bengal</div>
          <h1 className="text-white leading-tight mb-2" style={{ fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 800 }}>S.R.K. PUBLIC SCHOOL</h1>
          <p className="text-white/70 mb-6" style={{ fontSize: "0.85rem", letterSpacing: "0.05em" }}>( SARVEPALLI RADHA KRISHNAN PUBLIC SCHOOL )</p>
          <p className="text-white/85 max-w-xl mb-8" style={{ fontSize: "1.1rem" }}>Nurturing young minds with quality education, cultural values, and a spirit of excellence.</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/admissions" className="bg-primary text-white font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
              Apply for Admission
            </Link>
            <a href="#activities" className="bg-white/15 text-white font-semibold px-6 py-3 rounded-full border border-white/30 hover:bg-white/25 transition-colors">Explore Activities</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-primary text-white py-6">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[{ num: "500+", label: "Students Enrolled" }, { num: "25+", label: "Qualified Teachers" }, { num: "10+", label: "Years of Excellence" }, { num: "100%", label: "Board Pass Rate" }].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold">{s.num}</div>
              <div className="text-white/80 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">About Us</div>
            <h2 className="text-foreground mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700 }}>Where Every Child's Future Shines</h2>
            <p className="text-muted-foreground mb-4" style={{ lineHeight: 1.8 }}>S.R.K. Public School, Haldia, is dedicated to providing holistic education that blends academic rigor with cultural values and moral character.</p>
            <p className="text-muted-foreground mb-6" style={{ lineHeight: 1.8 }}>From Nursery to Class VIII, our experienced faculty guide students in a safe, nurturing environment.</p>
            <ul className="flex flex-col gap-3">
              {["National Curriculum (Nursery – Class VIII)", "Annual cultural & sports events", "Community-centred learning", "Experienced and dedicated faculty"].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs shrink-0 font-bold">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img src={culturalDance} alt="Cultural Dance at Annual Function" className="w-full h-80 object-cover" />
          </div>
        </div>
      </section>

      {/* Chairman & Principal */}
      <section className="bg-muted py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Our Leadership</div>
            <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Guided by Vision & Dedication</h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-border overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Photo */}
              <div className="md:col-span-2 bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center p-8">
                <div className="relative">
                  <div className="w-44 h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                    <img
                      src={principalPhoto}
                      alt="Mr. Vikash Kumar Sinha"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap shadow-md">
                    Chairman & Principal
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="md:col-span-3 p-8 flex flex-col justify-center">
                <div className="text-primary font-semibold text-xs uppercase tracking-widest mb-1">Message from the Desk</div>
                <h3 className="text-foreground font-bold text-2xl mb-1">Mr. Vikash Kumar Sinha</h3>
                <p className="text-muted-foreground text-sm mb-4">Chairman & Principal, S.R.K. Public School</p>

                <blockquote className="border-l-4 border-primary pl-4 text-foreground/80 text-sm italic leading-relaxed mb-5">
                  "Education is not merely the filling of a pail, but the lighting of a fire. At S.R.K., we strive to ignite that spark in every child — nurturing them to be compassionate, curious, and capable citizens of tomorrow."
                </blockquote>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Under the visionary leadership of Mr. Vikash Kumar Sinha, S.R.K. Public School has grown into a trusted institution in Haldia. With a deep commitment to quality education and holistic development, he has steered the school towards academic excellence while keeping cultural values at its core.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["CBSE Curriculum", "10+ Years Leadership", "Holistic Education"].map((tag) => (
                    <span key={tag} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Co-Curricular Activities */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Beyond the Classroom</div>
          <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Co-Curricular Activities</h2>
          <p className="text-muted-foreground text-sm mt-3 max-w-xl mx-auto">We believe in all-round development. Our co-curricular programmes build character, confidence, and creativity alongside academics.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {coCurricular.map((item) => (
            <div key={item.title} className="bg-white border border-border rounded-2xl p-6 hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-primary/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-2 text-sm">{item.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="bg-muted py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">School Life</div>
            <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Rich Activities & Celebrations</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: independenceDay, title: "Independence Day", desc: "Students celebrate national pride with parades, performances, and patriotic formations." },
              { img: culturalDance, title: "Annual Function", desc: "Our flagship event 'Udaan' showcases dance, music, drama, and student achievements." },
              { img: procession, title: "School Processions", desc: "Organised marches that foster discipline, teamwork, and civic pride." },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border">
                <img src={card.img} alt={card.title} className="w-full h-52 object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm" style={{ lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Photo Gallery</div>
          <h2 className="text-foreground" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Moments That Define Us</h2>
        </div>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {galleryItems.map((item, i) => (
            <div key={i} className="break-inside-avoid rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group mb-4">
              <img src={item.src} alt={item.label} className="w-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-medium">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-foreground text-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-primary font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</div>
            <h2 className="text-white mb-5" style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 700 }}>Admissions Open — Join Our Family</h2>
            <p className="text-white/70 mb-6" style={{ lineHeight: 1.8 }}>We welcome new students from Nursery to Class VIII.</p>
            <div className="flex flex-col gap-4">
              {[
                { icon: "📍", label: "Address", val: "S.R.K. Public School, Haldia, West Bengal" },
                { icon: "📞", label: "Phone", val: "+91 03224-352672 / 9002530144" },
                { icon: "🕗", label: "School Hours", val: "Monday – Saturday, 7:00 AM – 3:10 PM" },
              ].map((info) => (
                <div key={info.label} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{info.icon}</span>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wide">{info.label}</div>
                    <div className="text-white/90 text-sm">{info.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>

      <footer className="bg-black text-white/50 text-xs text-center py-5 px-4">
        <p>© {new Date().getFullYear()} S.R.K. Public School, Haldia, West Bengal. All rights reserved.</p>
        <p className="mt-1">Love · Peace · Sacrifice</p>
      </footer>
    </div>
  );
}