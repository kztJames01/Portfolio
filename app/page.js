const experiences = [
  {
    role: "CXS-IT Student Assistant",
    company: "University of Texas at Arlington",
    period: "Jan 2025 - Present",
    bullets: [
      "Resolved ServiceNow tickets for software, hardware, and network issues across campus.",
      "Cut my manager's workload by about 40% by handling device setup, troubleshooting, and classroom/event IT on my own.",
      "Set up laptops, projectors, and network gear for events and kept classroom tech running during the semester."
    ]
  },
  {
    role: "Backend Development Intern",
    company: "The Experts Tribe",
    period: "May 2025 - Jul 2025",
    bullets: [
      "Shipped a full consulting website end-to-end in a 3-month internship using Node.js and MongoDB.",
      "Worked with the frontend team on UI design and split the app into microservices so features could ship independently.",
      "Containerized services with Docker and hooked everything into a CI/CD pipeline for faster, safer deploys."
    ]
  }
];

const skills = [
  "Python", "C++", "JavaScript", "Dart", "Java",
  "Django", "Next.js", "React", "Flutter", "Tailwind CSS",
  "PyTorch", "Node.js", "MongoDB", "Docker", "Linux", "Git"
];

const softSkills = [
  "Customer Service", "Talent Management", "Quality Assurance",
  "Microsoft Suite", "Adobe Illustrator", "Photoshop"
];

const projects = [
  {
    title: "Silo",
    tag: "Prompt testing / CI",
    summary: "Helps teams ship better prompts. Syncs new versions, compares against baselines, runs drift evaluation on test cases, and surfaces pass/fail signals with operator diagnostics. Supports suites, versioning, and human review.",
    live: "https://silo-frontend.onrender.com/",
    image: "/projects/silo.png",
    stack: ["React", "Node.js", "CI/CD"]
  },
  {
    title: "Pantry",
    tag: "Recipe platform",
    summary: "Django recipe search and management app backed by TheMealDB. Users can discover recipes, search with fuzzy ingredient matching, sign in, and save favorites.",
    live: "https://pantry-61ud.onrender.com",
    image: "/projects/pantry.png",
    stack: ["Django", "Python", "PostgreSQL"]
  },
  {
    title: "Sublease",
    tag: "Housing marketplace",
    summary: "Website for students to find subleases they can trust. Search through listed places and streamline the process from discovery to contact.",
    live: "https://sublease-tau.vercel.app/",
    image: "/projects/sublease.png",
    stack: ["React", "SQL", "Django"]
  },
  {
    title: "Haltchain",
    tag: "Compliance infrastructure",
    summary: "Compliance control plane for agentic systems — policy enforcement, risk scoring, and signed audit evidence before actions execute.",
    live: "https://haltchain.com",
    image: "/projects/haltchain.png",
    stack: ["Rust", "Node.js", "Docker"]
  },
  {
    title: "Memo-log",
    tag: "Developer tooling",
    summary: "Deterministic project memory. Same repo state produces the same snapshot so AI context stays tied to real files.",
    live: "https://memo-log.netlify.app/",
    image: "https://image.thum.io/get/width/600/crop/400/noanimate/https://memo-log.netlify.app",
    stack: ["TypeScript"]
  }
];

const contacts = [
  { label: "Email", value: "alphakzt99@gmail.com", href: "mailto:alphakzt99@gmail.com" },
  { label: "GitHub", value: "github.com/kztJames01", href: "https://github.com/kztJames01" },
  { label: "LinkedIn", value: "linkedin.com/in/kztJames01", href: "https://linkedin.com/in/kztJames01" }
];

export default function Home() {
  return (
    <>
      <header className="header">
        <a href="#home" className="logo-link">
          <img src="/logo.png" alt="KZT" className="logo" />
          <span>Kaung Zaw Thant</span>
        </a>
        <nav className="nav">
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#soft-skills">Soft Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="block hero" id="home">
          <p className="eyebrow">Software Developer</p>
          <h1>Kaung Zaw Thant</h1>
          <p className="lead">
            I build full-stack web apps — Django and Node backends, React and Next.js frontends,
            and deployed projects you can click through below.
          </p>
          <div className="hero-links">
            <a href="#projects" className="btn primary">View projects</a>
            <a href="#contact" className="btn">Contact me</a>
          </div>
        </section>

        <section className="block" id="experience">
          <h2>Experience</h2>
          <div className="exp-list">
            {experiences.map((job) => (
              <article className="exp-card" key={job.role}>
                <div className="exp-head">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="company">{job.company}</p>
                  </div>
                  <span className="date">{job.period}</span>
                </div>
                <ul>
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="block" id="skills">
          <h2>Technical Skills</h2>
          <div className="skill-grid">
            {skills.map((s) => (
              <span className="skill-tag" key={s}>{s}</span>
            ))}
          </div>
        </section>

        <section className="block" id="soft-skills">
          <h2>Soft Skills</h2>
          <div className="skill-grid">
            {softSkills.map((s) => (
              <span className="skill-tag soft" key={s}>{s}</span>
            ))}
          </div>
        </section>

        <section className="block" id="projects">
          <h2>Projects</h2>
          <p className="section-note">All links go to live deployments.</p>
          <div className="project-grid">
            {projects.map((p) => (
              <article className="project-card" key={p.title}>
                <a href={p.live} target="_blank" rel="noreferrer" className="project-thumb">
                  <img src={p.image} alt={p.title} />
                </a>
                <div className="project-info">
                  <p className="project-tag">{p.tag}</p>
                  <h3>{p.title}</h3>
                  <p>{p.summary}</p>
                  <div className="project-meta">
                    <div className="stack">
                      {p.stack.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <a href={p.live} target="_blank" rel="noreferrer" className="live-link">
                      Visit site →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="block contact-block" id="contact">
          <h2>Contact</h2>
          <div className="contact-wrap">
            <div className="contact-list">
              {contacts.map((c) => (
                <a key={c.label} href={c.href} target={c.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" className="contact-row">
                  <strong>{c.label}</strong>
                  <span>{c.value}</span>
                </a>
              ))}
            </div>
            <form className="contact-form" action="https://formsubmit.co/alphakzt99@gmail.com" method="POST">
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="name" placeholder="Your name" required />
              <input type="email" name="email" placeholder="Your email" required />
              <textarea name="message" placeholder="Message" rows="4" required />
              <button type="submit">Send</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Kaung Zaw Thant</p>
      </footer>
    </>
  );
}
