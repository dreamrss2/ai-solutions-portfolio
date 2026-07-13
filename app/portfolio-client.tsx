/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  Bot,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Database,
  ExternalLink,
  FileText,
  GitBranch,
  GitFork,
  Mail,
  MapPin,
  Menu,
  Network,
  RotateCcw,
  ShieldCheck,
  Workflow,
  Wrench,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  experiments,
  githubUrl,
  homeCopy,
  localize,
  projects,
  type Lang,
  type Project,
  type ProjectLink,
  type ProjectMedia,
} from "./portfolio-data";

const LANGUAGE_STORAGE_KEY = "ren-sishuo-portfolio-language";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === "en" || stored === "zh") {
        setLangState(stored);
        document.documentElement.lang = stored === "zh" ? "zh-CN" : "en";
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
  }, []);

  const value = useMemo(() => ({ lang, setLang }), [lang, setLang]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

function useLanguage(): LanguageContextValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}

function LanguageSwitch() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="language-switch" aria-label={lang === "en" ? "Language" : "语言"}>
      <button
        className={lang === "en" ? "active" : ""}
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        className={lang === "zh" ? "active" : ""}
        type="button"
        onClick={() => setLang("zh")}
        aria-pressed={lang === "zh"}
      >
        中
      </button>
    </div>
  );
}

