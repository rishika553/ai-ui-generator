import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  Layout,
  Shield,
  Cpu,
  Check,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Star,
  Mail,
  Phone,
  HelpCircle,
  Award,
  TrendingUp,
  Layers,
  Globe,
} from "lucide-react";

// Icon mapping helper
const iconMap = {
  zap: Zap,
  layout: Layout,
  shield: Shield,
  cpu: Cpu,
  sparkles: Sparkles,
  award: Award,
  trending: TrendingUp,
  layers: Layers,
  globe: Globe,
};

const SectionIcon = ({ name }) => {
  const IconComponent = iconMap[name?.toLowerCase()] || Sparkles;
  return <IconComponent className="w-6 h-6 text-[var(--site-primary)]" />;
};

const handleSmoothScroll = (e, sectionId) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

export function Navbar({ data }) {
  if (!data) return null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-40 px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 shadow-sm"
      style={{ backgroundColor: "var(--site-surface)" }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight" style={{ color: "var(--site-text)" }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm" style={{ backgroundColor: "var(--site-primary)" }}>
            <Sparkles className="w-5 h-5" />
          </div>
          <span>{data.brand}</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold" style={{ color: "var(--site-muted)" }}>
          {data.links?.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={(e) => handleSmoothScroll(e, link.toLowerCase())}
              className="hover:text-[var(--site-primary)] transition-colors duration-150"
            >
              {link}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleSmoothScroll(e, "contact")}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-white shadow-md hover:opacity-90 transition-all duration-150"
          style={{
            backgroundColor: "var(--site-primary)",
            borderRadius: "var(--site-radius)",
          }}
        >
          {data.cta || "Get Started"}
        </a>
      </div>
    </motion.header>
  );
}

