'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
export default function ImageOverlay({ imageUrl, content }) {
  const canvasRef = useRef(null);
  const [isCopying, setIsCopying] = useState(false);

  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!imageUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = () => {
      drawOverlay(canvas, ctx, image, content);
    };

    image.onerror = () => {
      console.error("Failed to load image");
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imageUrl, content]);

  const drawOverlay = (canvas, ctx, image, content) => {
    // Set canvas dimensions
    canvas.width = 1024;
    canvas.height = 1024;

    // Clear canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    ctx.drawImage(image, 0, 0, 1024, 1024);

    // Color options for each line
    const colorOptions = [
      // Line 1 colors (white/light variants)
      ["#ffffff", "#f8f8f8", "#e6f7ff", "#f0fff0", "#fffaf0"],

      // Line 2 colors (yellow variants)
      ["#ffff66", "#ffeb3b", "#ffc107", "#ffd700", "#fff176"],

      // Line 3 colors (pink/magenta variants)
      ["#ff66ff", "#ff00ff", "#e91e63", "#ff4081", "#f06292"]
    ];

    // Randomly select one color from each group
    const selectedColors = colorOptions.map(group =>
      group[Math.floor(Math.random() * group.length)]
    );

    // Create rounded rectangle overlay
    const overlayHeight = 300;
    const overlayTop = canvas.height - overlayHeight - 60;
    const cornerRadius = 32;
    const padding = 40;

    // Draw rounded rectangle
    ctx.beginPath();
    ctx.moveTo(padding, overlayTop + cornerRadius);
    ctx.arcTo(padding, overlayTop, padding + cornerRadius, overlayTop, cornerRadius);
    ctx.lineTo(canvas.width - padding - cornerRadius, overlayTop);
    ctx.arcTo(canvas.width - padding, overlayTop, canvas.width - padding, overlayTop + cornerRadius, cornerRadius);
    ctx.lineTo(canvas.width - padding, overlayTop + overlayHeight - cornerRadius);
    ctx.arcTo(canvas.width - padding, overlayTop + overlayHeight, canvas.width - padding - cornerRadius, overlayTop + overlayHeight, cornerRadius);
    ctx.lineTo(padding + cornerRadius, overlayTop + overlayHeight);
    ctx.arcTo(padding, overlayTop + overlayHeight, padding, overlayTop + overlayHeight - cornerRadius, cornerRadius);
    ctx.closePath();

    // Gradient fill for rounded rectangle
    const gradient = ctx.createLinearGradient(0, overlayTop, 0, overlayTop + overlayHeight);
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.7)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.95)");
    ctx.fillStyle = gradient;
    ctx.fill();

    // Text styles with 60px font
    ctx.textAlign = "center";
    const textX = canvas.width / 2;
    let textY = overlayTop + padding + 50;

    // Line 1
    ctx.font = "bold 60px sans-serif";
    ctx.fillStyle = selectedColors[0];
    ctx.fillText(content.imageTextLineOne, textX, textY);
    textY += 80;

    // Line 2 - Yellow highlight (combined into one line)
    ctx.fillStyle = selectedColors[1];
    ctx.fillText(content.imageTextLineTwo, textX, textY);
    textY += 80;

    // Line 3 - Pink highlight
    ctx.fillStyle = selectedColors[2];
    ctx.fillText(content.imageTextLineThree, textX, textY);

    // Footer - Moved outside the box
    ctx.fillStyle = "#dddddd";
    ctx.font = "bold 30px sans-serif";
    ctx.fillText("Strange And Interesting Things", textX, canvas.height - 20);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;

    setIsDownloading(true);

    try {
      const canvas = canvasRef.current;
      // Create a temporary link
      const link = document.createElement('a');
      link.download = `strange-fact-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = async () => {
    setIsCopying(true);
    try {
      // Combine all text lines into one string
      const textToCopy = content.description;

      await navigator.clipboard.writeText(textToCopy);

      // Optional: Show a temporary success message
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error('Failed to copy text: ', err);
    } finally {
      setIsCopying(false);
    }
  };

  return (
    <div className={styles.canvasContainer}>
      <canvas 
        ref={canvasRef} 
        width={1024} 
        height={1024} 
        className={styles.canvasElement}
      />
      
      {/* Copy Button */}
      <button
        onClick={handleCopyText}
        disabled={isCopying}
        className={styles.copyButton}
        aria-label="Copy text to clipboard"
      >
        {isCopying ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={styles.spinAnimation}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={styles.copyIcon}
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        )}
      </button>
      
      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={styles.downloadButton}
        aria-label="Download image"
      >
        {isDownloading ? (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={styles.spinAnimation}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={styles.downloadIcon}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        )}
      </button>
    </div>
  );
}