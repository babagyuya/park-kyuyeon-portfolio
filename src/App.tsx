import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  contactLinks,
  experiences,
  interests,
  modes,
  numbers,
  profile,
  skillGroups,
} from "./data/profile";
import { projects } from "./data/projects";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  ["ABOUT", "about"],
  ["WORK", "work"],
  ["EXPERIENCE", "experience"],
  ["SKILLS", "skills"],
  ["CONTACT", "contact"],
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const move = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-5 md:px-10">
        <button
          type="button"
          className="nav-button font-black tracking-[-0.04em]"
          aria-label="Park Kyuyeon 포트폴리오 맨 위로 이동"
          onClick={() => scrollToSection("hero")}
        >
          {profile.mark}
        </button>
        <nav
          className="hidden items-center gap-6 text-[11px] font-bold tracking-[0.16em] md:flex"
          aria-label="Main navigation"
        >
          {navigation.map(([label, id]) => (
            <button
              type="button"
              className="link-line nav-button"
              onClick={() => move(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </nav>
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? "CLOSE" : "MENU"}
        </button>
      </div>
      {open && (
        <nav
          className="mx-4 flex flex-col bg-white p-6 text-3xl font-black text-black mix-blend-normal"
          aria-label="Mobile navigation"
        >
          {navigation.map(([label, id]) => (
            <button
              type="button"
              className="mobile-nav-button"
              onClick={() => move(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function IntroScreen() {
  return (
    <div className="intro-screen" aria-hidden="true">
      <div className="intro-word">
        WHO IS
        <br />
        KYUYEON?
      </div>
      <div className="intro-meta">
        {profile.keywords.map((keyword) => (
          <span key={keyword}>{keyword}</span>
        ))}
      </div>
    </div>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function Hero() {
  const root = useRef<HTMLElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const beats = gsap.utils.toArray<HTMLElement>(".showreel-beat");

      if (reducedMotion) {
        gsap.set(".intro-screen", { display: "none" });
        gsap.set(beats, { autoAlpha: 0 });
        gsap.set(".beat-final", { autoAlpha: 1 });
        return;
      }

      gsap.set(beats, { autoAlpha: 0, yPercent: 12 });
      const reel = gsap.timeline({ defaults: { ease: "expo.out" } });
      timeline.current = reel;

      reel
        .fromTo(".intro-word", { yPercent: 110 }, { yPercent: 0, duration: 0.65 })
        .from(
          ".intro-meta span",
          { y: 18, opacity: 0, stagger: 0.07, duration: 0.3 },
          "-=.25",
        )
        .to(
          ".intro-screen",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.7,
            ease: "power4.inOut",
          },
          "+=.25",
        )
        .set(".intro-screen", { display: "none" });

      const timing = [1.25, 3.15, 5.1, 7.1, 9.1, 11.15, 13.15, 15.05];
      beats.forEach((beat, index) => {
        reel.to(beat, { autoAlpha: 1, yPercent: 0, duration: 0.52 }, timing[index]);
        if (index < beats.length - 1) {
          reel.to(
            beat,
            { autoAlpha: 0, yPercent: -10, duration: 0.38, ease: "power2.in" },
            timing[index] + 1.45,
          );
        }
      });

      reel
        .from(
          ".kinetic-word",
          { yPercent: 120, rotate: 4, stagger: 0.08, duration: 0.45 },
          timing[1],
        )
        .from(
          ".role-line",
          { xPercent: (index) => (index % 2 ? 35 : -35), stagger: 0.06, duration: 0.45 },
          timing[2],
        )
        .from(
          ".flash-chip",
          {
            scale: 0,
            rotate: () => gsap.utils.random(-12, 12),
            stagger: 0.04,
            duration: 0.3,
          },
          timing[3],
        )
        .from(
          ".number-block",
          { scale: 0.75, opacity: 0, stagger: 0.08, duration: 0.5 },
          timing[4],
        )
        .from(
          ".ui-panel",
          {
            xPercent: (index) => (index % 2 ? 120 : -120),
            rotate: (index) => (index % 2 ? 5 : -5),
            stagger: 0.06,
            duration: 0.55,
          },
          timing[5],
        )
        .from(
          ".statement-line",
          { yPercent: 120, stagger: 0.12, duration: 0.48 },
          timing[6],
        )
        .from(
          ".final-line",
          { yPercent: 110, stagger: 0.09, duration: 0.65 },
          timing[7],
        );
    }, root);

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={root}
      id="hero"
      className="hero-showreel"
      aria-label="Park Kyuyeon personal identity showreel"
    >
      <IntroScreen />
      <div className="hero-grid" aria-hidden="true" />

      <div className="showreel-beat beat-name">
        <p className="hero-label">{profile.location} · {profile.year}</p>
        <h1>
          PARK
          <br />
          <span>KYUYEON</span>
        </h1>
      </div>

      <div className="showreel-beat beat-do">
        <p className="hero-label">SO, WHAT DO I DO?</p>
        <div className="kinetic-row">
          {["BUILD", "ANALYZE", "DESIGN", "CREATE", "PRESENT", "GROW"].map((word) => (
            <span className="kinetic-word" key={word}>{word}</span>
          ))}
        </div>
      </div>

      <div className="showreel-beat beat-roles">
        {["FRONTEND", "AI / DATA", "PRODUCT", "MARKETING", "CONTENT"].map((role) => (
          <div className="role-line" key={role}>{role}</div>
        ))}
        <div className="not-one">NOT JUST ONE.</div>
      </div>

      <div className="showreel-beat beat-flash">
        {["SSAFY", "SAMSUNG", "SWITH", "CALLMEBABY", "FITME", "CONTENT", "AI", "DATA", "MARKETING"].map((item, index) => (
          <span className={`flash-chip ${index === 2 ? "winner" : ""}`} key={item}>
            {item}
            {index === 2 && <em>1ST PLACE</em>}
          </span>
        ))}
      </div>

      <div className="showreel-beat beat-numbers">
        {[["230+", "CONTENTS"], ["2.5K", "FOLLOWERS"], ["4.5M", "MAX VIEWS"], ["925H", "SW / AI TRAINING"]].map(([value, label]) => (
          <div className="number-block" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="showreel-beat beat-ui">
        {["WEB PRODUCT", "AI SERVICE", "DATA VISUALIZATION", "CONTENT / GROWTH", "PRESENTATION"].map((item, index) => (
          <div className={`ui-panel ui-${index}`} key={item}>
            <span>0{index + 1}</span>
            <b>{item}</b>
            <i />
          </div>
        ))}
      </div>

      <div className="showreel-beat beat-statement">
        <div className="statement-wrap">
          <span className="statement-line">I DON'T JUST</span>
          <span className="statement-line aqua-fill">MAKE THINGS.</span>
          <span className="statement-line">I FIND WHY</span>
          <span className="statement-line outline">THEY WORK.</span>
        </div>
      </div>

      <div className="showreel-beat beat-final">
        <p className="hero-label">PERSONAL BRAND PORTFOLIO · 2026</p>
        <div className="final-heading">
          <span className="final-line">PARK</span>
          <span className="final-line">KYUYEON</span>
        </div>
        <div className="final-bottom final-line">
          <b>{profile.eyebrow}</b>
          <p>I turn ideas, data and technology<br />into experiences people actually use.</p>
        </div>
        <button
          type="button"
          className="scroll-cue final-line nav-button"
          onClick={() => scrollToSection("about")}
        >
          SCROLL TO KNOW ME <span>↓</span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => timeline.current?.progress(1)}
        className="skip-reel"
      >
        SKIP 15S
      </button>
      <div className="reel-index">PKY / IDENTITY REEL</div>
    </section>
  );
}

function SectionKicker({ index, label, dark = false }: { index: string; label: string; dark?: boolean }) {
  return (
    <div className={`section-kicker ${dark ? "border-white/20" : "border-black/20"}`}>
      <span>{index}</span>
      <span>{label}</span>
      <span>© 2026</span>
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const startedAt = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / 1100, 1);
        setDisplay(Math.round((1 - (1 - progress) ** 3) * value * 10) / 10);
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.3 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

function NumbersSection() {
  return (
    <section className="section-shell bg-paper" aria-labelledby="numbers-title">
      <SectionKicker index="03" label="MY NUMBERS" />
      <h2 id="numbers-title" className="sr-only">My numbers</h2>
      <div className="stats-grid">
        {numbers.map((item, index) => (
          <article className={`stat-cell stat-${index}`} tabIndex={0} key={item.label}>
            <div className="stat-value"><Counter value={item.value} suffix={item.suffix} /></div>
            <div className="stat-copy">
              <h3>{item.label}</h3>
              <p>{item.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhatIDoSection() {
  return (
    <section className="section-shell what-section bg-ink text-paper" aria-labelledby="what-title">
      <SectionKicker index="04" label="WHAT I DO" dark />
      <div className="what-heading">
        <h2 id="what-title">FOUR MODES.<br /><span>ONE PRACTICE.</span></h2>
        <p>문제에 따라 역할은 달라지지만, 호기심을 구체적인 결과로 연결하는 방식은 같습니다.</p>
      </div>
      <div className="mode-list">
        {modes.map((mode) => (
          <article className="mode-row" key={mode.title}>
            <span className="mode-number">{mode.n}</span>
            <h3>{mode.title}</h3>
            <p>{mode.copy}</p>
            <div className="mode-tags">
              {mode.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="mode-related">RELATED — {mode.related}</div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WorksSection() {
  return (
    <section id="work" className="section-shell work-section bg-paper" aria-labelledby="work-title">
      <SectionKicker index="05" label="SELECTED WORKS" />
      <div className="work-intro">
        <h2 id="work-title">WORK THAT<br />CROSSES <span>LINES.</span></h2>
        <p>제품, AI, 콘텐츠를 분리된 목록이 아니라 문제를 해결하는 사고가 이동한 기록으로 보여줍니다.</p>
      </div>
      <div className="work-list">
        {projects.map((project, index) => (
          <Link
            className="work-row"
            to={`/work/${project.slug}`}
            aria-label={`${project.title} 프로젝트 상세 보기`}
            key={project.slug}
          >
            <div className="work-order">0{index + 1}</div>
            <div className="work-title-wrap">
              <span>{project.category} · {project.year}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
            <div className="work-visual" style={{ "--work-accent": project.accent } as CSSProperties}>
              <div className="visual-orbit" />
              <div className="visual-card">
                <small>CASE / 0{index + 1}</small>
                <b>{project.highlight ?? project.category}</b>
                <i />
              </div>
            </div>
            <div className="work-arrow">↗</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section-shell journey-section bg-aqua text-ink" aria-labelledby="journey-title">
      <SectionKicker index="06" label="EXPERIENCE" />
      <div className="journey-layout">
        <div className="journey-sticky">
          <h2 id="journey-title">NOT A<br />STRAIGHT<br /><span>LINE.</span></h2>
          <p>다음 질문을 따라가며 기술, 콘텐츠, 제품 경험을 연결해 온 과정입니다.</p>
        </div>
        <ol className="journey-list">
          {experiences.map((experience, index) => (
            <li key={`${experience.year}-${experience.title}`}>
              <span className="journey-dot">0{index + 1}</span>
              <time>{experience.year}</time>
              <h3>{experience.title}</h3>
              <p>{experience.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section-shell skills-section bg-paper" aria-labelledby="skills-title">
      <SectionKicker index="07" label="SKILLS" />
      <div className="skills-intro">
        <h2 id="skills-title">TOOLS ARE<br />ONLY USEFUL<br /><span>IN CONTEXT.</span></h2>
      </div>
      <div className="skill-groups">
        {skillGroups.map((group, index) => (
          <article className="skill-group" key={group.name}>
            <span>0{index + 1}</span>
            <h3>{group.name}</h3>
            <div className="skill-chips">
              {group.items.map((item) => <span key={item}>{item}</span>)}
            </div>
            <p>{group.connection}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BeyondSection() {
  return (
    <section className="section-shell beyond-section bg-ink text-paper" aria-labelledby="beyond-title">
      <SectionKicker index="08" label="BEYOND THE RÉSUMÉ" dark />
      <div className="beyond-grid">
        <h2 id="beyond-title">BEYOND<br />THE<br /><em>RÉSUMÉ.</em></h2>
        <div className="beyond-window">
          <div className="window-top"><span>PERSONAL_ARCHIVE.JPG</span><span>×</span></div>
          <div className="window-art"><span>STILL<br />CURIOUS.</span></div>
        </div>
        <div className="interest-list">
          <p>일은 이야기의 일부일 뿐 전부는 아닙니다. 관찰하고 기록하고 새로운 질문을 발견하는 취향도 함께 보여주고 싶습니다.</p>
          {interests.map((interest, index) => (
            <div key={interest}><span>0{index + 1}</span>{interest}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="contact-section bg-paper" aria-labelledby="contact-title">
      <p className="contact-kicker">HAVE A QUESTION, AN IDEA, OR AN UNUSUAL BRIEF?</p>
      <h2 id="contact-title">SO, WHAT SHOULD<br />WE <span>MAKE NEXT?</span></h2>
      <div className="contact-bottom">
        <p>제 이야기가 궁금증을 만들었다면,<br />함께 이야기해 주세요.</p>
        <div className="contact-links">
          {contactLinks.map((link) => link.href ? (
            <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={link.label}>
              {link.label}<span>↗</span>
            </a>
          ) : (
            <span className="placeholder-link" title="실제 링크 추가 예정" key={link.label}>
              {link.label}<span>UPDATE SOON</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <b>PARK KYUYEON®</b>
      <span>SEOUL — KOREA</span>
      <span>© 2026 / ALL RIGHTS RESERVED</span>
      <button type="button" className="nav-button" onClick={() => scrollToSection("hero")}>BACK TO TOP ↑</button>
    </footer>
  );
}

function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const move = (event: MouseEvent) => {
      gsap.to(ref.current, { x: event.clientX, y: event.clientY, duration: 0.2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return <div ref={ref} className="cursor-dot" aria-hidden="true"><span>VIEW</span></div>;
}

function AboutSection() {
  return (
    <section id="about" className="section-shell about-section bg-paper" aria-labelledby="about-title">
      <SectionKicker index="02" label="ABOUT" />
      <div className="about-grid">
        <h2 id="about-title" data-reveal>I'M INTERESTED<br />IN WHAT HAPPENS<br /><span>AFTER THE IDEA.</span></h2>
        <div className="about-copy" data-reveal>
          <span>HELLO, I'M KYUYEON.</span>
          {profile.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="about-orbit" aria-hidden="true">
          <div className="orbit-ring" />
          <div className="orbit-core">IDEA<br />→<br />IMPACT</div>
          <span className="orbit-label one">TECH</span>
          <span className="orbit-label two">DATA</span>
          <span className="orbit-label three">CONTENT</span>
          <span className="orbit-label four">PEOPLE</span>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div>
          {profile.keywords.concat(profile.keywords).map((keyword, index) => (
            <span key={`${keyword}-${index}`}>{keyword}<i>↗</i></span>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 70,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    }, root);
    return () => context.revert();
  }, [reducedMotion]);

  return (
    <div ref={root}>
      <Navigation />
      <Cursor />
      <main>
        <Hero />
        <AboutSection />
        <NumbersSection />
        <WhatIDoSection />
        <WorksSection />
        <ExperienceSection />
        <SkillsSection />
        <BeyondSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function DetailSection({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="detail-section">
      <span>{label}</span>
      <div>{children}</div>
    </div>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];

  if (!project) {
    return (
      <main className="detail-missing">
        <h1>WORK NOT FOUND.</h1>
        <Link to="/">RETURN HOME</Link>
      </main>
    );
  }

  const next = projects[(index + 1) % projects.length];
  const accent = { "--work-accent": project.accent } as CSSProperties;
  const sections = [
    ["문제 정의", project.caseStudy.problem],
    ["내 역할", project.caseStudy.role],
    ["왜 이렇게 만들었는지", project.caseStudy.decision],
    ["어떻게 해결했는지", project.caseStudy.solution],
    ["문제와 시행착오", project.caseStudy.challenge],
    ["개선 과정", project.caseStudy.improvement],
    ["결과", project.caseStudy.result],
    ["배운 점", project.caseStudy.learning],
  ];

  return (
    <main className="work-detail">
      <header className="detail-nav">
        <Link to="/" aria-label="Park Kyuyeon 포트폴리오 홈">{profile.mark}</Link>
        <Link to="/">CLOSE ×</Link>
      </header>
      <section className="detail-hero" style={accent}>
        <div className="detail-meta">
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span>CASE 0{index + 1}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.role}</p>
        <div className="detail-visual">
          <div className="detail-disc" />
          <div className="detail-window">
            <span>PROJECT / {project.slug.toUpperCase()}</span>
            <b>{project.highlight ?? "SELECTED WORK"}</b>
            <i />
          </div>
        </div>
      </section>

      <section className="detail-body" aria-labelledby="project-overview">
        <aside><span>PROJECT</span></aside>
        <div>
          <p id="project-overview" className="detail-lead">{project.description}</p>
          <div className="detail-tags">
            {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
          {project.hasPlaceholders && <span className="placeholder-badge">PLACEHOLDER DATA INCLUDED</span>}
        </div>
        {sections.map(([label, copy]) => (
          <DetailSection label={label} key={label}><p>{copy}</p></DetailSection>
        ))}
        <DetailSection label="사용 기술">
          <div className="detail-tags">
            {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </DetailSection>
      </section>

      <section className="detail-gallery" style={accent} aria-label={`${project.title} Gallery`}>
        <div>01<br /><b>PROCESS</b></div>
        <div>02<br /><b>SYSTEM</b></div>
        <div>03<br /><b>RESULT</b></div>
      </section>

      <Link className="next-work" to={`/work/${next.slug}`}>
        <span>NEXT PROJECT</span>
        <b>{next.title}</b>
        <i>↗</i>
      </Link>
    </main>
  );
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}
