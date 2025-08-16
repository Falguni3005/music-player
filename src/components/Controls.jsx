import { usePlayer } from "../context/PlayerContext";
import { Play, Pause, SkipBack, SkipForward, FastForward } from "lucide-react";

export default function Controls() {
    const { isPlaying, play, pause, next, prev, volume, setVolume } = usePlayer();
  return (
    <div className="flex items-center justify-between mt-4 w-full">
        <button  className="text-white-400 flex items-center justify-center transition-colors rounded-full h-11 w-11 bg-white/10">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
            </svg>
        </button>

        <div className="flex items-center gap-6">

            <button onClick={prev} className="hover:scale-110 transition">
                <FastForward
                    size={22}
                    className="-scale-x-100 text-gray-400 hover:text-white transition-colors"
                    fill="currentColor"
                />
            </button>

  
            {isPlaying ? (
            <button
                onClick={pause}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
            >
                <Pause size={22} className="fill-current" />
            </button>
            ) : (
            <button
                onClick={play}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-black hover:scale-105 transition"
            >
                <Play size={20} className="fill-current" />
            </button>
            )}

            <button onClick={next} className="hover:scale-110 transition">
                <FastForward
                    size={22}
                    className="text-gray-400 hover:text-white transition-colors"
                    fill="currentColor"
                />
            </button>
        </div>

        <div className="flex items-center gap-2">
            <button
            onClick={() => setVolume(volume > 0 ? 0 : 1)}
            className="text-white-400 flex items-center justify-center transition-colors rounded-full h-11 w-11 bg-white/10">


            {volume === 0 ? (
                /* Muted */
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 
                        0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 
                        14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 
                        5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 
                        5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 
                        1.18v2.06c1.38-.31 2.63-.95 
                        3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 
                        4L9.91 6.09 12 8.18V4z" />
                </svg>
            ) : volume < 0.5 ? (
                /* Low Volume */
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 
                        2.5-2.25 2.5-4.02zM5 9v6h4l5 
                        5V4L9 9H5z" />
                </svg>
            ) : (
                /* Full Volume */
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 
                        3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 
                        2.5-2.25 2.5-4.02zM14 
                        3.23v2.06c2.89.86 5 3.54 5 
                        6.71s-2.11 5.85-5 
                        6.71v2.06c4.01-.91 7-4.49 
                        7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
            )}
            </button>
        </div>
</div>

  );
}
