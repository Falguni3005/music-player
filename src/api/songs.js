// src/api/songs.js
export async function fetchSongs() {
    const res = await fetch("https://cms.samespace.com/items/songs");
    if (!res.ok) throw new Error("Failed to load songs");
    const { data } = await res.json();
  
    // Map API response
    const songs = data.map(song => ({
      id: song.id,
      name: song.name,
      artist: song.artist,
      accent: song.accent,
      topTrack: song.top_track,
      cover: `https://cms.samespace.com/assets/${song.cover}`,
      url: song.url,
      duration: null // placeholder, will fetch
    }));
  
    // Fetch duration for each song
    const songsWithDurations = await Promise.all(
      songs.map(song => getDuration(song))
    );
  
    return songsWithDurations;
  }
  
  // helper: load audio metadata
  function getDuration(song) {
    return new Promise(resolve => {
      const audio = new Audio(song.url);
      audio.addEventListener("loadedmetadata", () => {
        resolve({ ...song, duration: audio.duration });
      });
      audio.addEventListener("error", () => {
        // fallback if error
        resolve({ ...song, duration: 0 });
      });
    });
  }
  