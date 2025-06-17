const OMDB_KEY = import.meta.env.VITE_OMDB_API_KEY;
const TMDB_KEY = import.meta.env.VITE_TMDB_API_KEY;


export async function fetchTrending() {
  const res = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`)
  const data = await res.json()
  return data.results.slice(0, 8)
}

export async function fetchUpcoming() {
  const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_KEY}`)
  const data = await res.json()
  return data.results.slice(0, 8)
}

export async function searchOMDB(query) {
  const res = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${OMDB_KEY}`)
  const data = await res.json()
  return data.Search?.slice(0, 8) || []
}

export async function getOMDBDetails(title) {
  const res = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${OMDB_KEY}`)
  const data = await res.json()
  return data
}

export async function fetchMovieTrailer(movieId) {
  const TMDB_KEY = '916b220e512ff6063d1be767f0b3c76c';
  const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_KEY}`);
  const data = await res.json();
  const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
  return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
}
