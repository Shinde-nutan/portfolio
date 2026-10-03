import { useState } from "react";
import { profile, flow, projects, skills, experience } from "./data.js";

const API = import.meta.env.VITE_API_URL || "";

function Contact() {
  const [state, setState] = useState({ status: "idle", error: "" });

  async function send(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: "sending", error: "" });
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(res.status === 429 ? "Too many messages. Try again later." : "Message not sent. Check the fields and try again.");
      setState({ status: "sent", error: "" });
      e.currentTarget.reset();
    } catch (err) {
      setState({ status: "error", error: err.message });
    }
  }

  if (!API)
    return <p>Email me at <a href={`mailto:${profile.email}`}>{profile.email}</a>.</p>;

  return (
    <form onSubmit={send} className="form">
      <label>Name<input name="name" required maxLength={100} /></label>
      <label>Email<input name="email" type="email" required /></label>
      <label>Message<textarea name="message" required minLength={10} maxLength={2000} rows={5} /></label>
      <button disabled={state.status === "sending"}>{state.status === "sending" ? "Sending…" : "Send message"}</button>
      {state.status === "sent" && <p role="status">Message sent. I'll reply by email.</p>}
      {state.status === "error" && <p role="alert" className="err">{state.error}</p>}
    </form>
  );
}

export default function App() {
  return (
    <>
      <header className="hero">
        <div>
          <p className="who">{profile.name}</p>
          <h1>{profile.role}</h1>
          <p className="lede">{profile.tagline}</p>
          <p className="links">
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
            <a href="#contact">Contact</a>
          </p>
        </div>
        <figure className="log" aria-label="Simplified return processing flow">
          <figcaption>A return, simplified</figcaption>
          <ol>
            {flow.map((l, i) => (
              <li key={i} className={l.t} style={{ "--i": i }}>
                <span className="tag">{l.t}</span>
                <span>{l.m}</span>
              </li>
            ))}
          </ol>
        </figure>
      </header>

      <main>
        <section>
          <h2>Projects</h2>
          <div className="projects">
            {projects.map((p) => (
              <article key={p.title}>
                <h3>{p.title}</h3>
                <p className="scale">{p.scale}</p>
                <p>{p.text}</p>
                <p className="stack">{p.stack}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2>Skills</h2>
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="skillrow">
              <h3>{group}</h3>
              <ul>{items.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          ))}
        </section>

        <section>
          <h2>Experience</h2>
          {experience.map((x) => (
            <div key={x.role} className="job">
              <h3>{x.role}, {x.org}</h3>
              <p className="when">{x.when}</p>
              <p>{x.text}</p>
            </div>
          ))}
        </section>

        <section id="contact">
          <h2>Contact</h2>
          <Contact />
        </section>
      </main>
      <footer>© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
