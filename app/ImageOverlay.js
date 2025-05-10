'use client'

import { useEffect, useRef } from "react";

export default function ImageOverlay({ imageUrl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageUrl || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = () => {
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
      const overlayHeight = 300; // Reduced height since we have fewer lines
      const overlayTop = canvas.height - overlayHeight - 60; // Extra space for footer
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
      ctx.fillText("CRISPR has been used to", textX, textY);
      textY += 80;

      // Line 2 - Yellow highlight (combined into one line)
      ctx.fillStyle = selectedColors[1];
      ctx.fillText("genetically edited mosquitoes", textX, textY);
      textY += 80;

      // Line 3 - Pink highlight
      ctx.fillStyle = selectedColors[2];
      ctx.fillText("that cannot spread malaria", textX, textY);

      // Footer - Moved outside the box
      ctx.fillStyle = "#dddddd";
      ctx.font = "bold 30px sans-serif";
      ctx.fillText("Strange And Interesting Things", textX, canvas.height - 20);
    };

    image.onerror = () => {
      console.error("Failed to load image");
    };

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imageUrl]);

  return (
    <div className="flex justify-center">
      <canvas 
        ref={canvasRef} 
        width={1024} 
        height={1024} 
        style={{ 
          width: '100%', 
          height: 'auto', 
          maxWidth: '1024px',
          aspectRatio: '1/1'
        }} 
      />
    </div>
  );
}