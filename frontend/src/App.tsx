import { useCallback, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "sonner";
import "./index.css";
import { IntroContext } from "./lib/intro";
import { EASE } from "./lib/motion";
import { SmoothScroll } from "./components/site/SmoothScroll";
import { Nav } from "./components/site/Nav";
import { Footer } from "./components/site/Footer";
import { Scene } from "./components/site/Scene";
import { ChapterIndicator } from "./components/site/ChapterIndicator";
import { Preloader } from "./components/site/Preloader";
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Services from "./pages/Services";
import Works from "./pages/Works";
import WorkDetail from "./pages/WorkDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const Page = () => {
  const { pathname } = useLocation();
  return (
    <motion.main key={pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, ease: EASE }} className="relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="/services" element={<Services />} />
        <Route path="/works" element={<Works />} />
        <Route path="/works/:slug" element={<WorkDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </motion.main>
  );
};

const seenIntro = () => {
  try {
    return sessionStorage.getItem("sold-intro") === "1";
  } catch {
    return false;
  }
};

export default function App() {
  const [introDone, setIntroDone] = useState(seenIntro);
  const [showLoader] = useState(() => !seenIntro());
  const finish = useCallback(() => {
    try {
      sessionStorage.setItem("sold-intro", "1");
    } catch {
      /* storage unavailable */
    }
    setIntroDone(true);
  }, []);

  return (
    <IntroContext.Provider value={introDone}>
      <BrowserRouter>
        <SmoothScroll />
        {showLoader && <Preloader onDone={finish} />}
        <Scene />
        <Nav />
        <Page />
        <Footer />
        <ChapterIndicator />
        <Toaster theme="dark" position="bottom-right" />
      </BrowserRouter>
    </IntroContext.Provider>
  );
}