function SiteHeader({ casePage = false }: { casePage?: boolean }) {
  const { lang } = useLanguage();
  const t = homeCopy[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const prefix = casePage ? "/" : "";

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const navItems = [
    [`${prefix}#work`, t.nav.work],
    [`${prefix}#capabilities`, t.nav.capabilities],
    [`${prefix}#experience`, t.nav.experience],
    [`${prefix}#contact`, t.nav.contact],
  ];

  return (
    <header className="site-header">
      <Link className="brand" href={casePage ? "/" : "#top"} aria-label={lang === "en" ? "Ren Sishuo home" : "任思硕首页"}>
        <span className="brand-mark">RS</span>
        <span className="brand-name">{lang === "en" ? "Ren Sishuo" : "任思硕"}</span>
      </Link>

      <nav className="desktop-nav" aria-label={lang === "en" ? "Primary navigation" : "主导航"}>
        {navItems.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <div className="header-actions">
        <LanguageSwitch />
        <button
          className="icon-button menu-button"
          type="button"
          aria-label={menuOpen ? (lang === "en" ? "Close menu" : "关闭菜单") : (lang === "en" ? "Open menu" : "打开菜单")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          title={menuOpen ? (lang === "en" ? "Close menu" : "关闭菜单") : (lang === "en" ? "Open menu" : "打开菜单")}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <nav id="mobile-menu" className={`mobile-nav ${menuOpen ? "open" : ""}`} aria-label={lang === "en" ? "Mobile navigation" : "移动端导航"}>
        {navItems.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={17} /></a>
        ))}
      </nav>
    </header>
  );
}

function ImageLightbox({
  media,
  variant = "card",
  priority = false,
}: {
  media: ProjectMedia[];
  variant?: "card" | "gallery";
  priority?: boolean;
}) {
  const { lang } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const open = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setActiveIndex(index);
    setZoom(1);
    setIsOpen(true);
    document.body.classList.add("dialog-open");
    dialogRef.current?.showModal();
  }, []);

  const finishClose = useCallback(() => {
    setIsOpen(false);
    setZoom(1);
    document.body.classList.remove("dialog-open");
    previousFocusRef.current?.focus();
  }, []);

  const previous = useCallback(() => {
    setActiveIndex((index) => (index - 1 + media.length) % media.length);
    setZoom(1);
  }, [media.length]);

  const next = useCallback(() => {
    setActiveIndex((index) => (index + 1) % media.length);
    setZoom(1);
  }, [media.length]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        setZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))));
      }
      if (event.key === "-") {
        event.preventDefault();
        setZoom((value) => Math.max(1, Number((value - 0.25).toFixed(2))));
      }
      if (event.key === "0") {
        event.preventDefault();
        setZoom(1);
      }
      if (event.key === "ArrowLeft" && media.length > 1) previous();
      if (event.key === "ArrowRight" && media.length > 1) next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, media.length, next, previous]);

  useEffect(() => () => document.body.classList.remove("dialog-open"), []);

  const labels = {
    enlarge: lang === "en" ? "Enlarge image" : "放大图片",
    close: lang === "en" ? "Close image viewer" : "关闭图片查看器",
    zoomIn: lang === "en" ? "Zoom in" : "放大",
    zoomOut: lang === "en" ? "Zoom out" : "缩小",
    reset: lang === "en" ? "Reset zoom" : "重置缩放",
    previous: lang === "en" ? "Previous image" : "上一张图片",
    next: lang === "en" ? "Next image" : "下一张图片",
  };

  return (
    <>
      <div className={variant === "gallery" ? "case-gallery-grid" : "project-media-frame"}>
        {media.map((item, index) => (
          <button
            className={variant === "gallery" ? "gallery-trigger" : "media-trigger"}
            type="button"
            onClick={() => open(index)}
            aria-label={`${labels.enlarge}: ${localize(item.caption, lang)}`}
            key={item.src}
          >
            <img
              src={item.thumbnail}
              alt={localize(item.alt, lang)}
              width={1600}
              height={1000}
              loading={priority && index === 0 ? "eager" : "lazy"}
              fetchPriority={priority && index === 0 ? "high" : "auto"}
            />
            <span className="media-zoom" aria-hidden="true"><ZoomIn size={18} /></span>
            {variant === "gallery" && <span className="gallery-caption">{localize(item.caption, lang)}</span>}
          </button>
        ))}
      </div>

      <dialog
        className="lightbox"
        ref={dialogRef}
        onClose={finishClose}
        onClick={(event) => {
          if (event.target === dialogRef.current) close();
        }}
        aria-label={localize(media[activeIndex].caption, lang)}
      >
        <div className="lightbox-shell">
          <div className="lightbox-toolbar">
            <div className="lightbox-meta">
              <span>{activeIndex + 1} / {media.length}</span>
              <strong>{Math.round(zoom * 100)}%</strong>
            </div>
            <div className="lightbox-controls">
              <button className="icon-button" type="button" onClick={() => setZoom((value) => Math.max(1, Number((value - 0.25).toFixed(2))))} disabled={zoom <= 1} aria-label={labels.zoomOut} title={labels.zoomOut}><ZoomOut size={20} /></button>
              <button className="icon-button" type="button" onClick={() => setZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))))} disabled={zoom >= 3} aria-label={labels.zoomIn} title={labels.zoomIn}><ZoomIn size={20} /></button>
              <button className="icon-button" type="button" onClick={() => setZoom(1)} disabled={zoom === 1} aria-label={labels.reset} title={labels.reset}><RotateCcw size={19} /></button>
              <button className="icon-button lightbox-close" type="button" onClick={close} aria-label={labels.close} title={labels.close}><X size={22} /></button>
            </div>
          </div>

          <div className={`lightbox-stage ${zoom > 1 ? "zoomed" : ""}`}>
            {isOpen && (
              <img
                src={media[activeIndex].src}
                alt={localize(media[activeIndex].alt, lang)}
                style={{ width: `${zoom * 100}%` }}
              />
            )}
          </div>

          <div className="lightbox-footer">
            <p>{localize(media[activeIndex].caption, lang)}</p>
            {media.length > 1 && (
              <div className="lightbox-pagination">
                <button className="icon-button" type="button" onClick={previous} aria-label={labels.previous} title={labels.previous}><ChevronLeft size={22} /></button>
                <button className="icon-button" type="button" onClick={next} aria-label={labels.next} title={labels.next}><ChevronRight size={22} /></button>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

function ProjectCard({ project, lead = false }: { project: Project; lead?: boolean }) {
  const { lang } = useLanguage();
  const t = homeCopy[lang];

  return (
    <article className={`project-card accent-${project.accent} ${lead ? "project-card-lead" : ""}`}>
      <ImageLightbox media={project.media} priority={lead} />
      <div className="project-card-content">
        <div className="project-card-topline">
          <p className="project-label">{localize(project.category, lang)}</p>
          <span className="project-index">0{projects.indexOf(project) + 1}</span>
        </div>
        <h3>{localize(project.title, lang)}</h3>
        <p className="project-role">{localize(project.role, lang)}</p>
        <p className="project-summary">{localize(project.summary, lang)}</p>
        {lead && (
          <div className="project-facts compact-facts">
            {project.facts.map((fact) => (
              <div key={fact.value + fact.label.en}>
                <strong>{fact.value}</strong>
                <span>{localize(fact.label, lang)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="tag-row">
          {project.tags.slice(0, lead ? 5 : 4).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <Link className="text-link" href={`/projects/${project.slug}`}>
          {t.readCase}<ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}

function LinkIcon({ kind }: { kind: ProjectLink["kind"] }) {
  if (kind === "source") return <GitFork size={18} />;
  if (kind === "upstream") return <GitBranch size={18} />;
  return <ExternalLink size={18} />;
}

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  const { lang } = useLanguage();
  if (links.length === 0) return null;

  return (
    <div className="project-links">
      {links.map((link, index) => (
        <a
          className={index === 0 ? "button button-primary" : "button button-outline"}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          key={link.href}
        >
          <LinkIcon kind={link.kind} />{localize(link.label, lang)}<ArrowUpRight size={17} />
        </a>
      ))}
    </div>
  );
}

function HomeContent() {
  const { lang } = useLanguage();
  const t = homeCopy[lang];
  const [leadProject, ...secondaryProjects] = projects;
  const capabilityIcons = [BrainCircuit, Workflow, Code2, ShieldCheck];
  const platformIcons = [Database, Wrench, GitBranch];

  return (
    <main>
      <SiteHeader />

      <section className="hero" id="top">
        <div className="hero-overlay" />
        <div className="hero-content shell">
          <p className="hero-role"><MapPin size={16} />{t.role}</p>
          <h1>{t.name}</h1>
          <p className="hero-headline">{t.headline}</p>
          <p className="hero-intro">{t.intro}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">{t.primaryCta}<ArrowDown size={18} /></a>
            <a className="button button-secondary" href="mailto:rss1549596771@163.com">{t.secondaryCta}<ArrowUpRight size={18} /></a>
          </div>
          <div className="hero-proof" aria-label={lang === "en" ? "Core focus" : "核心方向"}>
            {t.proof.map((item) => <span key={item}><CheckCircle2 size={16} />{item}</span>)}
          </div>
        </div>
      </section>

      <section className="statement-band">
        <div className="shell statement-grid">
          <p className="eyebrow">{t.statementEyebrow}</p>
          <p className="statement-copy">{t.statement}</p>
        </div>
      </section>

      <section className="work-band" id="work">
        <div className="section shell">
          <div className="section-heading wide">
            <p className="eyebrow">{t.workEyebrow}</p>
            <h2>{t.workTitle}</h2>
            <p>{t.workIntro}</p>
          </div>
          <ProjectCard project={leadProject} lead />
          <div className="project-grid">
            {secondaryProjects.map((project) => <ProjectCard project={project} key={project.slug} />)}
          </div>
        </div>
      </section>

      <section className="experiment-band">
        <div className="section shell experiment-layout">
          <div className="section-heading compact-heading">
            <p className="eyebrow">{t.experimentEyebrow}</p>
            <h2>{t.experimentTitle}</h2>
            <p>{t.experimentIntro}</p>
          </div>
          <div className="experiment-list">
            {experiments.map((experiment) => {
              const Icon = experiment.icon === "bot" ? Bot : Network;
              return (
                <article className="experiment-item" key={experiment.title}>
                  <div className="experiment-icon"><Icon size={22} /></div>
                  <div>
                    <p className="project-label">{localize(experiment.category, lang)}</p>
                    <h3>{experiment.title}</h3>
                    <p>{localize(experiment.summary, lang)}</p>
                    <p className="experiment-evidence"><CheckCircle2 size={16} />{localize(experiment.evidence, lang)}</p>
                    <div className="tag-row">{experiment.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section shell" id="capabilities">
        <div className="section-heading wide">
          <p className="eyebrow">{t.capabilityEyebrow}</p>
          <h2>{t.capabilityTitle}</h2>
          <p>{t.capabilityIntro}</p>
        </div>
        <div className="capability-grid">
          {t.capabilities.map(([title, text], index) => {
            const Icon = capabilityIcons[index];
            return (
              <article className="capability-item" key={title}>
                <Icon size={24} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="platform-band">
        <div className="section shell">
          <div className="section-heading wide light-heading">
            <p className="eyebrow">{t.platformEyebrow}</p>
            <h2>{t.platformTitle}</h2>
          </div>
          <div className="platform-grid">
            {t.platformItems.map(([title, text], index) => {
              const Icon = platformIcons[index];
              return (
                <article className="platform-item" key={title}>
                  <Icon size={22} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="process-band">
        <div className="section shell">
          <div className="section-heading wide light-heading">
            <p className="eyebrow">{t.processEyebrow}</p>
            <h2>{t.processTitle}</h2>
          </div>
          <div className="process-grid">
            {t.process.map(([number, title, text]) => (
              <article className="process-item" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="experience">
        <div className="experience-grid">
          <div className="section-heading sticky-heading">
            <p className="eyebrow">{t.experienceEyebrow}</p>
            <h2>{t.experienceTitle}</h2>
            <p className="education"><FileText size={18} />{t.education}</p>
          </div>
          <div className="timeline">
            {t.experiences.map(([time, company, role, text]) => (
              <article className="timeline-item" key={time}>
                <time>{time}</time>
                <div>
                  <h3>{company}</h3>
                  <p className="timeline-role"><BriefcaseBusiness size={16} />{role}</p>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
      <SiteFooter />
    </main>
  );
}

function ContactBand() {
  const { lang } = useLanguage();
  const t = homeCopy[lang];
  return (
    <section className="contact-band" id="contact">
      <div className="shell contact-grid">
        <div>
          <p className="eyebrow">{t.contactEyebrow}</p>
          <h2>{t.contactTitle}</h2>
        </div>
        <div className="contact-copy">
          <p>{t.contactText}</p>
          <div className="contact-actions">
            <a className="button contact-button" href="mailto:rss1549596771@163.com"><Mail size={19} />{t.emailCta}<ArrowUpRight size={18} /></a>
            <a className="button contact-outline" href={githubUrl} target="_blank" rel="noreferrer"><GitFork size={19} />{t.githubCta}<ArrowUpRight size={18} /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const { lang } = useLanguage();
  const t = homeCopy[lang];
  return (
    <footer className="site-footer shell">
      <span>© {new Date().getFullYear()} {lang === "en" ? "Ren Sishuo" : "任思硕"}</span>
      <span>{t.footer}</span>
    </footer>
  );
}

function CaseStudyContent({ project }: { project: Project }) {
  const { lang } = useLanguage();
  const related = projects.filter((candidate) => candidate.slug !== project.slug).slice(0, 2);

  return (
    <main className="case-page">
      <SiteHeader casePage />

      <section className={`case-hero accent-${project.accent}`}>
        <div className="shell case-hero-inner">
          <Link className="back-link" href="/#work"><ArrowLeft size={18} />{lang === "en" ? "All selected work" : "返回代表项目"}</Link>
          <p className="case-kicker">{localize(project.category, lang)}</p>
          <h1>{localize(project.title, lang)}</h1>
          <p className="case-deck">{localize(project.summary, lang)}</p>
          <p className="case-role"><BriefcaseBusiness size={18} />{localize(project.role, lang)}</p>
          <ProjectLinks links={project.links} />
          <div className="project-facts case-facts">
            {project.facts.map((fact) => (
              <div key={fact.value + fact.label.en}>
                <strong>{fact.value}</strong>
                <span>{localize(fact.label, lang)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="case-gallery-section">
        <div className="shell">
          <div className="case-section-heading">
            <p className="eyebrow">{lang === "en" ? "PROJECT EVIDENCE" : "项目证据"}</p>
            <h2>{lang === "en" ? "Inspect the actual product surface" : "查看真实产品界面"}</h2>
            <p>{lang === "en" ? "Open any image for a full-resolution view with keyboard zoom controls." : "点击任意图片进入原图查看，并可使用键盘缩放。"}</p>
          </div>
          <ImageLightbox media={project.media} variant="gallery" priority />
        </div>
      </section>

      <section className="case-narrative">
        <div className="shell">
          {project.sections.map((section, index) => (
            <article className="case-story" key={section.title.en}>
              <div className="case-story-index">0{index + 1}</div>
              <div className="case-story-label"><p className="eyebrow">{localize(section.eyebrow, lang)}</p></div>
              <div className="case-story-content">
                <h2>{localize(section.title, lang)}</h2>
                <p>{localize(section.body, lang)}</p>
                {section.items && (
                  <ul>
                    {section.items.map((item) => <li key={item.en}><CheckCircle2 size={18} /><span>{localize(item, lang)}</span></li>)}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-workflow-band">
        <div className="section shell">
          <div className="section-heading wide light-heading">
            <p className="eyebrow">{lang === "en" ? "WORKFLOW" : "工作流"}</p>
            <h2>{lang === "en" ? "How the system moves from input to evidence" : "系统如何从输入走向可验证结果"}</h2>
          </div>
          <div className="case-workflow-grid">
            {project.workflow.map((step) => (
              <article className="case-workflow-step" key={step.number}>
                <span>{step.number}</span>
                <h3>{localize(step.title, lang)}</h3>
                <p>{localize(step.text, lang)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell related-section">
        <div className="section-heading wide">
          <p className="eyebrow">{lang === "en" ? "NEXT CASES" : "继续查看"}</p>
          <h2>{lang === "en" ? "More systems, different constraints" : "不同约束下的更多系统"}</h2>
        </div>
        <div className="related-grid">
          {related.map((candidate) => (
            <Link className={`related-link accent-${candidate.accent}`} href={`/projects/${candidate.slug}`} key={candidate.slug}>
              <span>{localize(candidate.category, lang)}</span>
              <h3>{localize(candidate.title, lang)}</h3>
              <p>{localize(candidate.outcome, lang)}</p>
              <strong>{lang === "en" ? "Read case" : "查看案例"}<ArrowUpRight size={17} /></strong>
            </Link>
          ))}
        </div>
      </section>

      <ContactBand />
      <SiteFooter />
    </main>
  );
}

export function PortfolioHome() {
  return <LanguageProvider><HomeContent /></LanguageProvider>;
}

export function CaseStudyPage({ project }: { project: Project }) {
  return <LanguageProvider><CaseStudyContent project={project} /></LanguageProvider>;
}
