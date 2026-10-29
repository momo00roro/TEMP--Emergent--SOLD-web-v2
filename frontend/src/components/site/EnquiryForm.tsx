import { FormEvent, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { BUDGET_OPTIONS, SERVICE_OPTIONS } from "../../lib/content";
import { EASE } from "../../lib/motion";

const API = process.env.REACT_APP_BACKEND_URL;
type Fields = { name: string; email: string; company: string; service: string; budget: string; message: string; website: string };
const EMPTY: Fields = { name: "", email: "", company: "", service: "", budget: "", message: "", website: "" };

const validate = (f: Fields) => {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Please enter a valid email.";
  if (!f.service) e.service = "Pick the closest service.";
  if (!f.budget) e.budget = "Pick a budget range.";
  if (f.message.trim().length < 10) e.message = "A few more words about the project, please.";
  return e;
};

const Field = ({ label, error, children, id }: { label: string; error?: string; children: React.ReactNode; id: string }) => (
  <label className="field" htmlFor={id}>
    <span className="field-label">{label}</span>
    {children}
    {error && <span className="field-error" data-testid={`${id}-error`}>{error}</span>}
  </label>
);

export const EnquiryForm = ({ id = "enquiry" }: { id?: string }) => {
  const { pathname } = useLocation();
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [serverMsg, setServerMsg] = useState("");
  const startedAt = useRef(Date.now());
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    if (!API) {
      setState("error");
      setServerMsg(`Our form is offline right now. Please email hello@sold.com.sg.`);
      return;
    }
    setState("sending");
    try {
      const res = await fetch(`${API}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, page: pathname, elapsed_ms: Date.now() - startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(typeof data?.detail === "string" ? data.detail : "Something went wrong. Please try again.");
      setState("done");
    } catch (err) {
      setState("error");
      setServerMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="form-card" data-testid={`${id}-form-card`}>
      <AnimatePresence initial={false} mode="wait">
        {state === "done" ? (
          <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="flex min-h-[420px] flex-col justify-center" data-testid={`${id}-success`}>
            <span className="mb-8 flex h-14 w-14 items-center justify-center bg-[#2D6BFF] text-white"><Check size={26} /></span>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[#2D6BFF]">ENQUIRY RECEIVED</p>
            <h3 className="mt-3 text-3xl font-light tracking-tight text-[#0B1220] md:text-4xl">Thank you, {f.name.split(" ")[0]}.</h3>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#3B4658]">We'll get back to you within 24 hours to schedule an intro call. A copy of your brief is already with our team.</p>
            <button type="button" className="link-u mt-8 self-start font-mono text-xs tracking-widest text-[#0B1220]" onClick={() => { setF(EMPTY); setState("idle"); startedAt.current = Date.now(); }} data-testid={`${id}-send-another`}>SEND ANOTHER ENQUIRY</button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate className="grid gap-5 md:grid-cols-2" initial={{ opacity: 1 }} exit={{ opacity: 0 }} data-testid={`${id}-form`}>
            <Field label="Your name *" error={errors.name} id={`${id}-name`}>
              <input id={`${id}-name`} value={f.name} onChange={set("name")} autoComplete="name" className="input" data-testid={`${id}-name-input`} />
            </Field>
            <Field label="Email address *" error={errors.email} id={`${id}-email`}>
              <input id={`${id}-email`} type="email" value={f.email} onChange={set("email")} autoComplete="email" className="input" data-testid={`${id}-email-input`} />
            </Field>
            <Field label="Company" id={`${id}-company`}>
              <input id={`${id}-company`} value={f.company} onChange={set("company")} autoComplete="organization" className="input" data-testid={`${id}-company-input`} />
            </Field>
            <Field label="Service interested in *" error={errors.service} id={`${id}-service`}>
              <select id={`${id}-service`} value={f.service} onChange={set("service")} className="input" data-testid={`${id}-service-select`}>
                <option value="">Select a service…</option>
                {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Project budget *" error={errors.budget} id={`${id}-budget`}>
                <div className="mt-1 grid grid-cols-2 gap-2 md:grid-cols-4" role="radiogroup">
                  {BUDGET_OPTIONS.map((b, i) => (
                    <button type="button" key={b} role="radio" aria-checked={f.budget === b} onClick={() => setF((p) => ({ ...p, budget: b }))} className={`budget ${f.budget === b ? "is-on" : ""}`} data-testid={`${id}-budget-${i}`}>
                      {b.replace(" - ", " – ")}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Tell us about your project *" error={errors.message} id={`${id}-message`}>
                <textarea id={`${id}-message`} rows={4} value={f.message} onChange={set("message")} className="input resize-none" placeholder="What are you building, and where do research, consistency or delivery feel difficult?" data-testid={`${id}-message-input`} />
              </Field>
            </div>
            <input type="text" tabIndex={-1} autoComplete="off" value={f.website} onChange={set("website")} className="hp" aria-hidden="true" name="website" />
            <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs leading-relaxed text-[#5A6578]">We reply within 24 hours. No newsletters, ever.</p>
              <button type="submit" disabled={state === "sending"} className="btn btn-primary btn-lg justify-center" data-testid={`${id}-submit`}>
                {state === "sending" ? <Loader2 className="animate-spin" size={18} /> : <span>Send enquiry</span>}
                {state !== "sending" && <ArrowRight className="btn-arrow" size={16} />}
              </button>
            </div>
            {state === "error" && <p className="text-sm text-[#C0262D] md:col-span-2" data-testid={`${id}-error`}>{serverMsg}</p>}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
