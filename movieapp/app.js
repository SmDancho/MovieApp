const apiKey = '0dcd1201-3cee-4b23-ba39-cb57f6ce3c78';

const apiUrl= 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
getMovie(apiUrl);

async function getMovie(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': apiKey,
            'Content-Type': 'application/json',
        },
    })
    const resData = await response.json();
    showMovies(resData)
    console.log(resData)    
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
    document.querySelector(".movies").innerHTML = "";
  
    data.films.forEach((movie) => {
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
          <div class="movie__cover-inner">
          <img
            src="${movie.posterUrlPreview}"
            class="movie__cover"
            alt="${movie.nameRu}"
          />
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
          )}</div>

          ${`<div class="movie__average movie__average ${movie.rating}">${movie.rating}</div> `}
          
        </div>
          `;
      moviesEl.appendChild(movieEl);
    });
  }

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", e => {
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if (search.value) {
      getMovie(apiSearchUrl);
  
      search.value = "";}
})


