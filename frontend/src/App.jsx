import { useEffect, useState } from "react";
import { profile, flow, projects, skills, techStack, experience, stats } from "./data.js";

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

function BackgroundEffects() {
  useEffect(() => {
    let frame;
    function move(event) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
      });
    }
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return <div className="background-effects" aria-hidden="true"><span className="cursor-aura" /><span className="bg-orb orb-a" /><span className="bg-orb orb-b" /><span className="bg-beam" /></div>;
}

function Contact() {
  const [state, setState] = useState({ status: "idle", error: "" });

  async function send(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.website) {
      setState({ status: "sent", error: "" });
      e.currentTarget.reset();
      return;
    }
    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      setState({ status: "error", error: "Email service is not configured yet. Please connect with me on LinkedIn." });
      return;
    }
    setState({ status: "sending", error: "" });
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            from_name: data.name,
            reply_to: data.email,
            subject: data.subject,
            message: data.message,
            to_name: profile.name,
          },
        }),
      });
      if (!res.ok) {
        throw new Error(res.status === 429 ? "Too many messages. Try again in a minute." : "Message not sent. Please try again.");
      }
      setState({ status: "sent", error: "" });
      e.currentTarget.reset();
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  }

  return (
    <form onSubmit={send} className="form">
      <div className="form-row">
        <label>Your name<input name="name" required maxLength={100} placeholder="Your name" autoComplete="name" /></label>
        <label>Your email<input name="email" type="email" required placeholder="you@example.com" autoComplete="email" /></label>
      </div>
      <label>Subject<input name="subject" required minLength={2} maxLength={120} placeholder="Backend opportunity / project enquiry" /></label>
      <label className="website-field" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label>
      <label>Message<textarea name="message" required minLength={10} maxLength={2000} rows={5} placeholder="Tell me about the role, project or backend challenge…" /></label>
      <div className="form-submit"><button disabled={state.status === "sending"}>{state.status === "sending" ? "Sending…" : "Send message ↗"}</button><span>Delivered securely to my inbox</span></div>
      {state.status === "sent" && <p role="status" className="success">Message delivered. I&apos;ll reply by email.</p>}
      {state.status === "error" && <p role="alert" className="err">{state.error}</p>}
    </form>
  );
}

function PortraitVisual() {
  function move(e) {
    const box = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - box.left) / box.width - 0.5;
    const y = (e.clientY - box.top) / box.height - 0.5;
    e.currentTarget.style.setProperty("--rotate-x", `${y * -9}deg`);
    e.currentTarget.style.setProperty("--rotate-y", `${x * 9}deg`);
    e.currentTarget.style.setProperty("--glow-x", `${(x + 0.5) * 100}%`);
    e.currentTarget.style.setProperty("--glow-y", `${(y + 0.5) * 100}%`);
  }

  function reset(e) {
    e.currentTarget.style.setProperty("--rotate-x", "0deg");
    e.currentTarget.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <div className="portrait-stage" onPointerMove={move} onPointerLeave={reset}>
      <div className="orbit orbit-one" aria-hidden="true" />
      <div className="orbit orbit-two" aria-hidden="true" />
      <span className="tech-node node-python">Python</span>
      <span className="tech-node node-api">Django</span>
      <span className="tech-node node-sql">SQL</span>
      <span className="tech-node node-cloud">AWS</span>
      <div className="portrait-card">
        <img src={profile.image} alt="Nutan Shinde, backend engineer" />
        <div className="portrait-shine" aria-hidden="true" />
      </div>
      <div className="availability"><span /> Available for backend opportunities</div>
    </div>
  );
}

