import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

export function useGradient(imageUrl, fallback = "#000") {
  const [bg, setBg] = useState(`linear-gradient(120deg, ${fallback}, black)`);
  const [colorLoading, setColorLoading] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;

    setColorLoading(true);
    const fac = new FastAverageColor();
    const img = new Image();
    img.src = imageUrl;

    img.onload = async () => {
      try {
        const color = await fac.getColorAsync(imageUrl);
        const rgb = color.rgb;
        setBg(`linear-gradient(120deg, ${rgb}, black)`);
      } catch {
        setBg(`linear-gradient(120deg, ${fallback}, black)`);
      } finally {
        setColorLoading(false);
      }
    };

    img.onerror = () => {
      setBg(`linear-gradient(120deg, ${fallback}, black)`);
      setColorLoading(false);
    };
  }, [imageUrl, fallback]);

  return { bg, colorLoading };
}
