import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  MessageSquare,
  History,
  Info,
  Wand2,
  RotateCcw,
  AlertCircle,
  Code2,
  Palette,
  ShieldCheck,
  Search,
} from "lucide-react";
import Preview from "../components/Preview";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { editUI, generateUI, restoreVersion } from "../services/api";

const EXAMPLE_PROMPTS = [
  "AI CRM",
  "Coffee Shop",
  "Travel Agency",
  "Portfolio",
  "Fitness Website",
  "Fintech Startup",
  "Restaurant",
  "SaaS Product",
  "Healthcare Landing Page",
];

const QUICK_EDITS = [
  "Make it dark.",
  "Change hero title to Next-Gen AI Workflow Platform.",
  "Add pricing.",
  "Remove FAQ.",
  "Use rounded buttons.",
  "Use blue colours.",
  "Make it more premium.",
];

export default function Generator() {
  const [prompt, setPrompt] = useState("Create a modern landing page for an AI SaaS startup.");
  const [chatMessage, setChatMessage] = useState("");
  const [website, setWebsite] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [history, setHistory] = useState([]);
  const [previewMode, setPreviewMode] = useState("desktop");
  const [activeTab, setActiveTab] = useState("chat");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");

  const handleResponse = (data) => {
    setWebsite(data.website);
    setExplanation(data.explanation);
    setHistory(data.history || []);
    if (data.usedFallback) {
      setWarning(
        "Notice: The raw response triggered fallback safety rules. Replaced with validated landing page layout."
      );
    } else {
      setWarning("");
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt before generating.");
      return;
    }

    setLoading(true);
    setError("");
    setWarning("");
    try {
      const res = await generateUI(prompt);
      handleResponse(res);
    } catch (err) {
      setError(err.message || "Failed to generate website.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (messageToEdit) => {
    const text = messageToEdit || chatMessage;
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setWarning("");
    try {
      const res = await editUI(text, website);
      handleResponse(res);
      setChatMessage("");
    } catch (err) {
      setError(err.message || "Failed to edit website.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (versionId) => {
    setLoading(true);
    setError("");
    setWarning("");
    try {
      const res = await restoreVersion(versionId);
      handleResponse(res);
    } catch (err) {
      setError(err.message || "Failed to restore version.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Header Navbar */}
      <header className="bg-slate-900/90 border-b border-slate-800 px-6 py-4 sticky top-0 z-30 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              AI Landing Page Generator
            </h1>
          </div>
        </div>

        {website && (
          <div className="hidden md:flex items-center gap-3 text-xs">
            <span className="text-slate-400">Active Theme:</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 font-semibold text-slate-200 border border-slate-700 capitalize">
              {website.theme.name}
            </span>
            <span className="text-slate-400">Industry:</span>
            <span className="px-3 py-1 rounded-full bg-slate-800 font-semibold text-indigo-400 border border-slate-700">
              {website.industry}
            </span>
          </div>
        )}
      </header>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-[1700px] w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Control Panel */}
        <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
          {/* Main Prompt Input Box */}
          <div className="space-y-3">
            <label htmlFor="prompt-input" className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Natural Language Prompt</span>
              <span className="text-[11px] text-slate-500 font-normal">JSON Target</span>
            </label>

            <textarea
              id="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              placeholder="e.g. Create a modern landing page for an AI SaaS startup."
              className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner resize-none"
            />

            {/* Example Prompt Chips */}
            <div>
              <span className="block text-[11px] font-semibold text-slate-400 mb-2">Example Templates:</span>
              <div className="flex flex-wrap gap-1.5">
                {EXAMPLE_PROMPTS.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setPrompt(`Create a landing page for a ${ex}.`)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 hover:text-indigo-300 text-slate-300 border border-slate-700/60 transition-colors"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Action Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Wand2 className="w-4 h-4" />
              <span>{loading ? "Processing Pipeline..." : "Generate Landing Page"}</span>
            </button>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {warning && (
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p>{warning}</p>
            </div>
          )}

          {/* Tabbed Workspace Section */}
          <div className="border-t border-slate-800 pt-5 space-y-4">
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab("chat")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "chat"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>AI Chat</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("history")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "history"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>History ({history.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("explanation")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "explanation"
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Info className="w-3.5 h-3.5" />
                <span>Explanation</span>
              </button>
            </div>

            {/* TAB CONTENT: AI CHAT EDITING */}
            {activeTab === "chat" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Follow-Up Prompt Editing
                  </label>
                  <textarea
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    rows={2}
                    placeholder="e.g. Make it dark. Add pricing. Use blue colours..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleEdit()}
                    disabled={loading || !website}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-colors disabled:opacity-40"
                  >
                    Apply AI Edit
                  </button>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-slate-400 mb-2">Quick Commands:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_EDITS.map((cmd) => (
                      <button
                        key={cmd}
                        type="button"
                        onClick={() => handleEdit(cmd)}
                        disabled={loading || !website}
                        className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-800/60 hover:bg-indigo-600/30 text-indigo-300 border border-slate-700/60 transition-colors disabled:opacity-40"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: VERSION HISTORY */}
            {activeTab === "history" && (
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {history.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-6">No previous versions saved yet.</p>
                ) : (
                  history.map((ver) => (
                    <div
                      key={ver.versionId}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 font-bold text-slate-200">
                          <span>Version #{ver.versionId}</span>
                          <span className="px-2 py-0.5 text-[10px] rounded bg-indigo-500/10 text-indigo-400 capitalize">
                            {ver.theme}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {ver.title || ver.prompt}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRestore(ver.versionId)}
                        disabled={loading}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white font-semibold text-[11px] flex items-center gap-1.5 transition-colors shrink-0"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Restore</span>
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB CONTENT: AI EXPLANATION */}
            {activeTab === "explanation" && (
              <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1 custom-scrollbar">
                {!explanation ? (
                  <p className="text-xs text-slate-500 text-center py-6">
                    Generate a page to view design, color, accessibility, and SEO explanations.
                  </p>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Layout Decision</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{explanation.layout}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="font-bold text-indigo-400 flex items-center gap-1.5">
                        <Palette className="w-3.5 h-3.5" />
                        <span>Color & Typography Selection</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{explanation.colors}</p>
                      <p className="text-slate-300 leading-relaxed text-[11px] pt-1">{explanation.typography}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Accessibility Considerations</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{explanation.accessibility}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <div className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5" />
                        <span>SEO Optimization</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px]">{explanation.seo}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Right Preview Column */}
        <section className="lg:col-span-7 xl:col-span-8 relative min-h-[750px] flex flex-col">
          {loading && <LoadingSkeleton />}
          <Preview website={website} />
        </section>
      </main>
    </div>
  );
}
