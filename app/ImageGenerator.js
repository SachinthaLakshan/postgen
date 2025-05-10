"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
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
      body: JSON.stringify({ prompt: refinedPrompt }),
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || "Failed to generate images");
    }
    const data = await res.json();
    return data.images;
  }

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError("");
    setImages([]);
    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }
    setLoading(true);
    try {
      const refined = await refinePrompt(prompt);
      const imgs = await generateImages(refined);
      setImages(imgs);
    } catch (err) {
      setError(err.message || "Failed to generate images.");
    }
    setLoading(false);
  };

  return (
    <>
      <form className={styles.promptForm} onSubmit={handleGenerate}>
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
        {images.length > 0 && (
          <div className={styles.imageGrid}>
            {images.map((img, i) => (
              <div className={styles.imageCard} key={i}>
                <img src={img} alt="Generated" className={styles.gridImg} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
} 