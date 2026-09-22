"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

const experience = [
  { period: "2025 — Present", title: "Secondary School Teacher", place: "Sir Syed School · 25 Area, Wah Cantt", detail: "Planning and delivering curriculum-aligned lessons, with a focus on communication, participation, and academic growth." },
  { period: "2024 — 2025", title: "Linguistics Lecturer", place: "Riphah International College · Wah Cantt", detail: "Supporting intermediate students through English literature, analytical writing, assignment feedback, and critical thinking." },
  { period: "2023 — 2024", title: "Secondary School Teacher", place: "Wins Academy · Anwar Chowk, Wah Cantt", detail: "Designing engaging lessons for diverse learning styles and building a positive classroom culture around confidence and curiosity." },
];

const skills = ["Lesson planning", "Academic writing", "Classroom management", "Literary analysis", "Research methodology", "Communication"];

export default function Home() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [drawerOpen, setDrawerOpen] = useState(false);

  function closeDrawer() { setDrawerOpen(false); }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error("Unable to send");
      form.reset();
      setStatus("success");
    } catch { setStatus("error"); }
  }

  return (
    <main>
      {/* Mobile overlay */}
      <div className={`nav-overlay${drawerOpen ? " open" : ""}`} onClick={closeDrawer} aria-hidden="true" />

      {/* Mobile drawer */}
      <nav className={`nav-drawer${drawerOpen ? " open" : ""}`} aria-label="Mobile navigation">
        <a href="#top" onClick={closeDrawer}>Home</a>
        <a href="#about" onClick={closeDrawer}>About</a>
        <a href="#work" onClick={closeDrawer}>Experience</a>
        <a href="#research" onClick={closeDrawer}>Research</a>
        <a href="#contact" onClick={closeDrawer}>Contact</a>
        <a href="/CV.pdf" download onClick={closeDrawer}>Download CV ↗</a>
      </nav>

      {/* Top nav */}
      <nav className="site-nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top">Akasha Iqbal<span>.</span></a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#work">Experience</a>
          <a href="#research">Research</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="nav-download" href="/CV.pdf" download>Download CV <span>↗</span></a>
        <button
          className="nav-hamburger"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <section className="hero" id="top"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> English educator · Literary researcher</p><h1>Making room<br /><em>for better</em><br />questions.</h1><p className="hero-intro">I&apos;m Akasha Iqbal — a teacher and English Literature graduate interested in the stories, language, and ideas that shape how we see one another.</p><div className="hero-actions"><a className="button button-dark" href="#contact">Let&apos;s connect <span>↗</span></a><a className="text-link" href="#research">View my research <span>↓</span></a></div></div><div className="hero-portrait-wrap"><div className="portrait-backdrop" /><Image className="hero-portrait" src="/my%20pic.jpg" alt="Akasha Iqbal" width={768} height={1365} priority /><div className="portrait-note">Based in<br /><strong>Wah Cantt, PK</strong></div></div><div className="hero-index">01 <span>/</span> 04</div></section>
      <section className="marquee" aria-label="Areas of practice"><span>TEACHING</span><b>✳</b><span>LANGUAGE</span><b>✳</b><span>LITERATURE</span><b>✳</b><span>RESEARCH</span><b>✳</b><span>TEACHING</span></section>
      <section className="about section" id="about"><div className="section-label">01 / About</div><div className="about-content"><p className="display-copy">Education is not just the transfer of knowledge. It is an invitation to <em>notice more</em>, ask better questions, and find your own voice.</p><div className="about-columns"><p>With a BS in English from the University of the Punjab and experience across secondary and intermediate classrooms, I bring together careful planning and genuine curiosity.</p><p>My work moves between the practical rhythm of teaching and the slower work of literary research — always looking for the human story underneath the structure.</p></div></div></section>
      <section className="experience section" id="work"><div className="section-label">02 / Experience</div><div className="experience-content"><h2>A practice built<br />around <em>people.</em></h2><div className="timeline">{experience.map((item) => <article className="timeline-item" key={item.title + item.period}><div className="timeline-period">{item.period}</div><div><h3>{item.title}</h3><p className="timeline-place">{item.place}</p><p>{item.detail}</p></div></article>)}</div></div></section>
      <section className="research section" id="research"><div className="section-label">03 / Featured research</div><div className="research-layout"><div><p className="research-kicker">Bachelor&apos;s thesis · 2024</p><h2>Gender<br /><em>deconstruction</em></h2><p className="research-title">in Shah&apos;s <i>Before She Sleeps</i></p><a className="button button-light" href="/THESIS.pdf" target="_blank">Read the thesis <span>↗</span></a></div><div className="research-summary"><p>This feminist study examines how Bina Shah&apos;s dystopian narrative challenges inherited gender roles and imagines resistance.</p><div className="research-themes"><span>Judith Butler</span><span>Simone de Beauvoir</span><span>Gender performativity</span><span>Agency &amp; solidarity</span></div></div></div></section>
      <section className="education section"><div className="section-label">04 / Education &amp; tools</div><div className="education-grid"><div><h2>Grounded in<br /><em>language.</em></h2><p>BS with Honors in English<br /><strong>University of the Punjab</strong><br /><span>2020 — 2024 · EQF Level 6</span></p></div><div className="skills-list"><p className="small-label">Core skills</p>{skills.map((skill, index) => <div className="skill" key={skill}><span>0{index + 1}</span>{skill}</div>)}</div></div></section>
      <section className="contact section" id="contact"><div className="section-label">05 / Start a conversation</div><div className="contact-layout"><div><h2>Have something<br />to <em>say?</em></h2><p>For teaching opportunities, literary conversations, or collaborative work, I&apos;d be happy to hear from you.</p><a className="email-link" href="mailto:Akashaiqbal45@gmail.com">Akashaiqbal45@gmail.com <span>↗</span></a></div><form className="contact-form" onSubmit={handleSubmit}><label>Name<input name="name" required placeholder="Your name" /></label><label>Email<input name="email" type="email" required placeholder="you@example.com" /></label><label>Message<textarea name="message" required rows={4} placeholder="Tell me a little about your idea..." /></label><button className="button button-dark" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send message ↗"}</button>{status === "success" && <p className="form-status success">Thank you — your message is on its way.</p>}{status === "error" && <p className="form-status error">Email delivery is unavailable. Please use the email link above.</p>}</form></div></section>
      <footer><span>© {new Date().getFullYear()} Akasha Iqbal</span><span>English educator · Literary researcher</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