export function Hero({ data }) {
  if (!data) return null;

  return (
    <section className="px-6 py-20 md:py-28 overflow-hidden relative" style={{ backgroundColor: "var(--site-background)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col items-start space-y-6"
        >
          {data.eyebrow && (
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold rounded-full border shadow-sm"
              style={{
                backgroundColor: "var(--site-surface)",
                borderColor: "rgba(0,0,0,0.12)",
                color: "var(--site-accent)",
              }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--site-accent)" }} />
              <span>{data.eyebrow}</span>
            </motion.div>
          )}

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]"
            style={{ color: "var(--site-text)" }}
          >
            {data.title}
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl max-w-2xl leading-relaxed"
            style={{ color: "var(--site-muted)" }}
          >
            {data.subtitle}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-2">
            {data.primaryCta && (
              <a
                href="#pricing"
                onClick={(e) => handleSmoothScroll(e, "pricing")}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                style={{
                  backgroundColor: "var(--site-primary)",
                  borderRadius: "var(--site-radius)",
                }}
              >
                <span>{data.primaryCta}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            )}

            {data.secondaryCta && (
              <a
                href="#features"
                onClick={(e) => handleSmoothScroll(e, "features")}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-base font-bold border-2 transition-all duration-200 shadow-sm"
                style={{
                  backgroundColor: "var(--site-surface)",
                  color: "var(--site-text)",
                  borderColor: "var(--site-text)",
                  borderRadius: "var(--site-radius)",
                }}
              >
                <span>{data.secondaryCta}</span>
              </a>
            )}
          </motion.div>
        </motion.div>

        {data.visual && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div
              className="p-8 shadow-xl border-2 border-slate-900/10 relative overflow-hidden"
              style={{
                backgroundColor: "var(--site-surface)",
                borderRadius: "calc(var(--site-radius) * 1.25)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs uppercase tracking-wider font-extrabold" style={{ color: "var(--site-muted)" }}>
                  {data.visual.headline}
                </span>
                <span className="w-3 h-3 rounded-full animate-ping" style={{ backgroundColor: "var(--site-accent)" }} />
              </div>

              <div className="text-5xl font-black mb-2 tracking-tight" style={{ color: "var(--site-primary)" }}>
                {data.visual.metric}
              </div>

              <p className="text-sm font-semibold" style={{ color: "var(--site-muted)" }}>
                {data.visual.caption}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-200 flex items-center justify-between text-xs font-bold" style={{ color: "var(--site-text)" }}>
                <span>Verified Metric</span>
                <span className="px-2.5 py-1 rounded-full text-white text-[11px] font-extrabold" style={{ backgroundColor: "var(--site-accent)" }}>
                  Live System
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export function Features({ data }) {
  if (!data || !data.length) return null;

  return (
    <section className="px-6 py-20 relative" id="features" style={{ backgroundColor: "var(--site-surface)" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-white inline-block shadow-sm" style={{ backgroundColor: "var(--site-accent)" }}>
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--site-text)" }}>
            Everything you need for rapid conversion & launch.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {data.map((feature, idx) => (
            <motion.div
              key={feature.title || idx}
              variants={fadeInUp}
              whileHover={{ y: -6 }}
              className="p-6 border-2 border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              style={{
                backgroundColor: "var(--site-background)",
                borderRadius: "var(--site-radius)",
              }}
            >
              <div>
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-slate-200"
                  style={{ backgroundColor: "var(--site-surface)" }}
                >
                  <SectionIcon name={feature.icon} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--site-text)" }}>
                  {feature.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--site-muted)" }}>
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function Statistics({ data }) {
  if (!data || !data.length) return null;

  return (
    <section className="px-6 py-14 border-y border-slate-200" style={{ backgroundColor: "var(--site-secondary)", color: "#ffffff" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {data.map((stat, idx) => (
          <motion.div
            key={stat.label || idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="space-y-1"
          >
            <div className="text-3xl md:text-4xl font-black tracking-tight text-white">
              {stat.value}
            </div>
            <div className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-300">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function About({ data }) {
  if (!data) return null;

  return (
    <section className="px-6 py-20" id="about" style={{ backgroundColor: "var(--site-background)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: "var(--site-primary)" }}>
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--site-text)" }}>
            {data.title}
          </h2>
          <p className="text-base md:text-lg font-medium leading-relaxed" style={{ color: "var(--site-muted)" }}>
            {data.body}
          </p>

          {data.points && (
            <ul className="space-y-3 pt-2">
              {data.points.map((point) => (
                <li key={point} className="flex items-center gap-3 font-semibold text-sm" style={{ color: "var(--site-text)" }}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0" style={{ backgroundColor: "var(--site-primary)" }}>
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="lg:col-span-6">
          <div
            className="p-8 border-2 border-slate-200 shadow-xl relative overflow-hidden"
            style={{
              backgroundColor: "var(--site-surface)",
              borderRadius: "calc(var(--site-radius) * 1.2)",
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full font-black text-white flex items-center justify-center shadow-md" style={{ backgroundColor: "var(--site-accent)" }}>
                  AI
                </div>
                <div>
                  <h4 className="font-bold text-sm" style={{ color: "var(--site-text)" }}>High-Converting Visual Architecture</h4>
                  <p className="text-xs font-semibold" style={{ color: "var(--site-muted)" }}>Built with White, Blue, Black & Orange</p>
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--site-muted)" }}>
                Our backend planner and generator construct clean JSON schemas, pairing rich brand contrast with intuitive reading layouts across desktop and mobile.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Pricing({ data }) {
  if (!data || !data.length) return null;

  return (
    <section className="px-6 py-20" id="pricing" style={{ backgroundColor: "var(--site-surface)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest px-3 py-1 rounded-full text-white inline-block shadow-sm" style={{ backgroundColor: "var(--site-primary)" }}>
            Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--site-text)" }}>
            Transparent plans tailored to your growth.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((plan, idx) => (
            <motion.div
              key={plan.name || idx}
              whileHover={{ y: -8 }}
              className={`p-8 border-2 shadow-xl flex flex-col justify-between relative transition-all duration-300 ${
                plan.highlight ? "border-[var(--site-accent)] ring-4 ring-[var(--site-accent)]/20" : "border-slate-200"
              }`}
              style={{
                backgroundColor: "var(--site-background)",
                borderRadius: "calc(var(--site-radius) * 1.2)",
              }}
            >
              {plan.highlight && (
                <div
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-black text-white rounded-full uppercase tracking-wider shadow-md"
                  style={{ backgroundColor: "var(--site-accent)" }}
                >
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-extrabold mb-2" style={{ color: "var(--site-text)" }}>
                  {plan.name}
                </h3>
                <p className="text-xs font-semibold mb-6" style={{ color: "var(--site-muted)" }}>
                  {plan.description}
                </p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black tracking-tight" style={{ color: "var(--site-text)" }}>
                    {plan.price}
                  </span>
                  <span className="text-sm font-bold" style={{ color: "var(--site-muted)" }}>
                    {plan.period || "/month"}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features?.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 text-xs font-bold" style={{ color: "var(--site-text)" }}>
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="w-full py-3.5 px-4 text-center font-bold text-sm shadow-md hover:opacity-95 transition-all duration-150 text-white"
                style={{
                  backgroundColor: plan.highlight ? "var(--site-accent)" : "var(--site-primary)",
                  borderRadius: "var(--site-radius)",
                }}
              >
                Choose Plan
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials({ data }) {
  if (!data || !data.length) return null;

  return (
    <section className="px-6 py-20" id="testimonials" style={{ backgroundColor: "var(--site-background)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: "var(--site-primary)" }}>
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--site-text)" }}>
            Loved by founders, designers, and growth leads.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <motion.div
              key={item.name || idx}
              whileHover={{ y: -4 }}
              className="p-6 border-2 border-slate-200 shadow-md flex flex-col justify-between space-y-6"
              style={{
                backgroundColor: "var(--site-surface)",
                borderRadius: "var(--site-radius)",
              }}
            >
              <div className="flex gap-1 text-orange-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500" />
                ))}
              </div>

              <p className="text-sm font-medium italic leading-relaxed" style={{ color: "var(--site-text)" }}>
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                {item.avatar ? (
                  <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full object-cover shadow-sm" />
                ) : (
                  <div className="w-10 h-10 rounded-full font-bold text-white flex items-center justify-center shadow-sm" style={{ backgroundColor: "var(--site-primary)" }}>
                    {item.name ? item.name[0] : "U"}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-xs" style={{ color: "var(--site-text)" }}>{item.name}</h4>
                  <p className="text-[11px] font-semibold" style={{ color: "var(--site-muted)" }}>{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ({ data }) {
  if (!data || !data.length) return null;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="px-6 py-20" id="faq" style={{ backgroundColor: "var(--site-surface)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 space-y-4">
          <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: "var(--site-primary)" }}>
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--site-text)" }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {data.map((item, idx) => (
            <div
              key={item.question || idx}
              className="border-2 border-slate-200/80 shadow-sm overflow-hidden"
              style={{
                backgroundColor: "var(--site-background)",
                borderRadius: "var(--site-radius)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-sm md:text-base focus:outline-none"
                style={{ color: "var(--site-text)" }}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 shrink-0 ${
                    openIndex === idx ? "rotate-180 text-[var(--site-accent)]" : "text-[var(--site-muted)]"
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-5 text-xs md:text-sm font-medium leading-relaxed border-t border-slate-200 pt-3"
                    style={{ color: "var(--site-muted)" }}
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact({ data }) {
  if (!data) return null;

  return (
    <section className="px-6 py-20" id="contact" style={{ backgroundColor: "var(--site-background)" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-6 space-y-6">
          <span className="text-xs uppercase font-extrabold tracking-widest" style={{ color: "var(--site-primary)" }}>
            Contact Us
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: "var(--site-text)" }}>
            {data.title}
          </h2>
          <p className="text-base font-medium leading-relaxed" style={{ color: "var(--site-muted)" }}>
            {data.body}
          </p>

          <div className="space-y-3 pt-2 text-sm font-bold" style={{ color: "var(--site-text)" }}>
            {data.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--site-primary)]" />
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--site-primary)]" />
                <span>{data.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-6">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="p-8 border-2 border-slate-200 shadow-xl space-y-4"
            style={{
              backgroundColor: "var(--site-surface)",
              borderRadius: "calc(var(--site-radius) * 1.2)",
            }}
          >
            <div>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: "var(--site-text)" }}>
                Full Name
              </label>
              <input
                type="text"
                placeholder="Alex Morgan"
                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-[var(--site-primary)] text-sm font-medium"
                style={{ backgroundColor: "var(--site-background)", color: "var(--site-text)" }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: "var(--site-text)" }}>
                Email Address
              </label>
              <input
                type="email"
                placeholder="alex@company.com"
                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-[var(--site-primary)] text-sm font-medium"
                style={{ backgroundColor: "var(--site-background)", color: "var(--site-text)" }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase mb-1" style={{ color: "var(--site-text)" }}>
                Message
              </label>
              <textarea
                rows={3}
                placeholder="Tell us about your project requirements..."
                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 focus:outline-none focus:border-[var(--site-primary)] text-sm font-medium"
                style={{ backgroundColor: "var(--site-background)", color: "var(--site-text)" }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-bold text-sm text-white shadow-md hover:opacity-95 transition-opacity"
              style={{
                backgroundColor: "var(--site-primary)",
                borderRadius: "var(--site-radius)",
              }}
            >
              {data.cta || "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function Footer({ data }) {
  if (!data) return null;

  return (
    <footer className="px-6 py-12 border-t-2 border-slate-200 text-xs font-semibold" style={{ backgroundColor: "var(--site-secondary)", color: "#ffffff" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-bold text-base text-white">
          <Sparkles className="w-4 h-4 text-orange-400" />
          <span>{data.brand}</span>
        </div>

        <div className="flex flex-wrap gap-6 text-slate-300">
          {data.links?.map((link) => (
            <a
              key={link}
              href="#top"
              onClick={(e) => handleSmoothScroll(e, "top")}
              className="hover:text-white transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        <span className="text-slate-400">{data.copyright}</span>
      </div>
    </footer>
  );
}
