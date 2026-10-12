import {
  type CSSProperties,
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
import { interests, modes, numbers, profile } from "./data/profile";
import { brandCollaborations } from "./data/brandCollaborations";
import { callmebabyCase } from "./data/callmebaby";
import { certifications } from "./data/certifications";
import { contact, contactLinks } from "./data/contact";
import { experiences } from "./data/experiences";
import { fitmeCase } from "./data/fitme";
import { skillGroups } from "./data/skills";
import { swithCase } from "./data/swith";
import { works, type GalleryBlock, type ProjectImage, type Work } from "./data/works";

gsap.registerPlugin(ScrollTrigger);

const navigation = [
  ["ABOUT", "about"],
  ["WORK", "work"],
  ["BRAND", "brand"],
  ["EXPERIENCE", "experience"],
  ["SKILLS", "skills"],
  ["CONTACT", "contact"],
] as const;

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function assetUrl(src: string) {
  if (!src || /^(https?:|data:|blob:)/.test(src)) return src;
  if (src.startsWith(import.meta.env.BASE_URL)) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\/+/, "")}`;
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
        {works.map((project, index) => (
          <Link
            className="work-row"
            to={`/work/${project.slug}`}
            aria-label={`${project.title} 프로젝트 상세 보기`}
            key={project.slug}
          >
            <div className="work-order">0{index + 1}</div>
            <div className="work-title-wrap">
              <span>{project.category} · {project.period}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              {project.slug === "instagram-magazine" && (
                <div className="work-inline-results" aria-label="Instagram Magazine 주요 성과">
                  {project.results.map((result) => (
                    <span key={result.label}><b>{result.value}</b>{result.label}</span>
                  ))}
                </div>
              )}
            </div>
            <div className={`work-visual ${project.heroImage.src ? "work-visual-image" : ""}`} style={{ "--work-accent": project.accent } as CSSProperties}>
              {project.heroImage.src ? (
                <img src={assetUrl(project.heroImage.src)} alt={project.heroImage.alt} />
              ) : (
                <div className="visual-orbit" />
              )}
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

function BrandCollaborationsSection() {
  return (
    <section id="brand" className="section-shell brand-section bg-ink text-paper" aria-labelledby="brand-title">
      <SectionKicker index="06" label="BRAND & CONTENT" dark />
      <div className="brand-intro" data-reveal>
        <h2 id="brand-title">BRAND<br /><span>COLLABORATIONS.</span></h2>
        <p>브랜드의 메시지를 사람들이 보고 싶은 콘텐츠로 바꿉니다.</p>
      </div>
      <div className="brand-grid">
        {brandCollaborations.map((brand, index) => (
          <article className={`brand-card brand-card-${index + 1}`} key={brand.id} data-reveal>
            <div className="brand-card-head">
              <span>0{index + 1}</span>
              <span>{brand.category}</span>
            </div>
            <div className="brand-media">
              <img src={brand.image} alt={brand.imageAlt} />
            </div>
            <div className="brand-card-title">
              <h3>{brand.brand}</h3>
              <span>{brand.period}</span>
            </div>
            <strong>{brand.koreanName}</strong>
            <small>{brand.role}</small>
            <p>{brand.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section-shell journey-section bg-aqua text-ink" aria-labelledby="journey-title">
      <SectionKicker index="07" label="EXPERIENCE" />
      <div className="journey-layout">
        <div className="journey-sticky">
          <h2 id="journey-title">NOT A<br />STRAIGHT<br /><span>LINE.</span></h2>
          <p>다음 질문을 따라가며 기술, 콘텐츠, 제품 경험을 연결해 온 과정입니다.</p>
        </div>
        <ol className="journey-list">
          {experiences.map((experience, index) => (
            <li key={`${experience.period}-${experience.title}`}>
              <span className="journey-dot">0{index + 1}</span>
              <time>{experience.period}</time>
              <h3>{experience.title}</h3>
              <p className="journey-organization">{experience.organization}</p>
              <div className="journey-details">
                {experience.details.map((detail) => <span key={detail}>{detail}</span>)}
              </div>
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
      <SectionKicker index="08" label="SKILLS" />
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

function CertificationsSection() {
  return (
    <section className="section-shell certification-section bg-paper" aria-labelledby="certifications-title">
      <SectionKicker index="09" label="CERTIFICATIONS" />
      <div className="certification-heading" data-reveal>
        <h2 id="certifications-title">PROOF OF<br /><span>PRACTICE.</span></h2>
        <p>학습한 지식을 객관적인 기준으로 확인하고, 실제 문제에 적용할 수 있는 기반을 갖췄습니다.</p>
      </div>
      <div className="certification-list">
        {certifications.map((certification, index) => (
          <article key={certification.name} data-reveal>
            <span>0{index + 1}</span>
            <h3>{certification.name}</h3>
            <strong>{certification.grade}</strong>
            <p>{certification.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BeyondSection() {
  return (
    <section className="section-shell beyond-section bg-ink text-paper" aria-labelledby="beyond-title">
      <SectionKicker index="10" label="BEYOND THE RÉSUMÉ" dark />
      <div className="beyond-grid">
        <h2 id="beyond-title">BEYOND<br />THE<br /><em>RÉSUMÉ.</em></h2>
        <div className="beyond-window">
          <div className="window-top"><span>PERSONAL_ARCHIVE.JPG</span><span>×</span></div>
          <div className="window-art"><span className="still-curious">STILL<br />CURIOUS.</span></div>
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
      <h2 id="contact-title"><span className="contact-lets">LET'S</span><br /><span>CONNECT.</span></h2>
      <div className="contact-bottom">
        <div className="contact-person">
          <strong>{contact.nameKo}</strong>
          <span>{contact.nameEn}</span>
          <p>제 이야기가 궁금증을 만들었다면,<br />이메일이나 인스타그램으로 이야기해 주세요.</p>
        </div>
        <div className="contact-links">
          {contactLinks.map((link) => link.href ? (
            <a href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined} key={link.label}>
              <span>{link.label}<small>{link.value}</small></span><b>↗</b>
            </a>
          ) : (
            <span className="placeholder-link" title="실제 링크 추가 예정" key={link.label}>
              <span>{link.label}<small>{link.value}</small></span><b>—</b>
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
        <BrandCollaborationsSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <BeyondSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

function ProjectMedia({
  image,
  label,
  ratio = "landscape",
}: {
  image: ProjectImage;
  label: string;
  ratio?: "landscape" | "portrait" | "square";
}) {
  const hasImage = image.src.trim().length > 0;

  return (
    <figure className={`project-media media-${ratio}`}>
      {hasImage ? (
        <img src={assetUrl(image.src)} alt={image.alt} />
      ) : (
        <div className="editorial-placeholder">
          <span>{label}</span>
          <b>PROJECT VISUAL<br />COMING SOON</b>
          <small>{ratio === "landscape" ? "16:9" : ratio === "portrait" ? "3:4" : "1:1"}</small>
        </div>
      )}
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

function GalleryBlockView({ block, index }: { block: GalleryBlock; index: number }) {
  const ratio = block.type === "mobile-grid" ? "portrait" : block.type === "three-column" ? "square" : "landscape";

  return (
    <article className={`gallery-block gallery-${block.type}`}>
      <header>
        <span>G{String(index + 1).padStart(2, "0")}</span>
        <h3>{block.title}</h3>
        {block.description && <p>{block.description}</p>}
      </header>
      <div className="gallery-media-grid">
        {block.images.map((image, imageIndex) => (
          <ProjectMedia
            image={image}
            label={`${block.title} / ${String(imageIndex + 1).padStart(2, "0")}`}
            ratio={ratio}
            key={`${block.title}-${image.alt}-${imageIndex}`}
          />
        ))}
      </div>
    </article>
  );
}

const instagramDirections = [
  ["01", "FASHION", "패션 트렌드 · 스타일링 · 아이템 큐레이션"],
  ["02", "BEAUTY", "제품 · 뷰티 트렌드 · 추천 콘텐츠"],
  ["03", "LIFESTYLE", "음악 · 문화 · 관심사 기반 콘텐츠"],
] as const;

const instagramWorkflow = [
  ["TREND RESEARCH", "트렌드와 관심 주제를 탐색"],
  ["IDEA", "콘텐츠로 만들 주제 선정"],
  ["STRUCTURE", "첫 화면 문구와 정보 순서 구성"],
  ["CREATE", "이미지 및 콘텐츠 제작"],
  ["PUBLISH", "Instagram 게시"],
  ["ANALYZE", "조회 · 저장 · 공유 등 반응 확인"],
  ["ITERATE", "다음 콘텐츠에 반영"],
] as const;

function InstagramMagazineDetail({ project, index, next }: { project: Work; index: number; next: Work }) {
  const accent = { "--work-accent": project.accent } as CSSProperties;

  return (
    <main className="work-detail instagram-case project-instagram-magazine" style={accent}>
      <header className="detail-nav">
        <Link to="/" aria-label="Park Kyuyeon 포트폴리오 홈">{profile.mark}</Link>
        <Link to="/">CLOSE ×</Link>
      </header>

      <section className="instagram-hero">
        <div className="instagram-hero-copy">
          <span className="case-eyebrow">CASE STUDY / {String(index + 1).padStart(2, "0")}</span>
          <h1>INSTAGRAM<br />MAGAZINE</h1>
          <p>Fashion · Beauty · Lifestyle</p>
          <div className="instagram-hero-meta">
            <span>2025.04 — 2026.04</span>
            <span>CONTENT PLANNING</span>
            <span>CONTENT CREATION</span>
            <span>TREND RESEARCH</span>
            <span>PERFORMANCE ANALYSIS</span>
          </div>
          <a className="instagram-cta" href={project.instagramUrl} target="_blank" rel="noopener noreferrer">
            {project.instagramHandle} <b>VIEW INSTAGRAM ↗</b>
          </a>
        </div>
        <div className="instagram-hero-visual">
          <ProjectMedia image={project.heroImage} label="INSTAGRAM MAGAZINE / HERO" />
        </div>
      </section>

      <section className="instagram-section instagram-about" aria-labelledby="instagram-about-title">
        <div className="instagram-section-heading">
          <span>01 / ABOUT THE MAGAZINE</span>
          <h2 id="instagram-about-title">CONTENT<br />WITH A<br /><em>RESPONSE.</em></h2>
        </div>
        <div className="instagram-body-copy">
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="instagram-section instagram-direction" aria-labelledby="instagram-direction-title">
        <div className="instagram-section-heading">
          <span>02 / CONTENT DIRECTION</span>
          <h2 id="instagram-direction-title">THREE<br />DIRECTIONS.</h2>
        </div>
        <div className="instagram-direction-list">
          {instagramDirections.map(([number, title, copy]) => (
            <article key={title}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="instagram-section instagram-examples" aria-labelledby="instagram-examples-title">
        <div className="instagram-section-heading">
          <span>03 / CONTENT EXAMPLES</span>
          <h2 id="instagram-examples-title">IDEAS,<br /><em>EDITED.</em></h2>
        </div>
        <div className="instagram-example-grid">
          {project.contentExamples?.map((example, exampleIndex) => (
            <article className={`instagram-example example-${exampleIndex + 1}`} key={example.title}>
              <figure className="instagram-example-media">
                <img src={assetUrl(example.image.src)} alt={example.image.alt} />
              </figure>
              <div>
                <span>{example.category} / 0{exampleIndex + 1}</span>
                <h3>{example.title}</h3>
                <p>{example.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="instagram-section instagram-process" aria-labelledby="instagram-process-title">
        <div className="instagram-section-heading">
          <span>04 / HOW I WORKED</span>
          <h2 id="instagram-process-title">MAKE.<br />MEASURE.<br /><em>ITERATE.</em></h2>
        </div>
        <ol className="instagram-workflow">
          {instagramWorkflow.map(([title, copy], workflowIndex) => (
            <li key={title}>
              <span>{String(workflowIndex + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="instagram-section instagram-feed" aria-labelledby="instagram-feed-title">
        <div className="instagram-feed-copy">
          <span>05 / FEED OVERVIEW</span>
          <h2 id="instagram-feed-title"><strong>230+</strong><br />CONTENTS</h2>
          <p>약 1년 동안 230개 이상의 콘텐츠를 제작하며 패션, 뷰티, 라이프스타일 영역에서 다양한 포맷과 주제를 실험했습니다.</p>
        </div>
        {project.feedImage && (
          <figure className="instagram-information-media feed-media">
            <img src={assetUrl(project.feedImage.src)} alt={project.feedImage.alt} />
          </figure>
        )}
      </section>

      <section className="instagram-section instagram-performance" aria-labelledby="instagram-performance-title">
        <div className="instagram-section-heading performance-heading">
          <span>06 / PERFORMANCE</span>
          <h2 id="instagram-performance-title">FROM<br />CONTENT<br /><em>TO RESPONSE.</em></h2>
        </div>
        <div className="instagram-results">
          {project.results.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
            </article>
          ))}
        </div>
        {project.performanceImage && (
          <figure className="instagram-information-media performance-media">
            <img src={assetUrl(project.performanceImage.src)} alt={project.performanceImage.alt} />
          </figure>
        )}
        <div className="instagram-performance-copy">
          <p>콘텐츠별 반응 차이를 확인하면서 어떤 주제와 구성에서 사용자가 더 오래 보고, 저장하거나 공유하는지를 관찰했습니다.</p>
          <p>반응이 좋았던 콘텐츠를 그대로 반복하기보다 주제, 첫 화면 문구, 정보의 순서와 형식을 나눠 살펴보고 다음 콘텐츠 기획에 반영했습니다.</p>
        </div>
      </section>

      <section className="instagram-section instagram-learned" aria-labelledby="instagram-learned-title">
        <div className="instagram-section-heading">
          <span>07 / WHAT I LEARNED</span>
          <h2 id="instagram-learned-title">CREATE.<br />ANALYZE.<br /><em>CONNECT.</em></h2>
        </div>
        <div className="instagram-body-copy">
          <p>같은 계정에서 제작한 콘텐츠라도 주제와 첫 화면, 정보 구조에 따라 사용자 반응은 크게 달라졌습니다.</p>
          <p>이 경험을 통해 콘텐츠를 단순히 만드는 것보다 사용자의 반응을 관찰하고 그 이유를 다음 실행에 연결하는 과정에 관심을 갖게 되었습니다.</p>
          <a className="instagram-cta dark" href={project.instagramUrl} target="_blank" rel="noopener noreferrer">
            {project.instagramHandle} <b>VIEW INSTAGRAM ↗</b>
          </a>
        </div>
      </section>

      <Link className="next-work" to={`/work/${next.slug}`}>
        <span>NEXT PROJECT →</span>
        <b>{next.title}</b>
        <i>↗</i>
      </Link>
    </main>
  );
}

function CallmebabyMedia({ image, className = "" }: { image: ProjectImage; className?: string }) {
  return (
    <figure className={`callmebaby-media ${className}`}>
      <img src={assetUrl(image.src)} alt={image.alt} />
    </figure>
  );
}

function CallmebabyDetail({ project, index, next }: { project: Work; index: number; next: Work }) {
  const accent = { "--work-accent": project.accent } as CSSProperties;

  return (
    <main className="work-detail callmebaby-case project-callmebaby" style={accent}>
      <header className="detail-nav">
        <Link to="/" aria-label="Park Kyuyeon 포트폴리오 홈">{profile.mark}</Link>
        <Link to="/">CLOSE ×</Link>
      </header>

      <section className="callmebaby-hero">
        <div className="callmebaby-hero-copy">
          <span className="case-eyebrow">CASE STUDY / {String(index + 1).padStart(2, "0")}</span>
          <h1>CALL<br />ME<br /><em>BABY</em></h1>
          <p>멀리 떨어진 부모와 아이가 영상통화와 공동 활동을 통해 일상의 이야기를 자연스럽게 이어갈 수 있도록 만든 가족 커뮤니케이션 서비스</p>
          <div className="callmebaby-meta">
            <span>2026</span>
            <span>6 PEOPLE</span>
            <span>FRONTEND</span>
            <span>UX IMPROVEMENT</span>
            <span>FINAL PRESENTATION</span>
          </div>
          <strong>REAL-TIME COMMUNICATION <i>+</i> SHARED EXPERIENCE</strong>
        </div>
        <CallmebabyMedia image={callmebabyCase.heroImage} className="callmebaby-hero-media" />
      </section>

      <section className="callmebaby-section callmebaby-overview" aria-labelledby="callmebaby-overview-title">
        <div className="callmebaby-heading">
          <span>01 / PROJECT OVERVIEW</span>
          <h2 id="callmebaby-overview-title">{callmebabyCase.overview.title}</h2>
        </div>
        <div className="callmebaby-copy">
          {callmebabyCase.overview.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="callmebaby-section callmebaby-problem" aria-labelledby="callmebaby-problem-title">
        <div className="callmebaby-heading compact-heading">
          <span>02 / THE PROBLEM</span>
          <h2 id="callmebaby-problem-title">WHY A<br /><em>SHARED</em><br />EXPERIENCE?</h2>
        </div>
        <div className="callmebaby-problem-grid">
          {callmebabyCase.problems.map((problem) => (
            <article key={problem.id}>
              <span>{problem.id}</span>
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="callmebaby-section callmebaby-role" aria-labelledby="callmebaby-role-title">
        <div className="callmebaby-heading">
          <span>03 / MY ROLE</span>
          <h2 id="callmebaby-role-title">MY <em>CONTRIBUTION.</em></h2>
          <p className="ownership-note">아래 항목은 박규연이 직접 담당하고 기여한 영역입니다.</p>
        </div>
        <div className="callmebaby-role-list">
          {callmebabyCase.roles.map((role, roleIndex) => (
            <article key={role.title}>
              <span>{String(roleIndex + 1).padStart(2, "0")}</span>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="callmebaby-core" aria-labelledby="callmebaby-core-title">
        <div className="callmebaby-core-heading">
          <span>04 / CORE EXPERIENCE</span>
          <h2 id="callmebaby-core-title">MORE THAN<br /><em>A VIDEO CALL.</em></h2>
          <p>얼굴을 보는 통화에서 함께 무언가를 하는 시간으로.</p>
        </div>
        <CallmebabyMedia image={callmebabyCase.coreImage} className="callmebaby-core-media" />
        <div className="callmebaby-core-points">
          {callmebabyCase.coreExperiences.map((experience, experienceIndex) => (
            <article key={experience.title}>
              <span>0{experienceIndex + 1}</span>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="callmebaby-section callmebaby-features" aria-labelledby="callmebaby-features-title">
        <div className="callmebaby-heading feature-heading">
          <span>05 / FEATURE FLOW</span>
          <h2 id="callmebaby-features-title">ONE CONNECTED <em>JOURNEY.</em></h2>
        </div>
        <div className="callmebaby-feature-list">
          {callmebabyCase.features.map((feature) => (
            <article className={`callmebaby-feature feature-${feature.id} feature-image-${feature.imagePosition}`} key={feature.id}>
              <div className="callmebaby-feature-copy">
                <span>{feature.id} / {feature.label}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
              {feature.image && <CallmebabyMedia image={feature.image} />}
            </article>
          ))}
          <article className="callmebaby-feature callmebaby-feature-diary">
            <div className="callmebaby-feature-copy">
              <span>04 / AI DIARY</span>
              <h3>통화가 끝난 뒤에도{`\n`}이야기는 남습니다.</h3>
              <p>통화 내용을 기반으로 아이의 이야기와 부모의 메모, 함께 그린 그림을 하나의 그림일기로 정리해 가족의 기록으로 남길 수 있습니다.</p>
            </div>
            <div className="callmebaby-diary-grid">
              <CallmebabyMedia image={callmebabyCase.diaryDetailImage} className="diary-detail" />
              <CallmebabyMedia image={callmebabyCase.diaryCompleteImage} className="diary-complete" />
            </div>
          </article>
          <article className="callmebaby-feature callmebaby-feature-home">
            <div className="callmebaby-feature-copy">
              <span>05 / HOME</span>
              <h3>두 개의 핵심 경험으로{`\n`}바로 이동합니다.</h3>
              <p>로그인 이후 사용자는 영상통화와 그림일기 중 오늘 필요한 활동을 고르고, 끊김 없이 다음 경험으로 이동할 수 있습니다.</p>
            </div>
            <CallmebabyMedia image={callmebabyCase.homeImage} />
          </article>
        </div>
      </section>

      <section className="callmebaby-section callmebaby-deep-dive" aria-labelledby="callmebaby-deep-title">
        <div className="callmebaby-heading">
          <span>06 / FRONTEND DEEP DIVE · MY CONTRIBUTION</span>
          <h2 id="callmebaby-deep-title">하나의 화면에서<br /><em>같은 그림을 그리기 위해</em></h2>
          <p className="deep-dive-intro">LiveKit Data Packet을 활용해 영상통화 중 부모와 아이의 그림판 상태를 실시간으로 동기화했습니다.</p>
        </div>
        <div className="drawing-detail-grid">
          {callmebabyCase.drawingDetails.map((detail) => (
            <article key={detail.id}>
              <span>{detail.id}</span>
              <h3>{detail.title}</h3>
              <p>{detail.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="callmebaby-section callmebaby-response" aria-labelledby="callmebaby-response-title">
        <div className="callmebaby-heading">
          <span>07 / USER FEEDBACK & IMPROVEMENT</span>
          <h2 id="callmebaby-response-title">USER<br /><em>RESPONSE.</em></h2>
          <p className="ownership-note">15명의 사용자 테스트를 통해 서비스에 대한 흥미도와 가족 간 유대감 형성에 대한 반응을 확인했습니다.</p>
        </div>
        <div className="user-response-grid">
          {callmebabyCase.userResponse.map((response) => (
            <article key={response.label}>
              <strong>{response.value}</strong>
              <h3>{response.label}</h3>
              <p>{response.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="callmebaby-section callmebaby-results" aria-labelledby="callmebaby-results-title">
        <div className="callmebaby-heading compact-heading">
          <span>08 / RESULT</span>
          <h2 id="callmebaby-results-title">BUILT.<br />TESTED.<br /><em>PRESENTED.</em></h2>
        </div>
        <div className="callmebaby-result-grid">
          {callmebabyCase.results.map((result) => (
            <article key={result.label}>
              <strong>{result.value}</strong>
              <span>{result.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="callmebaby-system" aria-labelledby="callmebaby-system-title">
        <div className="callmebaby-system-heading">
          <span>09 / PROJECT TECH & ARCHITECTURE · TEAM TECHNOLOGY</span>
          <h2 id="callmebaby-system-title">FROM VOICE<br /><em>TO MEMORY.</em></h2>
          <p>이 영역은 박규연 개인 구현이 아닌 6인 팀 프로젝트 전체 시스템과 기술을 설명합니다.</p>
        </div>

        <div className="callmebaby-ai-flow" aria-label="AI experience flow">
          {callmebabyCase.systemFlow.map((step, stepIndex) => (
            <div key={step}><span>{String(stepIndex + 1).padStart(2, "0")}</span><b>{step}</b></div>
          ))}
        </div>

        <div className="callmebaby-ai-result">
          <div>
            <span>PROJECT AI RESULT</span>
            <strong>{callmebabyCase.aiResult.before}</strong>
            <small>BASE CER</small>
          </div>
          <i>→</i>
          <div>
            <span>TEAM RESULT</span>
            <strong>{callmebabyCase.aiResult.after}</strong>
            <small>FINAL CER</small>
          </div>
          <div className="improvement">
            <strong>{callmebabyCase.aiResult.improvement}</strong>
            <small>RELATIVE IMPROVEMENT</small>
          </div>
          <p>{callmebabyCase.aiResult.description}</p>
        </div>

        <div className="callmebaby-architecture">
          <h3>SYSTEM ARCHITECTURE</h3>
          <div className="architecture-grid">
            {Object.entries(callmebabyCase.architecture).map(([flow, nodes]) => (
              <article key={flow}>
                <span>{flow.toUpperCase()}</span>
                {nodes.map((node, nodeIndex) => (
                  <div key={node}><b>{node}</b>{nodeIndex < nodes.length - 1 && <i>↓</i>}</div>
                ))}
              </article>
            ))}
          </div>
        </div>

        <div className="callmebaby-tech">
          <h3>PROJECT TECH STACK</h3>
          <div className="callmebaby-tech-list">
            {callmebabyCase.techStack.map((group) => (
              <details key={group.category}>
                <summary><span>{group.category}</span><b>{group.items.length} TOOLS</b></summary>
                <p>{group.items.join(" · ")}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="callmebaby-section callmebaby-retrospective" aria-labelledby="callmebaby-retro-title">
        <div className="callmebaby-heading">
          <span>10 / RETROSPECTIVE</span>
          <h2 id="callmebaby-retro-title">WHAT<br />HAPPENED.<br /><em>WHAT CHANGED.</em></h2>
        </div>
        <div className="retrospective-list">
          {callmebabyCase.retrospective.map((item, retroIndex) => (
            <article key={item.title}>
              <span>{String(retroIndex + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <Link className="next-work" to={`/work/${next.slug}`}>
        <span>NEXT PROJECT →</span>
        <b>{next.title}</b>
        <i>↗</i>
      </Link>
    </main>
  );
}

function SwithMedia({ image, size = "medium", onOpen }: { image: ProjectImage; size?: "large" | "medium" | "small"; onOpen: (image: ProjectImage) => void }) {
  return (
    <figure className={`swith-media swith-media-${size}`}>
      <button type="button" onClick={() => onOpen(image)} aria-label={`${image.alt} 크게 보기`}>
        <img src={assetUrl(image.src)} alt={image.alt} />
        <span>VIEW +</span>
      </button>
    </figure>
  );
}

function SwithDetail({ project, index, next }: { project: Work; index: number; next: Work }) {
  const [zoomImage, setZoomImage] = useState<ProjectImage | null>(null);
  const accent = { "--work-accent": project.accent } as CSSProperties;
  const { images } = swithCase;

  return (
    <main className="work-detail swith-case project-swith" style={accent}>
      <header className="detail-nav">
        <Link to="/" aria-label="Park Kyuyeon 포트폴리오 홈">{profile.mark}</Link>
        <Link to="/">CLOSE ×</Link>
      </header>

      <section className="swith-hero">
        <div className="swith-hero-copy">
          <span className="case-eyebrow">CASE STUDY / {String(index + 1).padStart(2, "0")}</span>
          <h1>SWI<em>TH</em></h1>
          <p className="swith-hero-description">{swithCase.basicInfo.message}</p>
          <div className="swith-meta">
            <span>{swithCase.basicInfo.period}</span><span>{swithCase.basicInfo.team}</span><span>{swithCase.basicInfo.role}</span>
          </div>
        </div>
        <SwithMedia image={images.landing} size="large" onOpen={setZoomImage} />
      </section>

      <section className="swith-award" aria-label="SWITH project award">
        <div className="swith-award-rank"><span>AWARD / PROJECT RESULT</span><strong>{swithCase.award.value}</strong></div>
        <div className="swith-award-copy"><span>SSAFY AWARD</span><h2>{swithCase.award.title}</h2><p>{swithCase.award.detail}</p></div>
        <img src={assetUrl(images.logoSymbol.src)} alt="" />
      </section>

      <section className="swith-section swith-overview" aria-labelledby="swith-overview-title">
        <div className="swith-heading">
          <span>01 / PROJECT OVERVIEW</span>
          <h2 id="swith-overview-title">스터디를 이어갈수록<br /><em>공부보다 어려워진 것들.</em></h2>
        </div>
        <div className="swith-overview-copy">
          {swithCase.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="swith-problem" aria-labelledby="swith-problem-title">
        <div className="swith-heading inverse">
          <span>02 / THE PROBLEM</span>
          <h2 id="swith-problem-title">THREE<br /><em>FRICTIONS.</em></h2>
        </div>
        <div className="swith-pain-grid">
          {swithCase.painPoints.map((point) => (
            <article key={point.id}><span>{point.id} / {point.label}</span><h3>{point.quote}</h3><p>{point.detail}</p></article>
          ))}
        </div>
      </section>

      <section className="swith-section swith-role" aria-labelledby="swith-role-title">
        <div className="swith-heading">
          <span>03 / MY ROLE</span>
          <h2 id="swith-role-title">MY <em>CONTRIBUTION.</em></h2>
          <p>아래 항목은 박규연이 직접 담당하고 기여한 영역입니다.</p>
        </div>
        <div className="swith-role-list">
          {swithCase.roles.map((role, roleIndex) => (
            <article key={role.title}><span>0{roleIndex + 1}</span><h3>{role.title}</h3><p>{role.description}</p></article>
          ))}
        </div>
      </section>

      <section className="swith-flow" aria-labelledby="swith-flow-title">
        <div className="swith-flow-intro">
          <img src={assetUrl(images.logoSymbol.src)} alt="" />
          <div><span>04 / LEARNING FLOW</span><h2 id="swith-flow-title" className="swith-flow-title">ONE LEARNING <em>LOOP.</em></h2></div>
        </div>
        <div className="swith-flow-track">
          {swithCase.learningFlow.map((step, stepIndex) => (
            <article key={step.phase}><span>{String(stepIndex + 1).padStart(2, "0")}</span><b>{step.phase}</b><p>{step.action}</p></article>
          ))}
        </div>
      </section>

      <section className="swith-section swith-recommend" aria-labelledby="swith-recommend-title">
        <div className="swith-feature-copy">
          <span>05 / BEFORE THE STUDY</span>
          <h2 id="swith-recommend-title">오늘은 <em>무슨 문제를 풀지?</em></h2>
          <p>스터디원의 solved.ac 이력과 문제 풀이 데이터를 바탕으로 스터디에 적합한 문제를 추천합니다. 추천 이유와 예상 난이도도 함께 제공해 선택의 근거를 이해할 수 있도록 했습니다.</p>
          <div className="swith-chip-row">{swithCase.recommendationFeatures.map((feature) => <span key={feature}>{feature}</span>)}</div>
        </div>
        <SwithMedia image={images.problemList} size="large" onOpen={setZoomImage} />
      </section>

      <section className="swith-section swith-service" aria-labelledby="swith-service-title">
        <div className="swith-heading wide-heading">
          <span>06 / FROM DASHBOARD TO STUDY</span>
          <h2 id="swith-service-title">전체 일정에서 <em>오늘의 스터디까지.</em></h2>
        </div>
        <div className="swith-service-grid">
          <article><SwithMedia image={images.dashboard} size="large" onOpen={setZoomImage} /><div><b>MAIN DASHBOARD</b><p>전체 일정, 참여 그룹, 오늘의 스터디를 한눈에 확인합니다.</p></div></article>
          <article><SwithMedia image={images.groupDetail} size="medium" onOpen={setZoomImage} /><div><b>GROUP DETAIL</b><p>스터디 일정과 멤버, 문제 목록을 확인하고 실제 학습으로 진입합니다.</p></div></article>
        </div>
      </section>

      <section className="swith-solve" aria-labelledby="swith-solve-title">
        <div><span>07 / SOLVE</span><h2 id="swith-solve-title">추천받은 문제를 <em>바로 풀 수 있도록.</em></h2><p>문제 설명과 Code Editor를 한 화면에서 확인하고 코드를 작성·실행·제출할 수 있도록 구성했습니다.</p></div>
        <SwithMedia image={images.problemEditor} size="large" onOpen={setZoomImage} />
      </section>

      <section className="swith-visualization" aria-labelledby="swith-visual-title">
        <div className="swith-visual-heading"><span>08 / CODE VISUALIZATION</span><h2 id="swith-visual-title">코드의 움직임을<br /><em>눈으로 보여주면?</em></h2></div>
        <div className="swith-visual-media">
          <SwithMedia image={images.codeGraph} size="large" onOpen={setZoomImage} />
          <SwithMedia image={images.codeGrid} size="medium" onOpen={setZoomImage} />
        </div>
        <div className="swith-visual-steps">
          {swithCase.visualizationSteps.map((step) => <article key={step.id}><span>{step.id}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}
        </div>
        <div className="swith-visual-stats">
          {swithCase.visualizationStats.map((stat) => <article key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></article>)}
        </div>
        <div className="swith-technical-result primary-result">
          <span>{swithCase.technicalHighlights[0].label}</span><h3>{swithCase.technicalHighlights[0].title}</h3>
          <div><strong>{swithCase.technicalHighlights[0].before}</strong><i>→</i><strong>{swithCase.technicalHighlights[0].after}</strong></div>
          <p>{swithCase.technicalHighlights[0].description}</p>
        </div>
      </section>

      <section className="swith-section swith-live" aria-labelledby="swith-live-title">
        <div className="swith-heading"><span>09 / LIVE STUDY EXPERIENCE</span><h2 id="swith-live-title">TOGETHER, <em>IN REAL TIME.</em></h2></div>
        <div className="swith-live-content">
          <p>실제 스터디에서는 음성 채팅, 화이트보드, 실시간 댓글, AI Insight를 통해 서로의 풀이를 비교하고 개선 방향을 확인할 수 있도록 구성했습니다.</p>
          <div className="swith-chip-row"><span>VOICE CHAT</span><span>WHITEBOARD</span><span>LIVE COMMENT</span><span>AI INSIGHT</span></div>
          <div className="swith-technical-result">
            <span>{swithCase.technicalHighlights[1].label}</span><h3>{swithCase.technicalHighlights[1].title}</h3>
            <div><strong>{swithCase.technicalHighlights[1].before}</strong><i>→</i><strong>{swithCase.technicalHighlights[1].after}</strong></div>
            <p>{swithCase.technicalHighlights[1].description}</p>
          </div>
        </div>
      </section>

      <section className="swith-after" aria-labelledby="swith-after-title">
        <div className="swith-after-heading"><span>10 / AI REPORT & REVIEW</span><h2 id="swith-after-title">스터디가 끝나도 <em>학습은 이어지도록.</em></h2></div>
        <article className="swith-after-row report-row"><div><b>AI STUDY REPORT</b><p>참여자, 문제, 코드, 대화 내용을 기반으로 학습 내용을 신문형 AI 리포트로 정리합니다.</p></div><SwithMedia image={images.studyReport} size="medium" onOpen={setZoomImage} /></article>
        <article className="swith-after-row review-row"><SwithMedia image={images.reviewRecommendation} size="medium" onOpen={setZoomImage} /><div><b>REVIEW RECOMMENDATION</b><p>세션에서 풀었던 문제와 알고리즘 유형을 바탕으로 유사 문제를 추천해 다음 학습으로 연결합니다.</p></div></article>
      </section>

      <section className="swith-tech" aria-labelledby="swith-tech-title">
        <div className="swith-tech-heading"><span>11 / TECHNICAL HIGHLIGHTS</span><h2 id="swith-tech-title">MY STACK <em>& PROJECT STACK.</em></h2><p>개인 담당 영역과 6인 팀 전체 기술을 분리해 표시했습니다.</p></div>
        <div className="swith-stack">
          <div className="swith-my-stack"><h3>MY STACK</h3>{swithCase.myStack.map((item) => <span key={item}>{item}</span>)}</div>
          <div className="swith-project-stack"><h3>PROJECT STACK · TEAM TECHNOLOGY</h3>{swithCase.projectStack.map((group) => <details key={group.category}><summary>{group.category}<i>+</i></summary><p>{group.items}</p></details>)}</div>
        </div>
      </section>

      <section className="swith-results" aria-labelledby="swith-results-title">
        <div className="swith-results-heading"><span>12 / RESULT</span><h2 id="swith-results-title">THE RESULT <em>SPEAKS.</em></h2></div>
        <div className="swith-result-grid">
          {swithCase.results.map((result, resultIndex) => <article className={resultIndex === 0 ? "award-result" : ""} key={result.label}><strong>{result.value}</strong><span>{result.label}</span></article>)}
        </div>
      </section>

      <section className="swith-section swith-retrospective" aria-labelledby="swith-retro-title">
        <div className="swith-heading"><span>13 / WHAT I LEARNED</span><h2 id="swith-retro-title">FROM FEATURES <em>TO A STORY.</em></h2></div>
        <div className="swith-retro-list">{swithCase.retrospective.map((item, itemIndex) => <article key={item.title}><span>0{itemIndex + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        <blockquote>“오늘의 풀이가 내일의 실력이 될 때까지.”</blockquote>
      </section>

      <Link className="next-work" to={`/work/${next.slug}`}><span>NEXT PROJECT →</span><b>{next.title}</b><i>↗</i></Link>

      {zoomImage && (
        <div className="swith-lightbox" role="dialog" aria-modal="true" aria-label="SWITH 화면 크게 보기" onClick={() => setZoomImage(null)}>
          <button type="button" onClick={() => setZoomImage(null)} aria-label="확대 화면 닫기">CLOSE ×</button>
          <img src={assetUrl(zoomImage.src)} alt={zoomImage.alt} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}

function FitmeMedia({ image, size, onOpen }: { image: ProjectImage; size: "large" | "medium" | "small"; onOpen: (image: ProjectImage) => void }) {
  return (
    <figure className={`fitme-media fitme-media-${size}`}>
      <button type="button" onClick={() => onOpen(image)} aria-label={`${image.alt} 크게 보기`}>
        <img src={assetUrl(image.src)} alt={image.alt} />
        <span>VIEW +</span>
      </button>
      {image.caption && <figcaption>{image.caption}</figcaption>}
    </figure>
  );
}

function FitmeDetail({ project, index, next }: { project: Work; index: number; next: Work }) {
  const [zoomImage, setZoomImage] = useState<ProjectImage | null>(null);
  const { images } = fitmeCase;
  const accent = { "--work-accent": project.accent } as CSSProperties;

  return (
    <main className="work-detail fitme-case project-fitme" style={accent}>
      <header className="detail-nav fitme-nav">
        <Link to="/" aria-label="Park Kyuyeon 포트폴리오 홈">{profile.mark}</Link>
        <Link to="/">CLOSE ×</Link>
      </header>

      <section className="fitme-hero">
        <div className="fitme-hero-copy">
          <span className="fitme-kicker">CASE STUDY / {String(index + 1).padStart(2, "0")}</span>
          <h1>FIT<em>ME</em></h1>
          <h2>{fitmeCase.basicInfo.tagline}</h2>
          <p>{fitmeCase.basicInfo.description}</p>
          <div className="fitme-meta"><span>{fitmeCase.basicInfo.period}</span><span>{fitmeCase.basicInfo.team}</span><span>{fitmeCase.basicInfo.role}</span></div>
        </div>
        <FitmeMedia image={images.landing} size="large" onOpen={setZoomImage} />
      </section>

      <section className="fitme-section fitme-overview" aria-labelledby="fitme-overview-title">
        <div className="fitme-heading">
          <span>01 / PROJECT OVERVIEW</span>
          <h2 id="fitme-overview-title">온라인에서는 직접 입어보기 전에<br /><em>내게 어울릴지 판단해야 합니다.</em></h2>
        </div>
        <div className="fitme-copy">{fitmeCase.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
      </section>

      <section className="fitme-problem" aria-labelledby="fitme-problem-title">
        <div className="fitme-heading inverse"><span>02 / THE PROBLEM</span><h2 id="fitme-problem-title">THREE QUESTIONS.<br /><em>ONE FLOW.</em></h2></div>
        <div className="fitme-problem-grid">
          {fitmeCase.problems.map((problem) => <article key={problem.id}><span>{problem.id} / {problem.key}</span><h3>{problem.question}</h3><b>{problem.answer} →</b></article>)}
        </div>
      </section>

      <section className="fitme-section fitme-role" aria-labelledby="fitme-role-title">
        <div className="fitme-heading"><span>03 / MY ROLE</span><h2 id="fitme-role-title">MY <em>CONTRIBUTION.</em></h2><p>아래 항목은 박규연이 직접 담당하고 기여한 영역입니다.</p></div>
        <div className="fitme-role-list">{fitmeCase.roles.map((role) => <article key={role.id}><span>{role.id}</span><h3>{role.title}</h3><p>{role.description}</p></article>)}</div>
      </section>

      <section className="fitme-journey" aria-labelledby="fitme-journey-title">
        <div className="fitme-journey-heading"><span>04 / DIAGNOSIS JOURNEY</span><h2 id="fitme-journey-title">DESKTOP TO <em>MOBILE.</em></h2><p>전신 이미지를 PC에서 바로 업로드하거나 QR을 통해 휴대폰으로 촬영한 이미지를 진단 Flow에 연결할 수 있도록 구성했습니다.</p></div>
        <ol className="fitme-flow">{fitmeCase.diagnosisFlow.map((step, flowIndex) => <li key={step}><span>{String(flowIndex + 1).padStart(2, "0")}</span><b>{step}</b></li>)}</ol>
        <div className="fitme-diagnosis-media"><FitmeMedia image={images.photoUpload} size="large" onOpen={setZoomImage} /><FitmeMedia image={images.qrMobileUpload} size="small" onOpen={setZoomImage} /></div>
      </section>

      <section className="fitme-analysis" aria-labelledby="fitme-analysis-title">
        <div className="fitme-analysis-copy"><span>05 / AI ANALYSIS</span><h2 id="fitme-analysis-title">사진만 보지 않고<br /><em>설문과 함께 판단했습니다.</em></h2><p>사용자가 입력한 기본 정보와 전신 이미지 분석 결과를 활용하고, 이미지만으로 판단하기 어려운 체형 특징은 설문 응답으로 보완했습니다.</p><div className="fitme-analysis-formula"><b>BODY INFO</b><i>+</i><b>IMAGE ANALYSIS</b><i>+</i><b>SURVEY</b><i>→</i><strong>BODY TYPE</strong></div></div>
        <FitmeMedia image={images.aiAnalysis} size="medium" onOpen={setZoomImage} />
      </section>

      <section className="fitme-result" aria-labelledby="fitme-result-title">
        <div className="fitme-heading"><span>06 / RESULT</span><h2 id="fitme-result-title">YOUR FITME <em>RESULT.</em></h2><p>진단이 끝나면 최종 골격 유형, 체형 특징, 스타일 키워드와 분석 결과를 한 화면에서 보여줍니다.</p></div>
        <FitmeMedia image={images.result} size="large" onOpen={setZoomImage} />
        <div className="fitme-body-types">{fitmeCase.bodyTypes.map((type) => <article key={type.title}><h3>{type.title}</h3><p>{type.description}</p></article>)}</div>
      </section>

      <section className="fitme-style" aria-labelledby="fitme-style-title">
        <div className="fitme-heading"><span>07 / RESULT & STYLE GUIDE</span><h2 id="fitme-style-title">FROM RESULT <em>TO STYLE.</em></h2><p>유형 이름으로 끝내지 않고 실제 옷을 고를 때 활용할 수 있도록 어울리는 스타일, 피하면 좋은 스타일과 구체적인 착장 기준으로 풀어냈습니다.</p></div>
        <div className="fitme-style-media"><FitmeMedia image={images.styleGuide} size="medium" onOpen={setZoomImage} /><FitmeMedia image={images.fitDetails} size="medium" onOpen={setZoomImage} /></div>
      </section>

      <section className="fitme-recommend" aria-labelledby="fitme-recommend-title">
        <div className="fitme-heading inverse"><span>08 / PRODUCT RECOMMENDATION</span><h2 id="fitme-recommend-title">진단 결과를<br /><em>실제 상품 선택까지 연결했습니다.</em></h2><p>머신러닝 Ranking 모델이 아니라 골격 유형을 중심으로 상품 태그와 사용자 필터를 조합하는 규칙 기반 추천 구조입니다.</p></div>
        <div className="fitme-inputs">{fitmeCase.recommendation.inputs.map((input) => <span key={input}>{input}</span>)}</div>
        <FitmeMedia image={images.productRecommendation} size="large" onOpen={setZoomImage} />
        <div className="fitme-principles">{fitmeCase.recommendation.principles.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
      </section>

      <section className="fitme-section fitme-community" aria-labelledby="fitme-community-title">
        <div className="fitme-heading"><span>09 / COMMUNITY & RETENTION</span><h2 id="fitme-community-title">BEYOND <em>THE RESULT.</em></h2></div>
        <article className="fitme-community-row"><FitmeMedia image={images.community} size="medium" onOpen={setZoomImage} /><div><h3>진단에서 끝나지 않고<br />경험을 공유하도록.</h3><p>사용자는 자신의 골격 유형과 스타일링 경험을 후기 Community에 공유할 수 있습니다.</p><div className="fitme-feature-chips">{fitmeCase.communityFeatures.map((feature) => <span key={feature}>{feature}</span>)}</div></div></article>
        <article className="fitme-community-row reverse"><div><h3>다시 돌아왔을 때도<br />내 경험이 이어지도록.</h3><p>마이페이지에서 후기, 저장한 상품, 최근 추천 상품과 사용자 정보를 다시 확인할 수 있도록 구성했습니다.</p><div className="fitme-feature-chips">{fitmeCase.myPageFeatures.map((feature) => <span key={feature}>{feature}</span>)}</div></div><FitmeMedia image={images.myPage} size="medium" onOpen={setZoomImage} /></article>
      </section>

      <section className="fitme-stack" aria-labelledby="fitme-stack-title">
        <div className="fitme-heading inverse"><span>10 / FULL STACK IMPLEMENTATION</span><h2 id="fitme-stack-title">FULL STACK <em>EXPERIENCE.</em></h2><p>Vue 화면에서 Django API와 Database까지 이어지는 흐름을 직접 연결했습니다.</p></div>
        <div className="fitme-architecture">{fitmeCase.architecture.map((node, nodeIndex) => <article key={node.title}><span>{node.label}</span><h3>{node.title}</h3>{nodeIndex < fitmeCase.architecture.length - 1 && <i>→</i>}</article>)}</div>
        <div className="fitme-social"><span>SOCIAL LOGIN</span>{fitmeCase.socialFlow.map((step, socialIndex) => <b key={step}>{step}{socialIndex < fitmeCase.socialFlow.length - 1 && <i>→</i>}</b>)}</div>
        <div className="fitme-tech-grid">{fitmeCase.techStack.map((group) => <article key={group.category}><h3>{group.category}</h3><p>{group.items}</p></article>)}</div>
      </section>

      <section className="fitme-section fitme-retro" aria-labelledby="fitme-retro-title">
        <div className="fitme-heading"><span>11 / WHAT I LEARNED</span><h2 id="fitme-retro-title">FROM FLOW <em>TO SERVICE.</em></h2></div>
        <div className="fitme-retro-grid">{fitmeCase.retrospective.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
        <div className="fitme-final"><strong>FINAL PRESENTER</strong><p>기능을 나열하기보다 온라인 쇼핑의 Fit 문제에서 Diagnosis → Style → Product로 이어지는 서비스 Story를 정리해 최종 발표를 담당했습니다.</p></div>
      </section>

      <Link className="next-work" to={`/work/${next.slug}`}><span>NEXT PROJECT →</span><b>{next.title}</b><i>↗</i></Link>

      {zoomImage && <div className="fitme-lightbox" role="dialog" aria-modal="true" aria-label="FitMe 화면 크게 보기" onClick={() => setZoomImage(null)}><button type="button" onClick={() => setZoomImage(null)} aria-label="확대 화면 닫기">CLOSE ×</button><img src={assetUrl(zoomImage.src)} alt={zoomImage.alt} onClick={(event) => event.stopPropagation()} /></div>}
    </main>
  );
}

function ProjectDetailPage() {
  const { slug } = useParams();
  const index = works.findIndex((project) => project.slug === slug);
  const project = works[index];

  if (!project) {
    return (
      <main className="detail-missing">
        <h1>WORK NOT FOUND.</h1>
        <Link to="/">RETURN HOME</Link>
      </main>
    );
  }

  const next = works[(index + 1) % works.length];

  if (project.slug === "swith") {
    return <SwithDetail project={project} index={index} next={next} />;
  }

  if (project.slug === "callmebaby") {
    return <CallmebabyDetail project={project} index={index} next={next} />;
  }

  if (project.slug === "fitme") {
    return <FitmeDetail project={project} index={index} next={next} />;
  }

  if (project.slug === "instagram-magazine") {
    return <InstagramMagazineDetail project={project} index={index} next={next} />;
  }

  const accent = { "--work-accent": project.accent } as CSSProperties;
  const heroMeta = [
    ["CATEGORY", project.category],
    ["PERIOD", project.period],
    ["ROLE", project.role],
    ["TEAM", project.team],
    ["HIGHLIGHT", project.highlight],
  ];

  return (
    <main className={`work-detail case-study project-${project.slug}`} style={accent}>
      <header className="detail-nav">
        <Link to="/" aria-label="Park Kyuyeon 포트폴리오 홈">{profile.mark}</Link>
        <Link to="/">CLOSE ×</Link>
      </header>

      <section className="case-hero">
        <div className="case-hero-copy">
          <span className="case-eyebrow">CASE STUDY / {String(index + 1).padStart(2, "0")}</span>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <dl className="case-meta">
            {heroMeta.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ProjectMedia image={project.heroImage} label="01 / HERO IMAGE" />
      </section>

      <section className="case-overview" aria-labelledby="project-overview">
        <div>
          <span>PROJECT OVERVIEW</span>
          <h2 id="project-overview">프로젝트를<br />시작한 이유</h2>
        </div>
        <div className="case-copy">
          {project.overview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <div className="detail-tags">
            {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
          </div>
        </div>
      </section>

      <section className="case-wide-media" aria-label={`${project.title} project image`}>
        <ProjectMedia image={project.gallery[0]?.images[0] ?? project.heroImage} label="02 / PROJECT IMAGE" />
      </section>

      <section className="case-section case-split">
        <div className="case-section-title">
          <span>01 / PROBLEM</span>
          <h2>문제 정의</h2>
        </div>
        <div className="case-copy">
          <h3>{project.problem.title}</h3>
          {project.problem.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="case-section process-section">
        <div className="case-section-title">
          <span>02 / PROCESS</span>
          <h2>과정</h2>
        </div>
        <div className="process-list">
          {project.process.map((step, stepIndex) => (
            <article className="process-row" key={step.title}>
              <div className="process-copy">
                <span>STEP {String(stepIndex + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                {step.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <ProjectMedia image={step.image} label={`PROCESS / ${String(stepIndex + 1).padStart(2, "0")}`} />
            </article>
          ))}
        </div>
      </section>

      <section className="case-section case-split role-section">
        <div className="case-section-title">
          <span>03 / MY ROLE</span>
          <h2>내가 맡은 역할</h2>
        </div>
        <div className="case-copy">
          {project.myRole.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      <section className="case-section challenge-section">
        <div className="case-section-title">
          <span>04 / CHALLENGE & SOLUTION</span>
          <h2>문제와 해결</h2>
        </div>
        <div className="solution-flow">
          {[
            ["CHALLENGE", project.challenge],
            ["APPROACH", project.approach],
            ["RESULT", project.result],
          ].map(([label, copy], flowIndex) => (
            <article key={label}>
              <span>0{flowIndex + 1} / {label}</span>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="case-section result-section">
        <div className="case-section-title">
          <span>05 / RESULT</span>
          <h2>결과</h2>
        </div>
        <div className="result-grid">
          {project.results.map((item) => (
            <article key={`${item.value}-${item.label}`}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="case-gallery" aria-labelledby="gallery-title">
        <div className="case-section-title">
          <span>06 / GALLERY</span>
          <h2 id="gallery-title">프로젝트 기록</h2>
        </div>
        {project.gallery.map((block, galleryIndex) => (
          <GalleryBlockView block={block} index={galleryIndex} key={`${block.type}-${block.title}`} />
        ))}
      </section>

      <Link className="next-work" to={`/work/${next.slug}`}>
        <span>NEXT PROJECT →</span>
        <b>{next.title}</b>
        <i>↗</i>
      </Link>
    </main>
  );
}

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
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
