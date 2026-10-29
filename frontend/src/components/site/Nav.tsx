import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plus, X } from "lucide-react";
import { NAV, SITE } from "../../lib/content";
import { EASE } from "../../lib/motion";
import { Logo } from "./Logo";
import { getLenis } from "./SmoothScroll";

const MobileMenu = ({ onClose }: { onClose: () => void }) => (
  <motion.div
    className="fixed inset-0 z-[45] flex flex-col bg-[#03060F] px-6 pb-10 pt-24 lg:hidden"
    initial={{ clipPath: "inset(0 0 100% 0)" }}
    animate={{ clipPath: "inset(0 0 0% 0)" }}
    exit={{ clipPath: "inset(0 0 100% 0)" }}
    transition={{ duration: 0.7, ease: EASE }}
    data-testid="mobile-menu"
  >
    <nav className="flex flex-col gap-2">
      {NAV.map((n, i) => (
        <motion.div key={n.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}>
          <Link to={n.to} onClick={onClose} className="flex items-baseline gap-4 border-b border-white/10 py-4 text-5xl font-light tracking-tight text-white" data-testid={`mobile-nav-${n.label.toLowerCase()}`}>
            <span className="font-mono text-xs text-[#5B8CFF]">0{i + 1}</span>
            {n.label}
          </Link>
        </motion.div>
      ))}
    </nav>
    <div className="mt-auto space-y-4">
      <Link to="/contact/" onClick={onClose} className="btn btn-primary w-full justify-center" data-testid="mobile-menu-cta">Start a project</Link>
      <a href={`mailto:${SITE.email}`} className="block font-mono text-xs tracking-widest text-[#A9B4C8]">{SITE.email.toUpperCase()}</a>
    </div>
  </motion.div>
);

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else l?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`} data-testid="site-header">
        <div className="flex h-16 items-center justify-between px-5 md:px-8">
          <Link to="/" aria-label="SOLD AI Studio home" data-testid="nav-logo" className="relative z-[70]">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {NAV.slice(0, 3).map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`} data-testid={`nav-${n.label.toLowerCase()}`}>
                {n.label}
                <span className="nav-plus"><Plus size={10} strokeWidth={2} /></span>
              </NavLink>
            ))}
            <NavLink to="/contact/" className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`} data-testid="nav-contact">
              Contact
              <span className="nav-plus"><Plus size={10} strokeWidth={2} /></span>
            </NavLink>
            <span className="ml-2 flex items-center gap-1 font-mono text-[10px] tracking-widest text-[#A9B4C8]">
              <span className="border border-white/70 px-1.5 py-1 text-white">EN</span>
              <span className="px-1">SG</span>
            </span>
            <Link to="/contact/" className="btn btn-primary btn-sm" data-testid="nav-cta">Start a project</Link>
          </nav>
          <button className="relative z-[70] flex h-10 w-10 items-center justify-center border border-white/20 text-white lg:hidden" onClick={() => setOpen((o) => !o)} aria-label={open ? "Close menu" : "Open menu"} data-testid="mobile-menu-toggle">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
};
