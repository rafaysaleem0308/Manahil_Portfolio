import { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight, BriefcaseBusiness, Check, Download, Github,
  GraduationCap, Linkedin, Mail, MapPin, Menu, Phone, X,
} from "lucide-react";
import Lenis from "lenis";
import { experience, highlights, peopleSkills, projects, services, technicalSkills, toolGroups } from "./data";
import "./styles.css";

const CV_URL = "/Manahil-Pakeeza-Resume.pdf";
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;
const SERVICES_AUTOPLAY_DELAY = 3500;
const navItems = [["Home", "home"], ["About", "about"], ["Skills", "skills"], ["Experience", "experience"], ["Services", "services"], ["Projects", "projects"], ["Contact", "contact"]];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [role, setRole] = useState(0);
  const [preloader, setPreloader] = useState(true);
  const [profilePhotoFailed, setProfilePhotoFailed] = useState(false);
  const [formState, setFormState] = useState("idle");
  const roles = ["HR Professional", "Customer Support", "Claims Administration", "Flutter and React Developer"];

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = reducedMotion ? 0 : window.setTimeout(() => setPreloader(false), 650);
    if (reducedMotion) setPreloader(false);
    const roleTimer = reducedMotion ? 0 : window.setInterval(() => setRole((current) => (current + 1) % roles.length), 2600);
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    }), { rootMargin: "-25% 0px -65% 0px" });
    navItems.forEach(([, id]) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((node) => revealObserver.observe(node));
    return () => { if (timer) window.clearTimeout(timer); if (roleTimer) window.clearInterval(roleTimer); observer.disconnect(); revealObserver.disconnect(); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: false, smoothWheel: true, lerp: 0.09, wheelMultiplier: 0.9, anchors: true });
    let animationFrame;
    const raf = (time) => { lenis.raf(time); animationFrame = window.requestAnimationFrame(raf); };
    animationFrame = window.requestAnimationFrame(raf);
    return () => { window.cancelAnimationFrame(animationFrame); lenis.destroy(); };
  }, []);


  async function submitContact(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (FORMSPREE_ENDPOINT) {
      setFormState("sending");
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
        if (!response.ok) throw new Error("Form submission failed");
        setFormState("sent"); form.reset();
      } catch { setFormState("error"); }
      return;
    }
    const values = new FormData(form);
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.get("name")}`);
    const body = encodeURIComponent(`${values.get("message")}\n\nReply to: ${values.get("email")}`);
    window.location.href = `mailto:pakeezamanahil151@gmail.com?subject=${subject}&body=${body}`;
    setFormState("fallback");
  }

  const closeMenu = () => setMenuOpen(false);
  return <>
    {preloader && <div className="preloader" aria-hidden="true"><strong>MP<span>.</span></strong><i /></div>}
    <header className="navbar">
      <a className="brand" href="#home" onClick={closeMenu} aria-label="Manahil Pakeeza home"><img className="brand-logo" src="/logo.png" alt="Manahil Pakeeza" /></a>
      <button className="nav-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="main-navigation">{menuOpen ? <X /> : <Menu />}</button>
      <nav id="main-navigation" className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
        {navItems.map(([label, id], index) => <a style={{ "--nav-index": index }} className={active === id ? "active" : ""} key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
        <a className="button button-small" href="#contact" onClick={closeMenu}>Hire me <ArrowUpRight size={15} aria-hidden="true" /></a>
        <div className="social-links"><a href="https://github.com/ManahilPkz" aria-label="GitHub" target="_blank" rel="noreferrer"><Github size={17} aria-hidden="true" /></a><a href="https://linkedin.com/in/manahil-pakeeza" aria-label="LinkedIn" target="_blank" rel="noreferrer"><Linkedin size={17} aria-hidden="true" /></a></div>
      </nav>
    </header>


    <main>
      <div className="hero-highlights-bg">
      <img className="hero-highlights-image" src="/images/hero-bg.webp" alt="" aria-hidden="true" width="1672" height="941" fetchPriority="high" decoding="async" />
      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <p className="eyebrow reveal">Hello, I am Manahil Pakeeza</p>
          <h1 className="hero-title reveal"><span className="hero-name-word">Manahil</span><br /><span className="hero-name-word accent-word">Pakeeza</span></h1>
          <p className="hero-role reveal"><BriefcaseBusiness size={17} aria-hidden="true" /> Aspiring HR &amp; Customer Support Professional</p>
          <p className="hero-subtitle reveal">A Computer Science student who brings technical thinking, thoughtful communication, and organised leadership to people-focused work.</p>
          <div className="hero-actions reveal"><a className="button" href="#contact">Get in touch <ArrowUpRight size={17} aria-hidden="true" /></a><a className="button button-outline download-button" href={CV_URL} download>Download CV <Download size={16} aria-hidden="true" /></a></div>
        </div>
        <div className="hero-portrait reveal">
          {profilePhotoFailed
            ? <div className="image-placeholder" role="img" aria-label="Profile photo file needed"><span>PHOTO FILE NEEDED</span><strong>Add profile photo to public</strong></div>
            : <img className="profile-photo" src="/Manahil-Pakeeza-Profile.jpeg" alt="Manahil Pakeeza" onError={() => setProfilePhotoFailed(true)} />}
          <span className="portrait-ring" aria-hidden="true" /><span className="location-pill"><MapPin size={14} aria-hidden="true" /> Faisalabad, Pakistan</span>
        </div>
        <div className="role-rotator" aria-live="polite"><span>Currently exploring</span><strong key={role}>{roles[role]}</strong></div><div className="scroll-cue"><span aria-hidden="true" /> Scroll to explore</div>
      </section>

      <section className="highlights section-wrap" id="highlights" aria-label="Highlights">{highlights.map(({ title, text, icon: Icon }) => <article className="highlight-card" key={title}><div className="icon-box"><Icon size={22} aria-hidden="true" /></div><h3>{title}</h3><p>{text}</p></article>)}</section>
      </div>

      <section className="dark-section" id="about"><div className="section-wrap">
        <SectionHeading number="01" label="About me" title="Technical mind.<br /><em>People-first</em> approach." />
        <div className="about-grid"><div className="bio"><p className="mini-label">My bio</p>
          <p className="large-copy reveal">I am a final-year Computer Science student at FAST-NUCES with a genuine interest in people, coordination, and creating organised experiences.</p>
          <p className="reveal">I have developed communication and leadership skills through event management, welfare initiatives, and student societies. My technical foundation in Flutter, React.js, and Node.js helps me understand systems and solve problems with structure.</p>
          <div className="info-table"><Info icon={Mail} label="Email" value="pakeezamanahil151@gmail.com" /><Info icon={Phone} label="Phone" value="+92 314-4957456" /><Info icon={MapPin} label="Location" value="Faisalabad, Pakistan" /><Info icon={GraduationCap} label="Education" value="BS Computer Science | 2022 to 2026" /></div>
          <a className="button button-outline" href={CV_URL} download>Download my CV <Download size={16} aria-hidden="true" /></a>
        </div></div>
      </div></section>

      <section className="stats section-wrap" id="stats" aria-label="Career and education facts">{[[4, "Years at FAST-NUCES", "04"], [5, "Leadership roles", "05+"], [4, "Academic projects", "04"], [2, "Years of leadership", "02+"]].map(([count, label, display]) => <Stat key={label} count={count} label={label} display={display} />)}</section>

      <section className="section-wrap skills-section" id="skills"><SectionHeading number="02" label="What I bring" title="Skills built for<br /><em>people and progress.</em>" />
        <div className="skills-layout"><div className="people-skills"><p className="mini-label">People &amp; operations</p>{peopleSkills.map(([name, Icon, level], index) => <div className="skill-bar reveal" key={name} style={{ "--skill-delay": `${index * 70}ms` }}><div><span><Icon size={17} aria-hidden="true" />{name}</span><small>{level}</small></div><i className={`level-${level.replaceAll(" ", "-").toLowerCase()}`} /></div>)}</div>
          <div className="technical-skills"><p className="mini-label">Technical skills</p>{technicalSkills.map(([name, Icon, level], index) => <div className="skill-bar reveal" key={name} style={{ "--skill-delay": `${index * 70}ms` }}><div><span><Icon size={17} aria-hidden="true" />{name}</span><small>{level}</small></div><i className="level-working-knowledge" /></div>)}</div>
        </div>
        <div className="tools-wrap"><p className="mini-label">Technical toolkit</p><div className="tool-groups">{toolGroups.map((group, index) => <div className="tool-group" key={group.title}><h3><span>0{index + 1}</span> {group.title}</h3><div className="tool-grid">{group.items.map(([name, Icon]) => <div className="tool" key={name}><Icon size={27} aria-hidden="true" /><span>{name}</span></div>)}</div></div>)}</div></div>
      </section>

      <section className="dark-section timeline-section" id="experience"><div className="section-wrap"><SectionHeading number="03" label="Experience" title="Leadership is<br /><em>action, not a title.</em>" />
        <div className="timeline">{experience.map(([roleName, organisation, description], index) => <article className="timeline-item reveal" key={roleName}><span className="timeline-number">0{index + 1}</span><div><h3>{roleName}</h3><p className="muted">{organisation}</p><p>{description}</p></div></article>)}</div>
      </div></section>

      <ServicesSlider />

      <section className="section-wrap projects-section" id="projects"><SectionHeading number="05" label="Selected projects" title="A technical foundation<br />with <em>creative range.</em>" />
        <div className="projects-grid">{projects.map(([name, stack, description]) => <article className="project-card" key={name}><div className="project-content"><p className="mini-label">{stack}</p><h3>{name}</h3><p>{description}</p><span className="project-link-placeholder"><ArrowUpRight size={15} aria-hidden="true" /> VERIFY / ADD LIVE LINK</span></div></article>)}</div>
      </section>

      <section className="education-section" id="education"><div className="education section-wrap"><div><p className="eyebrow accent-text reveal">Education</p><h2 className="reveal">Always learning,<br /><em>always growing.</em></h2></div><div className="education-list"><div className="reveal"><span>2022 to 2026</span><strong>BS Computer Science</strong><p>FAST-NUCES, Chiniot-Faisalabad</p></div><div className="reveal"><span>2020 to 2022</span><strong>Intermediate in Computer Science</strong><p>KIPS College</p></div></div></div></section>

      <section className="contact-section" id="contact"><div className="section-wrap"><p className="eyebrow reveal">Let us work together</p><h2 className="reveal">Ready to make<br /><em>an impact?</em></h2><div className="contact-grid"><div className="contact-details"><p className="reveal">I am open to opportunities in HR, customer support, claims administration, and roles where technology and people come together.</p><ContactLink icon={Mail} href="mailto:pakeezamanahil151@gmail.com">pakeezamanahil151@gmail.com</ContactLink><ContactLink icon={Phone} href="tel:+923144957456">+92 314-4957456</ContactLink><ContactLink icon={MapPin} href="https://maps.google.com/?q=Faisalabad,Pakistan">Faisalabad, Pakistan</ContactLink><ContactLink icon={Github} href="https://github.com/ManahilPkz">GitHub</ContactLink><ContactLink icon={Linkedin} href="https://linkedin.com/in/manahil-pakeeza">LinkedIn</ContactLink></div>
          <form className="contact-form" onSubmit={submitContact}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Message<textarea name="message" required rows="4" placeholder="Tell me a little about your opportunity..." /></label><button className="button" type="submit" disabled={formState === "sending"}>{formState === "sending" ? "Sending..." : "Send message"} <ArrowUpRight size={17} aria-hidden="true" /></button>
            {!FORMSPREE_ENDPOINT && <small>VERIFY: add your Formspree endpoint as VITE_FORMSPREE_ENDPOINT to enable direct submission. Until then, this form opens your email client.</small>}
            {formState === "sent" && <p className="form-status" role="status"><Check size={16} aria-hidden="true" /> Message sent. Thank you.</p>}{formState === "error" && <p className="form-status" role="alert">Could not send the message. Please email Manahil directly.</p>}
          </form></div></div></section>
    </main>

    <footer className="footer section-wrap"><a className="brand" href="#home" aria-label="Manahil Pakeeza home"><img className="brand-logo" src="/logo.png" alt="Manahil Pakeeza" /></a><span>Copyright 2026 Manahil Pakeeza</span><div className="footer-social"><a href="https://github.com/ManahilPkz" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/manahil-pakeeza" target="_blank" rel="noreferrer">LinkedIn</a><a className="back-top" href="#home" aria-label="Back to top"><ArrowUp size={16} aria-hidden="true" /></a></div></footer>
  </>;
}

function SectionHeading({ number, label, title }) { return <div className="section-heading reveal"><span className="section-number">{number}</span><div><p className="eyebrow accent-text">{label}</p><h2 dangerouslySetInnerHTML={{ __html: title }} /></div></div>; }
function ServicesSlider() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const pointerRef = useRef(null);
  const resumeTimer = useRef(null);
  const remainingRef = useRef(SERVICES_AUTOPLAY_DELAY);
  const resetScheduleRef = useRef(false);
  const [physicalIndex, setPhysicalIndex] = useState(services.length);
  const [transitioning, setTransitioning] = useState(true);
  const [dragX, setDragX] = useState(0);
  const [entered, setEntered] = useState(false);
  const [entering, setEntering] = useState(false);
  const [inView, setInView] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [dragging, setDragging] = useState(false);
  const [reducedMotion] = useState(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [progressKey, setProgressKey] = useState(0);
  const [, setLayoutVersion] = useState(0);
  const logicalIndex = ((physicalIndex - services.length) % services.length + services.length) % services.length;
  const autoplay = inView && !hidden && !dragging && !reducedMotion;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting && !entered) {
        setEntered(true); setEntering(true);
        window.setTimeout(() => setEntering(false), 1200);
      }
    }, { threshold: 0.2 });
    observer.observe(node);
    const resizeObserver = new ResizeObserver(() => setLayoutVersion((version) => version + 1));
    resizeObserver.observe(node.querySelector(".services-viewport"));
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); resizeObserver.disconnect(); document.removeEventListener("visibilitychange", onVisibility); window.clearTimeout(resumeTimer.current); };
  }, [entered]);

  useEffect(() => {
    if (!autoplay) return;
    let completed = false;
    const delay = remainingRef.current;
    const startedAt = performance.now();
    const timer = window.setTimeout(() => {
      completed = true;
      remainingRef.current = SERVICES_AUTOPLAY_DELAY;
      setTransitioning(true);
      setPhysicalIndex((index) => index + 1);
      setProgressKey((key) => key + 1);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      if (!completed) {
        if (resetScheduleRef.current) { remainingRef.current = SERVICES_AUTOPLAY_DELAY; resetScheduleRef.current = false; }
        else remainingRef.current = Math.max(0, delay - (performance.now() - startedAt));
      }
    };
  }, [autoplay, progressKey]);

  const move = (delta) => {
    resetScheduleRef.current = true;
    setTransitioning(true);
    setPhysicalIndex((index) => index + delta);
    setProgressKey((key) => key + 1);
  };
  const goTo = (target) => {
    const current = logicalIndex;
    const forward = (target - current + services.length) % services.length;
    const backward = forward - services.length;
    move(Math.abs(forward) <= Math.abs(backward) ? forward : backward);
  };
  const onTransitionEnd = (event) => {
    if (event.target !== trackRef.current) return;
    if (physicalIndex >= services.length * 2) {
      setTransitioning(false); setPhysicalIndex(services.length);
      window.requestAnimationFrame(() => setTransitioning(true));
    } else if (physicalIndex < services.length) {
      setTransitioning(false); setPhysicalIndex(services.length * 2 - 1);
      window.requestAnimationFrame(() => setTransitioning(true));
    }
  };
  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerRef.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, delta: 0, horizontal: false };
    setDragging(true);
  };
  const onPointerMove = (event) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.startX;
    const dy = event.clientY - pointer.startY;
    if (!pointer.horizontal && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      pointer.horizontal = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    if (pointer.horizontal) { pointer.delta = dx; setDragX(dx); }
  };
  const onPointerUp = (event) => {
    const pointer = pointerRef.current;
    if (!pointer || pointer.id !== event.pointerId) return;
    if (pointer.horizontal && Math.abs(pointer.delta) > 45) move(pointer.delta < 0 ? 1 : -1);
    pointerRef.current = null; setDragX(0);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setDragging(false), 600);
  };
  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
  };
  const slides = [...services, ...services, ...services];
  const activeOffset = trackRef.current?.children[physicalIndex]?.offsetLeft ?? 0;
  return <section ref={sectionRef} className={`services-section section-wrap services-slider${entered ? " is-entered" : ""}${entering ? " is-entering" : ""}`} style={{ "--services-autoplay-delay": `${SERVICES_AUTOPLAY_DELAY}ms` }} id="services" aria-roledescription="carousel" aria-label="Services" onKeyDown={onKeyDown}>
    <div className="services-heading-row"><SectionHeading number="04" label="Services" title="Ways I can<br /><em>contribute.</em>" /><div className="services-controls" aria-label="Carousel controls">
      <button type="button" className="slider-icon-button" aria-label="Previous service" onClick={() => move(-1)}><ArrowLeft size={19} aria-hidden="true" /></button>
      <span className="slider-counter" aria-live={autoplay ? "off" : "polite"} aria-atomic="true"><span key={logicalIndex} className="slider-counter-value">{String(logicalIndex + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}</span></span>
      <button type="button" className="slider-icon-button" aria-label="Next service" onClick={() => move(1)}><ArrowRight size={19} aria-hidden="true" /></button>
    </div></div>
    <div className="services-viewport" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>
      <div ref={trackRef} className={`services-track${transitioning ? " is-transitioning" : ""}`} onTransitionEnd={onTransitionEnd} style={{ transform: `translate3d(${-activeOffset + dragX}px,0,0)` }}>
        {slides.map(([name, Icon], index) => {
          const sourceIndex = index % services.length;
          const clone = index < services.length || index >= services.length * 2;
          const activeSlide = index === physicalIndex;
          return <article key={`${sourceIndex}-${index}`} className={`service-slide${activeSlide ? " is-active" : ""}`} style={{ "--stagger": `${Math.max(0, sourceIndex) * 80}ms` }} role="group" aria-roledescription="slide" aria-label={`${sourceIndex + 1} of ${services.length}`} aria-hidden={clone ? "true" : undefined}>
            <div className="service-card"><div className="icon-box"><Icon size={22} aria-hidden="true" /></div><span>0{sourceIndex + 1}</span><h3>{name}</h3></div>
          </article>;
        })}
      </div>
    </div>
    <div className="services-slider-footer"><div className="services-progress" aria-hidden="true"><span key={progressKey} className="is-running" style={{ animationPlayState: autoplay ? "running" : "paused" }} /></div><div className="services-dots" aria-label="Choose a service">{services.map(([name], index) => <button type="button" key={name} className={index === logicalIndex ? "is-active" : ""} aria-label={`Go to service ${index + 1}: ${name}`} aria-current={index === logicalIndex ? "true" : undefined} onClick={() => goTo(index)} />)}</div></div>
  </section>;
}
function Info({ icon: Icon, label, value }) { return <div><span><Icon size={15} aria-hidden="true" /> {label}</span><strong>{value}</strong></div>; }
function ContactLink({ icon: Icon, href, children }) { return <a href={href} target={href.startsWith("https:") ? "_blank" : undefined} rel={href.startsWith("https:") ? "noreferrer" : undefined}><Icon size={18} aria-hidden="true" />{children}</a>; }
function Stat({ count, label, display }) {
  const ref = useRef(null); const [value, setValue] = useState(0);
  useEffect(() => { const node = ref.current; if (!node) return; if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setValue(count); return; } const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const start = performance.now(); const tick = (now) => { const progress = Math.min((now - start) / 900, 1); setValue(Math.round(count * (1 - Math.pow(1 - progress, 3)))); if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); observer.disconnect(); }, { threshold: 0.5 }); observer.observe(node); return () => observer.disconnect(); }, [count]);
  return <div className="stat" ref={ref}><strong>{value === count ? display : String(value).padStart(2, "0")}</strong><span>{label}</span></div>;
}

const rootElement = document.getElementById("root");
if (rootElement) createRoot(rootElement).render(<App />);
