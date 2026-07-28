import { Monitor } from "lucide-react";
import Renderer from "./Renderer";

export default function Preview({ website }) {
  return (
    <section className="flex-1 flex flex-col min-h-0 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      {/* Top Device Bar */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-semibold text-slate-300">Live Desktop Preview</span>
          {website?.theme && (
            <span className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-slate-800 text-indigo-400 border border-slate-700">
              Theme: {website.theme.name} · {website.theme.font}
            </span>
          )}
        </div>

        {/* Viewport badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-lg text-xs font-semibold text-indigo-300">
          <Monitor className="w-3.5 h-3.5 text-indigo-400" />
          <span>Desktop View</span>
        </div>
      </div>

      {/* Stage Container - Exclusively Desktop 100% Width */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex justify-center items-start bg-slate-950/60 custom-scrollbar">
        <div className="w-full max-w-none transition-all duration-300">
          <Renderer website={website} />
        </div>
      </div>
    </section>
  );
}
