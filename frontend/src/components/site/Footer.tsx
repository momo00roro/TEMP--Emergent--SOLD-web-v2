import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { NAV, SITE } from "../../lib/content";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-[#03060F]" data-testid="site-footer">
    <div className="wrap grid gap-12 py-16 md:grid-cols-12 md:py-24">
      <div className="md:col-span-4">
        <Logo />
        <p className="mt-6 max-w-xs text-sm leading-relaxed text-[#A9B4C8]">
          An award-winning, AI-first branding and digital design studio in Singapore.
        </p>
      </div>
      <div className="md:col-span-2">
        <p className="label-mono">Sitemap</p>
        <ul className="mt-5 space-y-3">
          {[{ label: "Home", to: "/" }, ...NAV].map((n) => (
            <li key={n.to}><Link to={n.to} className="link-u text-sm text-white" data-testid={`footer-nav-${n.label.toLowerCase()}`}>{n.label}</Link></li>
          ))}
        </ul>
      </div>
      <div className="md:col-span-3">
        <p className="label-mono">Singapore office</p>
        <address className="mt-5 not-italic text-sm leading-relaxed text-white">
          {SITE.address.map((l) => <span key={l} className="block">{l}</span>)}
        </address>
        <a href={`mailto:${SITE.email}`} className="link-u mt-4 inline-block text-sm text-white" data-testid="footer-email">{SITE.email}</a>
        <div className="mt-4 text-xs leading-relaxed text-[#A9B4C8]">{SITE.hours.map((h) => <span key={h} className="block">{h}</span>)}</div>
      </div>
      <div className="md:col-span-3">
        <p className="label-mono">Follow</p>
        <ul className="mt-5 space-y-3">
          {SITE.socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-sm text-white" data-testid={`footer-social-${s.label.toLowerCase()}`}>
                <span className="link-u">{s.label}</span>
                <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="wrap flex flex-col gap-2 border-t border-white/10 py-6 font-mono text-[11px] tracking-widest text-[#A9B4C8] md:flex-row md:justify-between">
      <span>© {new Date().getFullYear()} SOLD AI STUDIO</span>
      <span>MADE HUMAN — MADE BETTER</span>
    </div>
    <div className="footer-word" aria-hidden="true">SOLD</div>
  </footer>
);
