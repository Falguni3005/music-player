import { useEffect, useState } from "react";
import { fetchSongs } from "./api/songs";
import { usePlayer } from "./context/PlayerContext";
import { useGradient } from "./hooks/useGradient";
import Tabs from "./components/Tabs";
import SearchBox from "./components/SearchBox";
import TrackList from "./components/TrackList";
import SeekBar from "./components/SeekBar";
import Controls from "./components/Controls";
import { ChevronDown } from "lucide-react"; 
import { Play, Pause } from "lucide-react";


export default function App() {
  const { setQueue, currentSong, setCurrentSong, isPlaying, play, pause } = usePlayer();
  const [songs, setSongs] = useState([]);
  const [tab, setTab] = useState("forYou");
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(true);   
  const [isExpanded, setIsExpanded] = useState(false); 

  const bg = useGradient(currentSong?.cover, currentSong?.accent);

  // Fetch songs once
  useEffect(() => {
    fetchSongs().then(data => {
      setSongs(data);
      setQueue(data); // full queue for navigation
    });
  }, [setQueue]);

  // Filter songs based on tab and search
  const filteredSongs = songs.filter(song => {
    const matchesQuery =
      song.name.toLowerCase().includes(query.toLowerCase()) ||
      song.artist.toLowerCase().includes(query.toLowerCase());
    const matchesTab =
      tab === "forYou" ? true : song.topTrack;
    return matchesQuery && matchesTab;
  });

  // Handle track click
  const handlePlaySong = (song) => {
    setCurrentSong(song); // directly set the song object
  };
  

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row text-white relative"
      style={{
        background: bg,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        transition: "background 0.5s",
      }}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-1/2">
        <div className="w-1/3 flex flex-col justify-between p-6">
          <div className="flex items-center gap-2">
            <img src="/spotify.png" alt="Spotify" className="w-9 h-9 rounded-full" />
            <h1 className="text-2xl font-bold">Spotify</h1>
          </div>
          <img
            src="/spotifyProfile.jpeg"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="w-2/3 flex flex-col p-6">
          <Tabs activeTab={tab} setActiveTab={setTab} />
          <SearchBox value={query} setValue={setQuery} />
          <div className="flex-1 overflow-y-auto mt-4">
            <TrackList songs={filteredSongs} onTrackClick={handlePlaySong} />
          </div>
        </div>
      </aside>

      {/* Desktop Player */}
      <main className="hidden lg:flex flex-1 flex-col items-center p-8 mt-8">
        {currentSong && (
          <>
            <div className="w-[420px] text-left mb-4">
              <h2 className="text-3xl font-bold">{currentSong.name}</h2>
              <p className="text-lg opacity-70">{currentSong.artist}</p>
            </div>

            <img
              src={currentSong.cover}
              className="w-[420px] h-[420px] rounded-xl mb-6"
            />

            <div className="w-[420px]">
              <SeekBar />
            </div>

            <div className="w-[420px] mt-4 flex justify-center">
              <Controls />
            </div>
          </>
        )}
      </main>

      {/* Mobile */}
      <div className="lg:hidden flex-1 relative">

        <div className="flex items-center justify-between p-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <img src="/spotify.png" alt="Spotify" className="w-8 h-8 rounded-full" />
            <h1 className="text-lg font-bold">Spotify</h1>
          </div>
          <img
            src="/spotifyProfile.jpeg"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>

        {showList && (
          <div className="p-6 flex flex-col h-full">
            <Tabs activeTab={tab} setActiveTab={setTab} />
            <SearchBox value={query} setValue={setQuery} />
            <div className="flex-1 overflow-y-auto mb-20">
            <TrackList songs={filteredSongs} onTrackClick={handlePlaySong} />
            </div>
          </div>
        )}

        {currentSong && (
          <div
            className={`fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md transition-all duration-300 ${
              isExpanded ? "h-full p-6" : "h-20 px-4"
            }`}
            style={{background:bg}}
          >
            {isExpanded ? (
              <div className="flex flex-col items-center justify-center h-full relative p-3">
                <button
                  className="absolute top-4 right-2 p-2 rounded-full bg-white/10 hover:bg-white/20"
                  onClick={() => setIsExpanded(false)}
                >
                  <ChevronDown size={24} />
                </button>

                <div className="w-full max-w-[550px] text-left mt-6">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold">
                    {currentSong.name}
                  </h2>
                  <p className="mb-4 text-sm sm:text-md md:text-lg opacity-70">
                    {currentSong.artist}
                  </p>
                </div>

                <img
                  src={currentSong.cover}
                  className="w-full max-w-[550px] aspect-square rounded-xl mb-6 mt-2"
                  alt={currentSong.name}
                />

                <div className="w-full max-w-[550px]">
                  <SeekBar />
                </div>

                <div className="w-full max-w-[550px] mt-4 mb-5 flex items-center justify-center">
                  <Controls />
                </div>
              </div>
            ) : (
              <div
              className="flex items-center justify-between h-full cursor-pointer"
              onClick={() => setIsExpanded(true)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={currentSong.cover}
                  className="w-12 h-12 rounded"
                  alt={currentSong.name}
                />
                <div>
                  <p className="font-semibold text-md leading-tight">
                    {currentSong.name}
                  </p>
                  <p className="text-sm opacity-70">{currentSong.artist}</p>
                </div>
              </div>
            
              <button
                className="bg-white text-black rounded-full p-3 flex items-center justify-center hover:bg-white/80 transition"
                onClick={(e) => {
                  e.stopPropagation(); 
                  if (isPlaying) {
                    pause();
                  } else {
                    play();
                  }
                }}
              >
                {isPlaying ? <Pause size={20} className="fill-current"/> : <Play size={20} className="fill-current"/>}
              </button>
            </div>            
            )}
          </div>
        )}
      </div>
    </div>
  );
}
