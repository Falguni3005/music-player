import { usePlayer } from "../context/PlayerContext";

export default function TrackList({ songs }) {
  const { loadSong, currentIndex, setIsPlaying, queue } = usePlayer();

  function formatTime(seconds) {
    if (!seconds || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <div className="flex flex-col gap-2">
      {songs.map((song) => {
       
        const isActive = queue[currentIndex]?.id === song.id;

        return (
          <div
            key={song.id}
            onClick={() => { loadSong(song); setIsPlaying(true); }} 
            className={`flex items-center gap-3 p-3 cursor-pointer rounded transition 
              ${isActive 
                ? "bg-gradient-to-r from-white/20 to-white/10" 
                : "hover:bg-white/10"}`
            }
          >
            <img src={song.cover} alt={song.name} className="w-12 h-12 rounded" />
            <div>
              <p className={`font-semibold ${isActive ? "text-white" : ""}`}>
                {song.name}
              </p>
              <p className="text-sm opacity-70">{song.artist}</p>
            </div>
            <span className="ml-auto text-sm opacity-70">
              {formatTime(song.duration)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
