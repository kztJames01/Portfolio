"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── data ── */

const heroWords = ["builder", "engineer", "focused", "committed", "creative"];

const stats = [
  { value: "20+", label: "projects" },
  { value: "3+", label: "years building" },
  { value: "100%", label: "delivery focus" }
];

const experiences = [
  {
    role: "cxs-it student assistant",
    company: "university of texas at arlington",
    period: "jan 2025 - present",
    bullets: [
      "facilitated it service management by resolving software, hardware, and network connectivity issues.",
      "coordinated it resource management and supported technology setups for events and classroom needs."
    ]
  },
  {
    role: "backend development intern",
    company: "the experts tribe",
    period: "may 2025 - jul 2025",
    bullets: [
      "developed and maintained a full-stack consulting application using node.js and mongodb.",
      "managed the development lifecycle including docker containerization and ci/cd pipeline integration."
    ]
  }
];

const skillRows = [
  [
    { name: "python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "c++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "javascript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "dart", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
  ],
  [
    { name: "next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "react", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "pytorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  ],
  [
    { name: "mongodb", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "windows", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
    { name: "git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "dsa", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  ]
];

const projects = [
  {
    title: "haltchain",
    category: "compliance infrastructure",
    summary: "compliance control plane for agentic systems — policy enforcement, risk scoring, and signed audit evidence.",
    image: "https://image.thum.io/get/width/600/crop/400/noanimate/https://haltchain.com",
    live: "https://haltchain.com",
    techIcons: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    ]
  },
  {
    title: "memo-log",
    category: "developer tooling",
    summary: "deterministic project memory — same repo state produces the same snapshot for grounded ai context.",
    image: "https://image.thum.io/get/width/600/crop/400/noanimate/https://memo-log.netlify.app",
    live: "https://memo-log.netlify.app/",
    techIcons: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    ]
  }
];

const contacts = [
  { label: "email", value: "alphakzt99@gmail.com", href: "mailto:alphakzt99@gmail.com", type: "email" },
  { label: "github", value: "github.com/kztJames01", href: "https://github.com/kztJames01", type: "github" },
  { label: "linkedin", value: "linkedin.com/in/kztJames01", href: "https://linkedin.com/in/kztJames01", type: "linkedin" }
];

/* ── hooks ── */

function useRotatingWord(words, interval = 2200) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex((p) => (p + 1) % words.length), interval);
    return () => clearInterval(timer);
  }, [words, interval]);
  return { word: words[index], index };
}

function useCursorBubble() {
  const [pos, setPos] = useState({ x: -50, y: -50 });
  const [hovering, setHovering] = useState(false);
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    const onOver = (e) => { if (e.target.closest("a, button")) setHovering(true); };
    const onOut = (e) => { if (e.target.closest("a, button")) setHovering(false); };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    window.addEventListener("pointerout", onOut);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerout", onOut);
    };
  }, []);
  return { pos, hovering };
}

/* ── variants ── */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" }
  })
};

/* ── animated section ── */

