"use client";
import { useState } from "react";
import styles from "./page.module.css";
import ImageOverlay from "./ImageOverlay";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-JMgvlxWVxB96dV86sM1YCnpO.png?st=2025-05-10T17%3A04%3A30Z&se=2025-05-10T19%3A04%3A30Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T00%3A51%3A52Z&ske=2025-05-11T00%3A51%3A52Z&sks=b&skv=2024-08-04&sig=iQEyPD0ThJIaC5eMLNoiMSyPfY0KgkwmVzlxkOozpVo%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-3Zo0VClqE8DR4jeZxV91D6Cy.png?st=2025-05-10T17%3A04%3A29Z&se=2025-05-10T19%3A04%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T02%3A32%3A27Z&ske=2025-05-11T02%3A32%3A27Z&sks=b&skv=2024-08-04&sig=QLnSzc%2Br%2Bn14TPj2HGB3RmF9HHJ7N%2BQW3d0xXjO/r0o%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-xC0i1NLNJ07RKFO0Kw8Sp2gs.png?st=2025-05-10T17%3A04%3A27Z&se=2025-05-10T19%3A04%3A27Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T00%3A12%3A53Z&ske=2025-05-11T00%3A12%3A53Z&sks=b&skv=2024-08-04&sig=DBPiz0vWC0nzYcOEc0V7/GlUir%2Bs%2B8nbaSW3THspoYU%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-0wipBNH2TTCz4Y99j0mZNEpI.png?st=2025-05-10T17%3A04%3A28Z&se=2025-05-10T19%3A04%3A28Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T02%3A29%3A41Z&ske=2025-05-11T02%3A29%3A41Z&sks=b&skv=2024-08-04&sig=z%2B12FyhR4zOm99yu%2BL28ip4ZPY1osiFerCf1TG/2kDI%3D",
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-CA7gmYcnejihI6yg5wJpzOXW.png?st=2025-05-10T17%3A04%3A27Z&se=2025-05-10T19%3A04%3A27Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T10%3A17%3A04Z&ske=2025-05-11T10%3A17%3A04Z&sks=b&skv=2024-08-04&sig=daDKZK3HWnaSEJeqpMCZAFP7SzCRPV682Pcyucbz0lQ%3D"
]);
const [facts, setFacts] = useState({
  "content": [
      {
          "fact": "The Planetary Nebula NGC 7293, also known as the Helix Nebula, resembles a giant human eye in space.",
          "description": "",
          "imageTextLineOne": "",
          "imageTextLineTwo": "",
          "imageTextLineThree": ""
      },
      {
          "fact": "Australia eerily lost its Prime Minister Harold Holt in 1967 while he was swimming in the ocean.",
          "description": "",
          "imageTextLineOne": "",
          "imageTextLineTwo": "",
          "imageTextLineThree": ""
      },
      {
          "fact": "Wombat poop is cube-shaped.",
          "description": "",
          "imageTextLineOne": "",
          "imageTextLineTwo": "",
          "imageTextLineThree": ""
      },
      {
          "fact": "Octopuses have three hearts.",
          "description": "",
          "imageTextLineOne": "",
          "imageTextLineTwo": "",
          "imageTextLineThree": ""
      },
      {
          "fact": "Banana plants are not trees, but giant herbs.",
          "description": "",
          "imageTextLineOne": "",
          "imageTextLineTwo": "",
          "imageTextLineThree": ""
      }
  ],
  "images": [
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-JMgvlxWVxB96dV86sM1YCnpO.png?st=2025-05-10T17%3A04%3A30Z&se=2025-05-10T19%3A04%3A30Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T00%3A51%3A52Z&ske=2025-05-11T00%3A51%3A52Z&sks=b&skv=2024-08-04&sig=iQEyPD0ThJIaC5eMLNoiMSyPfY0KgkwmVzlxkOozpVo%3D",
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-3Zo0VClqE8DR4jeZxV91D6Cy.png?st=2025-05-10T17%3A04%3A29Z&se=2025-05-10T19%3A04%3A29Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T02%3A32%3A27Z&ske=2025-05-11T02%3A32%3A27Z&sks=b&skv=2024-08-04&sig=QLnSzc%2Br%2Bn14TPj2HGB3RmF9HHJ7N%2BQW3d0xXjO/r0o%3D",
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-xC0i1NLNJ07RKFO0Kw8Sp2gs.png?st=2025-05-10T17%3A04%3A27Z&se=2025-05-10T19%3A04%3A27Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T00%3A12%3A53Z&ske=2025-05-11T00%3A12%3A53Z&sks=b&skv=2024-08-04&sig=DBPiz0vWC0nzYcOEc0V7/GlUir%2Bs%2B8nbaSW3THspoYU%3D",
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-0wipBNH2TTCz4Y99j0mZNEpI.png?st=2025-05-10T17%3A04%3A28Z&se=2025-05-10T19%3A04%3A28Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T02%3A29%3A41Z&ske=2025-05-11T02%3A29%3A41Z&sks=b&skv=2024-08-04&sig=z%2B12FyhR4zOm99yu%2BL28ip4ZPY1osiFerCf1TG/2kDI%3D",
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-mvx1qYnaTSztCfhVmnkXv3YR/user-g2igPOfB9yImADoICNpszyba/img-CA7gmYcnejihI6yg5wJpzOXW.png?st=2025-05-10T17%3A04%3A27Z&se=2025-05-10T19%3A04%3A27Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-10T10%3A17%3A04Z&ske=2025-05-11T10%3A17%3A04Z&sks=b&skv=2024-08-04&sig=daDKZK3HWnaSEJeqpMCZAFP7SzCRPV682Pcyucbz0lQ%3D"
  ]
});
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
      body: JSON.stringify({ prompt: refinedPrompt, numberOfFacts: 5 }),
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
                {/* <img src={img} alt="Generated" className={styles.gridImg} /> */}
                <ImageOverlay imageUrl={img} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
} 