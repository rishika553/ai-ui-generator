import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 z-50 backdrop-blur-md bg-slate-950/80 flex flex-col items-center justify-center p-6 text-slate-100">
      <div className="w-full max-w-md space-y-6 text-center">
        {/* Animated loader badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold animate-pulse">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
          <span>AI Pipeline Active · Converting Prompt to Structured JSON...</span>
        </div>

        {/* Progress bar animation */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ width: "5%" }}
            animate={{ width: "95%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          />
        </div>

        {/* Shimmering Skeleton Mockup */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-2xl text-left">
          <div className="flex items-center justify-between">
            <div className="h-5 w-28 bg-slate-800 rounded-md animate-pulse" />
            <div className="flex gap-2">
              <div className="h-4 w-12 bg-slate-800 rounded animate-pulse" />
              <div className="h-4 w-12 bg-slate-800 rounded animate-pulse" />
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <div className="h-8 w-3/4 bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-4 w-5/6 bg-slate-800/60 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-slate-800/60 rounded animate-pulse" />
          </div>

          <div className="flex gap-3 pt-2">
            <div className="h-10 w-28 bg-indigo-600/40 rounded-xl animate-pulse" />
            <div className="h-10 w-24 bg-slate-800 rounded-xl animate-pulse" />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-800/80">
            <div className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />
            <div className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />
            <div className="h-20 bg-slate-800/50 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