function AnimatedSection({ children, className, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section className={className} id={id} ref={ref}>
      <motion.div
        className="section-inner"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ── skill carousel ── */

function SkillCarouselRow({ skills, direction = "left", speed = 30 }) {
  const doubled = [...skills, ...skills];
  return (
    <div className="carousel-row">
      <div className={`carousel-track carousel-${direction}`} style={{ animationDuration: `${speed}s` }}>
        {doubled.map((skill, i) => (
          <div className="skill-card" key={`${skill.name}-${i}`}>
            <img src={skill.icon} alt={skill.name} width={36} height={36} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── project carousel ── */

function ProjectCarousel({ items }) {
  const trackRef = useRef(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const checkScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 380, behavior: "smooth" });
  };

  return (
    <div className="project-carousel-wrapper">
      <div className="project-carousel-controls">
        <button
          type="button"
          className={`carousel-btn${canLeft ? "" : " disabled"}`}
          onClick={() => scroll(-1)}
          aria-label="previous project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          type="button"
          className={`carousel-btn${canRight ? "" : " disabled"}`}
          onClick={() => scroll(1)}
          aria-label="next project"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>
      <div className="project-carousel-track" ref={trackRef}>
        {items.map((project) => (
          <article key={project.title} className="project-card">
            <a href={project.live} target="_blank" rel="noreferrer" className="project-image">
              <img src={project.image} alt={project.title} />
              <span className="project-live-badge">live preview</span>
            </a>
            <div className="project-body">
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <div className="project-footer">
                <div className="project-tech-icons">
                  {project.techIcons.map((icon, j) => (
                    <img key={j} src={icon} alt="" width={22} height={22} />
                  ))}
                </div>
                <a href={project.live} target="_blank" rel="noreferrer" className="source-btn">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                  visit live
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ── icons ── */

function ContactIcon({ type }) {
  const paths = {
    email: "M4 6.75A2.75 2.75 0 0 1 6.75 4h10.5A2.75 2.75 0 0 1 20 6.75v10.5A2.75 2.75 0 0 1 17.25 20H6.75A2.75 2.75 0 0 1 4 17.25V6.75Zm2 1.04v.19l6.58 5.07c.86.66 2.06.66 2.92 0L18 8V7.8a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75Zm12 2.73-2.52 1.95a4.39 4.39 0 0 1-5.35 0L6 10.52v6.73c0 .41.34.75.75.75h10.5c.41 0 .75-.34.75-.75v-6.73Z",
    github: "M12 3.5A8.5 8.5 0 0 0 3.5 12c0 3.76 2.44 6.95 5.82 8.08.43.08.58-.19.58-.41v-1.63c-2.37.51-2.87-1-2.87-1-.39-.99-.95-1.25-.95-1.25-.77-.53.06-.52.06-.52.86.06 1.31.87 1.31.87.75 1.29 1.98.92 2.47.7.08-.56.3-.93.54-1.14-1.89-.21-3.88-.95-3.88-4.24 0-.94.34-1.7.87-2.31-.08-.22-.38-1.09.09-2.28 0 0 .71-.23 2.33.88a8.1 8.1 0 0 1 4.24 0c1.63-1.11 2.34-.88 2.34-.88.46 1.19.17 2.06.09 2.28.54.61.87 1.37.87 2.31 0 3.29-2 4.03-3.89 4.24.31.27.58.8.58 1.62v2.39c0 .22.15.5.58.41A8.5 8.5 0 0 0 20.5 12 8.5 8.5 0 0 0 12 3.5Z",
    linkedin: "M6.9 8.4a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8ZM5.7 10h2.4v8h-2.4v-8Zm4 0h2.3v1.1h.03c.32-.6 1.1-1.24 2.28-1.24 2.44 0 2.89 1.61 2.89 3.7V18h-2.4v-3.9c0-.93-.01-2.12-1.29-2.12-1.29 0-1.49 1.01-1.49 2.05V18H9.7v-8Z"
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[type]} />
    </svg>
  );
}

/* ── main ── */

export default function Home() {
  const { word, index: wordIndex } = useRotatingWord(heroWords);
  const { pos, hovering } = useCursorBubble();

  const orbRef = useRef({ x: 0, y: 0 });
  const [orb, setOrb] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    orbRef.current = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.2 };
    setOrb(orbRef.current);
  }, []);

  useEffect(() => {
    let frame;
    let tick = 0;
    const animate = () => {
      tick += 0.012;
      const cur = orbRef.current;
      const dx = pos.x - cur.x;
      const dy = pos.y - cur.y;
      const next = {
        x: cur.x + dx * 0.03 + Math.sin(tick * 1.4) * 0.8,
        y: cur.y + dy * 0.03 + Math.cos(tick * 1.1) * 0.7
      };
      orbRef.current = next;
      setOrb(next);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [pos]);

  return (
    <>
      <div
        className={`cursor-bubble${hovering ? " hovering" : ""}`}
        style={{ transform: `translate(${pos.x - 8}px, ${pos.y - 8}px)` }}
      />
      <div
        className="bubble"
        style={{ transform: `translate(${orb.x - 160}px, ${orb.y - 160}px)` }}
      />

      <header className="topbar">
        <a href="#home" className="brand"><img src="/logo.png" alt="kzt" className="brand-logo" /></a>
        <nav>
          <a href="#home">home</a>
          <a href="#experience">experience</a>
          <a href="#skills">skills</a>
          <a href="#projects">projects</a>
          <a href="#contact">contact</a>
        </nav>
        <div className="command-pill">
          search <kbd>ctrl k</kbd>
        </div>
      </header>

      {/* ── hero ── */}
      <AnimatedSection className="section section-hero" id="home">
        <motion.div className="hero-layout" variants={fadeUp}>
          {/* left: rotating word */}
          <div className="hero-left">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                className="hero-rotating-word"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {word}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* separator */}
          <div className="hero-divider" />

          {/* right: name + subtitle + description */}
          <div className="hero-right">
            <h1 className="hero-name">kaung zaw thant</h1>
            <p className="hero-subtitle">ai engineer</p>
            <p className="hero-copy">
              i design and ship ai-native software — fast interfaces, reliable backends,
              and practical automation that creates measurable product impact.
            </p>
          </div>
        </motion.div>

        <motion.div className="hero-cta" variants={fadeUp}>
          <a href="#projects" className="btn btn-primary">view projects</a>
          <a href="#contact" className="btn btn-ghost">get in touch</a>
        </motion.div>

        <motion.div className="stats" variants={staggerContainer}>
          {stats.map((item, i) => (
            <motion.div key={item.label} className="stat" variants={scaleIn} custom={i}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="scroll-indicator">
          <div className="scroll-mouse" />
          <span>scroll</span>
        </div>
      </AnimatedSection>

      {/* ── experience ── */}
      <AnimatedSection className="section section-experience" id="experience">
        <motion.h2 variants={fadeUp}>experience</motion.h2>
        <div className="timeline">
          {experiences.map((item, i) => (
            <motion.article key={item.role} className="timeline-item" variants={fadeUp} custom={i}>
              <span className="dot" />
              <div className="timeline-content">
                <p className="period">{item.period}</p>
                <h3>{item.role}</h3>
                <p className="company">{item.company}</p>
                <ul className="timeline-bullets">
                  {item.bullets.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </AnimatedSection>

      {/* ── skills ── */}
      <AnimatedSection className="section section-skills" id="skills">
        <motion.h2 variants={fadeUp}>the skills that i ship with</motion.h2>
        <div className="carousel-container">
          <SkillCarouselRow skills={skillRows[0]} direction="left" speed={28} />
          <SkillCarouselRow skills={skillRows[1]} direction="right" speed={32} />
          <SkillCarouselRow skills={skillRows[2]} direction="left" speed={26} />
        </div>
      </AnimatedSection>

      {/* ── projects ── */}
      <AnimatedSection className="section section-projects" id="projects">
        <motion.h2 variants={fadeUp}>projects</motion.h2>
        <ProjectCarousel items={projects} />
      </AnimatedSection>

      {/* ── contact ── */}
      <AnimatedSection className="section section-contact" id="contact">
        <motion.h2 variants={fadeUp}>get in touch</motion.h2>
        <motion.div className="contact-split" variants={fadeUp}>
          <div className="contact-links">
            {contacts.map((contact, i) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.type === "email" ? undefined : "_blank"}
                rel={contact.type === "email" ? undefined : "noreferrer"}
                className="contact-card"
                variants={scaleIn}
                custom={i}
              >
                <ContactIcon type={contact.type} />
                <div>
                  <p>{contact.label}</p>
                  <span>{contact.value}</span>
                </div>
              </motion.a>
            ))}
          </div>
          <div className="contact-separator" />
          <form
            className="contact-form"
            action="https://formsubmit.co/alphakzt99@gmail.com"
            method="POST"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value="" />
            <input type="text" name="name" placeholder="your name" required />
            <input type="email" name="email" placeholder="your email" required />
            <textarea name="message" placeholder="your message" rows="5" required />
            <button type="submit" className="form-submit">send message</button>
          </form>
        </motion.div>
      </AnimatedSection>
    </>
  );
}
