"use client";
import { useState } from "react";
import styles from "./page.module.css";
import ImageOverlay from "./ImageOverlay";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [factCount, setFactCount] = useState(5);
  const [pageName, setPageName] = useState("Strange And Interesting Things");
  const [facts, setFacts] = useState(
    {
    "content": [],
    "images": []
}
);
  const [error, setError] = useState("");

  // Optional: Refine prompt
  async function refinePrompt(userPrompt) {
    return `${userPrompt}`;
  }

  // Call your OpenAI image generation API
  async function generateImages(refinedPrompt) {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: refinedPrompt, numberOfFacts: factCount }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to generate images");
    }
    const data = await res.json();
    return data;
  }

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }
    setLoading(true);
    try {
      const refined = await refinePrompt(prompt);
      const data = await generateImages(refined);
      setFacts(data);
      // setImages(imgs);
    } catch (err) {
      setError(err.message || "Failed to generate images.");
    }
    setLoading(false);
  };

  return (
    <>
      <form className={styles.promptForm} onSubmit={handleGenerate}>
        <div className={styles.inputGroup}>
          <label htmlFor="factCount" className={styles.label}>
            Number of Facts:
          </label>
          <input
            id="factCount"
            type="number"
            min="1"
            value={factCount}
            onChange={(e) => setFactCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
            className={styles.numberInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="pagename" className={styles.label}>
            Page Name:
          </label>
          <input
            id="pagename"
            type="text"
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            className={styles.numberInput}
          />
        </div>
        <textarea
          className={styles.textarea}
          placeholder="Describe what you want to see..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          disabled={loading}
        />
        <button className={styles.generateBtn} type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Images"}
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
      <section className={styles.gridSection}>
        {facts.images.length > 0 && (
          <div className={styles.imageGrid}>
            {facts.images.map((img, i) => (
              <div className={styles.imageCard} key={i}>
                {/* <img src={img} alt="Generated" className={styles.gridImg} /> */}
                <ImageOverlay content={facts.content[i]} imageUrl={img} pageName={pageName} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
} 