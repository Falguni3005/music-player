import axios from "axios";

// fetch songs from API
export async function fetchSongs() {
  try {
    const res = await axios.get("https://cms.samespace.com/items/songs");

    const data = res.data.data;

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
  } catch (error) {
    console.error("Failed to load songs", error);
    return [];
  }
}

// helper: load audio metadata
function getDuration(song) {
  return new Promise(resolve => {
    const audio = new Audio(song.url);
    audio.addEventListener("loadedmetadata", () => {
      resolve({ ...song, duration: audio.duration });
    });
    audio.addEventListener("error", () => {
      resolve({ ...song, duration: 0 });
    });
  });
}