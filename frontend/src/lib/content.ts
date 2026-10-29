export const IMG = (f: string) => `/assets/images/${f}`;

export const SITE = {
  name: "SOLD AI Studio",
  email: "hello@sold.com.sg",
  address: ["60 Paya Lebar Rd", "#06-28", "Singapore 409051"],
  hours: ["Monday – Friday: 9:00 AM – 6:00 PM SGT", "Weekend: By appointment"],
  socials: [
    { label: "Behance", href: "https://www.behance.net/studiosold" },
    { label: "Instagram", href: "https://instagram.com/studio.sold" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/studiosold/" },
  ],
};

export const NAV = [
  { label: "Studio", to: "/studio/" },
  { label: "Services", to: "/services/" },
  { label: "Works", to: "/works/" },
  { label: "Contact", to: "/contact/" },
];

export const STATS = [
  { value: 14, label: "Years of experience" },
  { value: 124, label: "Brands partnered" },
  { value: 463, label: "Projects delivered" },
];

export const CLIENTS = [
  { name: "OCBC", file: "client__132x60-OCBC.webp" },
  { name: "UOB", file: "client__132x60-UOB.webp" },
  { name: "Nippon Paint", file: "client__132x60-NPS.webp" },
  { name: "Selleys", file: "client__132x60-Selleys.webp" },
  { name: "Cordlife", file: "client__132x60-Cordlife.webp" },
  { name: "FairPrice", file: "client__132x60-Fairprice.webp" },
  { name: "BNP Paribas", file: "client__132x60-BNP.webp" },
  { name: "BAT", file: "client__132x60-BAT.webp" },
  { name: "Boston Scientific", file: "client__132x60-boston-sci.webp" },
  { name: "Quotz", file: "client__132x60-Quotz.webp" },
];

export const AWARDS = ["MUSE Awards", "TITAN Brand Awards", "WBDS Creative Awards", "Behance", "Powbraaands.co"];

export type Service = { id: string; n: string; title: string; short: string; body: string; tags: string[]; icon: string };

export const SERVICES: Service[] = [
  { id: "brand-strategy", n: "01", icon: "compass", title: "Brand Strategy", short: "Positioning, architecture and research that shapes your foundation.", body: "Strategic positioning, brand architecture, competitive analysis, and market research that shapes your foundation. AI keeps the research behind your positioning organised and traceable.", tags: ["Positioning", "Architecture", "Research"] },
  { id: "brand-identity", n: "02", icon: "fingerprint", title: "Brand Identity", short: "Logo, visual systems and guidelines that define who you are.", body: "Logo design, visual systems, brand guidelines, and strategic positioning that defines who you are across touchpoints. AI-supported knowledge keeps identity rules applied consistently.", tags: ["Logo", "Visual system", "Guidelines"] },
  { id: "creative-direction", n: "03", icon: "aperture", title: "Creative Direction", short: "Brand visions turned into cohesive visual narratives.", body: "We transform brand visions into cohesive visual narratives through strategic storytelling and bold, intentional design.", tags: ["Storytelling", "Art direction"] },
  { id: "ui-ux-design", n: "04", icon: "pointer", title: "UI/UX Design", short: "Research, journeys and interfaces that put people first.", body: "User research, journey mapping, wireframing, prototyping, and interface design that puts people first.", tags: ["Research", "Prototyping", "Interface"] },
  { id: "digital-experiences", n: "05", icon: "layers", title: "Digital Experiences", short: "Bespoke websites, web apps and platforms where brands live.", body: "Bespoke websites, web applications, and digital platforms where brands live, innovate and evolve in the age of digital. AI helps prepare structured content and handover notes.", tags: ["Websites", "Web apps", "Platforms"] },
  { id: "digital-maintenance", n: "06", icon: "wrench", title: "Digital Maintenance", short: "Support, monitoring and optimisation that keeps you running.", body: "Ongoing support, updates, performance monitoring, and optimization to keep your digital presence running smoothly.", tags: ["Support", "Monitoring", "Optimisation"] },
  { id: "ai-first-systems", n: "07", icon: "sparkles", title: "AI-First Systems", short: "The layer across every service: research, knowledge, review, delivery.", body: "The layer that runs across every service: AI for project research, brand knowledge, review and delivery. Some of these systems already run inside the studio; others are still in development.", tags: ["Partly in use", "Research", "Review"] },
];

export const METHOD = [
  { n: "01", kicker: "Understand", title: "Traceable research", body: "AI organises research, interviews, and market material, each insight linked back to its source.", term: ["> understand — interviews, market notes, workshop briefs", "  sources → indexed → linked", "  out — every insight keeps its source"] },
  { n: "02", kicker: "Carry context", title: "Knowledge in reach", body: "AI keeps approved positioning, messaging, and decisions close as the brand grows.", term: ["> carry context — positioning, messaging, decisions", "  approved → stored → retrieved", "  out — the brand stays consistent as it grows"] },
  { n: "03", kicker: "Review", title: "Checks against the brief", body: "AI flags missing requirements and inconsistent language for our designers to assess.", term: ["> review — work vs. brief", "  flag → designer assesses → fix", "  out — fewer surprises before delivery"] },
  { n: "04", kicker: "Deliver", title: "Clear handovers", body: "AI prepares structured handover notes. Our designers review everything you receive.", term: ["> deliver — structured handover notes", "  prepare → designer review → ship", "  out — work you can trust and build on"] },
];

export type Work = { slug: string; title: string; location: string; tagline: string; disciplines: string[]; image: string; awards?: string[] };

export const WORKS: Work[] = [
  { slug: "koba", title: "KOBA", location: "Japan", tagline: "Weaving Heritage and Innovation", disciplines: ["Strategy", "Identity", "UI/UX", "Art Direction"], image: "project_koba.webp", awards: ["MUSE Award", "Behance FOTD"] },
  { slug: "radiant-health", title: "Radiant Health", location: "Malaysia", tagline: "Bridging Technology and Wellness", disciplines: ["Strategy", "Identity", "UI/UX", "Art Direction"], image: "project_radiant.webp", awards: ["TITAN Award", "WBDS Award"] },
  { slug: "moms-up", title: "Cordlife: Moms Up", location: "Singapore", tagline: "Empowering Happy Moms in Asia", disciplines: ["Strategy", "Identity", "UI/UX", "App"], image: "project_moms_up.webp" },
  { slug: "quotz", title: "sgCarMart: Quotz", location: "Singapore", tagline: "Making Car Selling Simpler", disciplines: ["Strategy", "Identity", "UI/UX", "Web"], image: "project_quotz.webp" },
  { slug: "nippon-paint-b2b", title: "Nippon Paint", location: "Singapore", tagline: "B2B Trade Digital Ecosystem", disciplines: ["Strategy", "UI/UX", "Web"], image: "project_nippon.webp" },
  { slug: "sunwheel", title: "Sunwheel", location: "Norway", tagline: "Bringing About Solar In Motion", disciplines: ["Strategy", "Identity", "UI/UX"], image: "project_sunwheel.webp" },
  { slug: "sccci", title: "SCCCI.ORG.SG", location: "Singapore", tagline: "120 Years of Commerce", disciplines: ["Strategy", "Identity"], image: "project_sccci.webp" },
  { slug: "nine-social", title: "Nine Social", location: "Singapore", tagline: "Accelerating Social Connections", disciplines: ["Strategy", "Identity", "UI/UX"], image: "project_nine.webp" },
  { slug: "selleys-flyer", title: "Selleys", location: "Singapore", tagline: "Supporting Partners Programme", disciplines: ["UI/UX", "Web", "Art Direction"], image: "project_selleys.webp" },
  { slug: "nippon-paint-sumo-buddies", title: "Nippon Paint", location: "Singapore", tagline: "Sumo Buddies Loyalty Programme", disciplines: ["Packaging", "Art Direction"], image: "project_sumo.webp" },
  { slug: "saughtandfound", title: "Saught&Found", location: "Singapore", tagline: "Helping Brands to Seek and Find", disciplines: ["Strategy", "Identity", "Art Direction"], image: "project_saught.webp" },
  { slug: "homerenoguru", title: "HomeRenoGuru", location: "Singapore", tagline: "B2C Portal + CRM + Mobile App", disciplines: ["UI/UX", "Web", "App"], image: "project_homereno.webp" },
  { slug: "idental", title: "i.Dental Clinic", location: "Singapore", tagline: "Democratising Dental Care", disciplines: ["UI/UX", "Web"], image: "project_idental.webp" },
];

export type Testimonial = { quote: string; name: string; role: string; photo: string; work?: string };

export const TESTIMONIALS: Testimonial[] = [
  { name: "Gerald Chua", role: "General Manager, Nippon Paint", photo: "testimonial_gerald-chua.webp", work: "nippon-paint-b2b", quote: "We developed a great relationship with Ronnie and his dedication to quality is evident in our collaboration. We especially appreciate his attention to details in bringing the NP Trade brand to life via the many digital touchpoints he setup." },
  { name: "Steve Ong", role: "Business Director, Quotz", photo: "testimonial_steve-ong.webp", work: "quotz", quote: "Ronnie and his team took the time to understand our vision and crafted a brand identity that resonates with our audience. Since the refresh, we have seen boosts in engagement on the website and social media, as well as website traffic." },
  { name: "Jamie Woon", role: "Brand Director, Cordlife Group", photo: "testimonial_jamie-woon.webp", work: "moms-up", quote: "Working with SOLD on the Moms Up branding and mobile app has been very smooth. From initial consultation to final delivery, their attention to detail, service and quality was highly regarded by the Cordlife brand & project team." },
  { name: "Morris Teo", role: "Business Director, HomeRenoGuru", photo: "testimonial_morris-teo.webp", work: "homerenoguru", quote: "We have worked with Ronnie for many years on many projects and he has never let us down. His team is always willing to go the extra mile to ensure our satisfaction, especially our new mobile app, CRM web app and our B2C portal." },
  { name: "Aileen Chow", role: "General Manager, I.Dental", photo: "testimonial_aileen-chow.webp", work: "idental", quote: "From start to finish, SOLD were great to work with. The team fully understood our objectives of the digital campaign (which includes redesign of website, email newsletter and SEM) and what I was trying to achieve in this project." },
  { name: "Shelly Chan", role: "Marketing Manager, Selleys", photo: "testimonial_shelly-chan.webp", work: "selleys-flyer", quote: "Highly recommend Ronnie and SOLD for consistently delivering high quality digital and brand work. Ronnie and his team was responsive, reliable and flexible to meet our needs, especially since our deadlines are often tight and demanding." },
];

export const TEAM = [
  { name: "Ronnie", photo: "team_ronnie_SOLD-Pte-Ltd.webp" },
  { name: "Shiping", photo: "team_shiping_SOLD-Pte-Ltd.webp" },
  { name: "Mochi", photo: "team_mochi_SOLD-Pte-Ltd.webp" },
];

export const CONTACT_STEPS = [
  { n: "01", title: "Quick response", body: "We'll get back to you within 24 hours to schedule an intro call." },
  { n: "02", title: "Discovery call", body: "We'll discuss your project, goals, timeline, and budget in detail." },
  { n: "03", title: "Proposal", body: "Receive a detailed proposal with scope, timeline, and investment." },
];

export const SERVICE_OPTIONS = ["Brand Strategy", "Brand Identity", "Digital Experience", "UI/UX Design", "Creative Direction", "Not Sure"];
export const BUDGET_OPTIONS = ["S$5,000 - S$10,000", "S$10,000 - S$20,000", "S$20,000 - S$50,000", "S$50,000+"];
