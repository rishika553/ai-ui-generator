import { useState } from "react";
import { generateUI } from "../services/api";
import "./Generator.css";

export default function Generator() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return alert("Please enter a prompt");

    setLoading(true);
    try {
      const data = await generateUI(prompt);
      setResult(data);
    } catch (error) {
      alert("Backend not running!");
    }
    setLoading(false);
  };

 return (
  <div className="page">
    <div className="card">
      <h1 className="title">✨ AI UI Generator</h1>
      <p className="subtitle">
        Describe your UI and generate production-ready React components.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Create a dashboard with sidebar and cards..."
        className="textarea"
      />

      <button className="generate-btn" onClick={handleGenerate}>
        {loading ? "Generating..." : "Generate UI"}
      </button>
    </div>
  </div>
);}