import { createContext, useState, useRef, useContext, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;

    audio.volume = volume;

    const onTime = () => setTime(audio.currentTime);
    const onLoaded = () => setDuration(audio.duration);
    const onEnd = () => next();

    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (queue.length > 0 && !audioRef.current.src) {
      loadSong(0); 
    }
  }, [queue]);

  const play = () => {
    if (!audioRef.current.src && queue[currentIndex]) {
      loadSong(currentIndex);  
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };
  
  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };
  
  const loadSong = (songOrIndex) => {
    let song;
    let index;
  
    if (typeof songOrIndex === "number") {
      index = songOrIndex;
      song = queue[index];
    } else {
      song = songOrIndex;
      index = queue.findIndex((s) => s.id === song.id);
  
      if (index === -1) {
        setQueue((prev) => [...prev, song]);
        index = queue.length;
      }
    }
  
    if (!song) return;
  
    setCurrentIndex(index);
    audioRef.current.src = song.url;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };
  

  const next = () => {loadSong((currentIndex + 1) % queue.length); setIsPlaying(true)}
  const prev = () => {loadSong((currentIndex - 1 + queue.length) % queue.length); setIsPlaying(true)}
  const seek = (sec) => { audioRef.current.currentTime = sec; };


  return (
    <PlayerContext.Provider
      value={{
        queue,
        setQueue,
        currentIndex,
        currentSong: queue[currentIndex],
        isPlaying,
        play,
        pause,
        loadSong,
        next,
        prev,
        time,
        duration,
        seek,
        volume,
        setVolume,
        setIsPlaying
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
