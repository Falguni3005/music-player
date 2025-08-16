import { usePlayer } from "../context/PlayerContext";
import { useEffect, useState } from "react";

export default function SeekBar() {
  const { time, duration, seek } = usePlayer();
  const [seekValue, setSeekValue] = useState(0);

  useEffect(() => {
    setSeekValue(time);
  }, [time]);

  const handleChange = (e) => {
    const newTime = Number(e.target.value);
    setSeekValue(newTime);
    seek(newTime);
  };

  const progress = duration ? (seekValue / duration) * 100 : 0;

  return (
    <div className="w-full flex items-center gap-3 mt-4">
      {/* <span className="text-xs opacity-70">{formatTime(seekValue)}</span> */}
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={seekValue}
        onChange={handleChange}
        className="flex-1 h-1.5 appearance-none cursor-pointer rounded-lg"
        style={{
          background: `linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
        }}
      />
      {/* <span className="text-xs opacity-70">{formatTime(duration)}</span> */}
    </div>
  );
}

function formatTime(seconds) {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
