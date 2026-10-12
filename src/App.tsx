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
import { certifications } from "./data/certifications";
import { contact, contactLinks } from "./data/contact";
import { experiences } from "./data/experiences";
import { skillGroups } from "./data/skills";
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
