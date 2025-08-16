import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color"; // ✅

export function useGradient(imageUrl, fallback = "#000") {
  const [bg, setBg] = useState(`linear-gradient(120deg, ${fallback}, black)`);

  useEffect(() => {
    if (!imageUrl) return;
    const fac = new FastAverageColor();
    fac.getColorAsync(imageUrl).then(color => {
      const rgb = color.rgb;
      setBg(`linear-gradient(120deg, ${rgb}, black)`);
    }).catch(() => {
      setBg(`linear-gradient(120deg, ${fallback}, black)`);
    });
  }, [imageUrl, fallback]);

  return bg;
}
