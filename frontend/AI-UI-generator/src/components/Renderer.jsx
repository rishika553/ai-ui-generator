import {
  About,
  Contact,
  FAQ,
  Features,
  Footer,
  Hero,
  Navbar,
  Pricing,
  Statistics,
  Testimonials,
} from "./LandingSections";
import ThemeProvider from "./ThemeProvider";

export default function Renderer({ website }) {
  if (!website) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center p-12 text-center bg-slate-900/40 rounded-2xl border border-dashed border-slate-800 text-slate-400">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
          ✨
        </div>
        <h3 className="text-lg font-bold text-slate-200 mb-1">Live Landing Page Preview</h3>
        <p className="text-xs max-w-sm text-slate-400">
          Enter a prompt above to generate a complete landing page rendered directly from structured JSON.
        </p>
      </div>
    );
  }

  return (
    <ThemeProvider theme={website.theme}>
      <main className="w-full relative shadow-2xl overflow-hidden transition-all duration-300" id="top">
        <Navbar data={website.navbar} />
        <Hero data={website.hero} />
        <Features data={website.features} />
        {website.statistics && <Statistics data={website.statistics} />}
        {website.about && <About data={website.about} />}
        {website.pricing && <Pricing data={website.pricing} />}
        {website.testimonials && <Testimonials data={website.testimonials} />}
        {website.faq && <FAQ data={website.faq} />}
        {website.contact && <Contact data={website.contact} />}
        <Footer data={website.footer} />
      </main>
    </ThemeProvider>
  );
}
