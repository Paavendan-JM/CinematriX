<template>
  <div>
    <header class="header">
      <div class="header-content">
        <h1 class="title">CINEMATRIX</h1>
        <input
          v-model="query"
          @keyup.enter="searchMovie"
          placeholder="Search movies..."
          class="search-input"
        />
      </div>
    </header>

    <main style="padding: 0rem 2rem 5rem 2rem;">
      <br />
      <div v-if="!query">
        <section class="section">
          <h3 class="section-title">Trending Movies</h3>
          <div class="grid-container">
            <div class="card" v-for="movie in trending" :key="movie.id">
              <img :src="getImage(movie.poster_path)" @click="openModal(movie.title)" />
              <p>{{ movie.title }}</p>
            </div>
          </div>
        </section>

        <section class="section">
          <h3 class="section-title">Upcoming Movies</h3>
          <div class="grid-container">
            <div class="card" v-for="movie in upcoming" :key="movie.id">
              <img :src="getImage(movie.poster_path)" @click="openModal(movie.title)" />
              <p>{{ movie.title }}</p>
            </div>
          </div>
        </section>
      </div>

      <div v-else>
        <h3 class="section-title" style="color: #22bc22;">Search Results for "{{ query }}"</h3>
        <div class="grid-container">
          <div class="card" v-for="movie in searchResults" :key="movie.imdbID">
            <img :src="movie.Poster" @click="openModal(movie.Title)" />
            <p>{{ movie.Title }}</p>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      Made with ♥ by Paav
    </footer>

    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
  <div class="modal-content">
    <img :src="modalMovie.Poster" class="modal-poster" />
    <div class="modal-details">
      <h2 style="color: #22bc22;">{{ modalMovie.Title }}</h2>
      <p><strong style="color: #22bc22;">Language:</strong> {{ modalMovie.Language }}</p>
      <p><strong style="color: #22bc22;">Year:</strong> {{ modalMovie.Year }}</p>
      <p><strong style="color: #22bc22;">Genre:</strong> {{ modalMovie.Genre }}</p>
      <p><strong style="color: #22bc22;">Director:</strong> {{ modalMovie.Director }}</p>
      <p><strong style="color: #22bc22;">Cast:</strong> {{ modalMovie.Actors }}</p>
      <p><strong style="color: #22bc22;">Plot:</strong> {{ modalMovie.Plot }}</p>
      <p><strong style="color: #22bc22;">IMDB Rating:</strong> {{ modalMovie.imdbRating }}</p>
      <p><strong style="color: #22bc22;">Runtime:</strong> {{ modalMovie.Runtime }}</p>
      <p><strong style="color: #22bc22;">Type:</strong> {{ modalMovie.Type }}</p>

      <div v-if="trailerUrl" style="margin-top: 20px;">
        <p>
          <a :href="trailerUrl" target="_blank" style="color: #22bc22; text-decoration: underline;">Click here to watch Trailer
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { fetchTrending, fetchUpcoming, searchOMDB, getOMDBDetails } from './api.js'
import { fetchMovieTrailer } from './api.js'

const trailerUrl = ref(null)
const trending = ref([])
const upcoming = ref([])
const searchResults = ref([])
const query = ref('')

const showModal = ref(false)
const modalMovie = ref({})

onMounted(async () => {
  trending.value = await fetchTrending()
  upcoming.value = await fetchUpcoming()
})

async function searchMovie() {
  if (query.value.trim()) {
    searchResults.value = await searchOMDB(query.value)
  }
}

function getImage(path) {
  return `https://image.tmdb.org/t/p/w500${path}`
}

async function openModal(title) {
  modalMovie.value = await getOMDBDetails(title)
  showModal.value = true

  const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const tmdbSearch = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&api_key=${TMDB_API_KEY}`
  );
  const data = await tmdbSearch.json();

  if (data.results && data.results.length > 0) {
    const tmdbId = data.results[0].id;
    trailerUrl.value = await fetchMovieTrailer(tmdbId);
  } else {
    trailerUrl.value = null;
  }
}

function closeModal() {
  showModal.value = false
}
</script>

<style src="./style.css"></style>