function TechnologyShowcase() {
  const [active, setActive] = useState(0);
  const technology = techStack[active];

  function spotlight(e) {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tech-x", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--tech-y", `${e.clientY - box.top}px`);
  }

  return (
    <div className="technology-showcase" onPointerMove={spotlight}>
      <div className="technology-grid" role="tablist" aria-label="Technology stack">
        {techStack.map((tech, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === active}
            className={index === active ? "tech-card active" : "tech-card"}
            key={tech.name}
            onClick={() => setActive(index)}
            onPointerEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
          >
            <img src={tech.icon} alt="" loading="lazy" />
            <span>{tech.name}</span>
            <small>{tech.category}</small>
          </button>
        ))}
      </div>
      <article className="technology-detail" key={technology.name}>
        <p>SELECTED TECHNOLOGY</p>
        <img src={technology.icon} alt={`${technology.name} logo`} />
        <h3>{technology.name}</h3>
        <span>{technology.category}</span>
        <p>{technology.detail}</p>
        <ul>{technology.usedFor.map((item) => <li key={item}>{item}</li>)}</ul>
      </article>
      <div className="skill-summary">
        {Object.entries(skills).map(([group, items]) => <div key={group}><span>{group}</span><p>{items.join(" · ")}</p></div>)}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <BackgroundEffects />
      <div className="hero-shell">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#home"><span>NS</span> Nutan Shinde</a>
          <div className="nav-links">
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <a className="nav-cta" href={profile.linkedin} target="_blank" rel="noreferrer">Let&apos;s connect ↗</a>
        </nav>

        <header className="hero" id="home">
          <div className="hero-copy">
            <p className="hero-kicker"><span /> Hello, I&apos;m Nutan</p>
            <h1>Backend<br /><em>Engineer.</em></h1>
            <p className="lede">{profile.tagline}</p>
            <p className="intro">{profile.intro}</p>
            <div className="links">
              <a className="button" href="#projects">Explore my work <span>↓</span></a>
              <a className="social-link" href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
              <a className="social-link" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            </div>
            <div className="hero-stack" aria-label="Core technologies">
              <span>Python</span><span>Django</span><span>FastAPI</span><span>SQL</span><span>REST</span><span>AWS</span>
            </div>
          </div>
          <PortraitVisual />
        </header>
      </div>

      <main>
        <section id="skills">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">TECHNOLOGY & SKILLS</p><h2>Backend technologies I work with.</h2></div>
            <p>Python, APIs, databases, asynchronous processing and production debugging.</p>
          </div>
          <TechnologyShowcase />
        </section>

        <section id="projects">
          <div className="section-heading split-heading">
            <div><p className="eyebrow">FEATURED PROJECTS</p><h2>Backend projects built for production.</h2></div>
            <p>Enterprise integrations focused on scale, data consistency and failure recovery.</p>
          </div>
          <div className="projects">
            {projects.map((p, i) => (
              <article key={p.title}>
                <div className="project-number">0{i + 1}</div>
                <h3>{p.title}</h3>
                <p className="scale">{p.scale}</p>
                <p>{p.text}</p>
                <p className="stack">{p.stack}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="impact-section" aria-label="Engineering impact">
          <div className="impact-heading"><p className="eyebrow">PROJECT IMPACT</p></div>
          <div className="stats">
            {stats.map((s) => <div key={s.label}><strong>{s.value}</strong><span>{s.label}</span></div>)}
          </div>
        </section>

        <section id="experience">
          <div className="section-heading split-heading"><div><p className="eyebrow">PROFESSIONAL EXPERIENCE</p><h2>Backend engineering in production.</h2></div><p>Hands-on experience building, debugging and supporting enterprise commerce workflows at HotWax Commerce.</p></div>
          <div className="experience-list">{experience.map((x, i) => (
            <article key={x.role} className="job">
              <div className="company-mark">HC</div>
              <div className="job-content">
                <p className="job-index">0{i + 1} / {x.location}</p>
                <h3>{x.role}<span>{x.org}</span></h3>
                <p className="company-detail">{x.company}</p>
                <p>{x.text}</p>
                <ul>{x.highlights.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <p className="when">{x.when}</p>
            </article>
          ))}</div>
        </section>

        <section className="architecture">
          <div className="architecture-image"><img src="/backend-systems.png" alt="Backend systems and data pipeline illustration" /></div>
          <div>
            <p className="eyebrow">ENGINEERING APPROACH</p>
            <h2>Design for failure.<br />Recover with confidence.</h2>
            <figure className="log" aria-label="Simplified return processing flow">
              <figcaption><span className="pulse" /> return-pipeline.log</figcaption>
              <ol>{flow.map((l, i) => <li key={i} className={l.t} style={{ "--i": i }}><span className="tag">{l.t}</span><span>{l.m}</span></li>)}</ol>
            </figure>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="section-heading"><p className="eyebrow">LET&apos;S CONNECT</p><h2>Have a backend role or project?</h2><p>Tell me about the opportunity, the system and the engineering challenge.</p></div>
          <Contact />
        </section>
      </main>
      <footer><span>© {new Date().getFullYear()} {profile.name}</span><span>Backend engineering • Production systems • Reliable integrations</span></footer>
    </>
  );
}
