const global = {
  currentPage: window.location.pathname
}

//  get popular movies
async function getPopularMovies() {
  const { results } = await fetchApiData('movie/popular')
  results.forEach(movie => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    <img
      src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
      class="card-img-top"
      alt="Movie Title"
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">${movie.release_date}</small>
    </p>
  </div>
    `   
    document.getElementById('popular-movies').appendChild(div)
  })
}



//  get popular TV shows
async function getPopularShows() {
  const { results } = await fetchApiData('tv/popular')
  results.forEach(show => {
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML = `
    <a href="tv-details.html?id=${show.id}">
    <img
      src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Aired: ${show.first_air_date}</small>
    </p>
  </div>
    `
    document.getElementById('popular-shows').appendChild(div)
  })
}


// Get movie details
async function getMovieDetail() {
  const movieId = window.location.search.split('=')[1]
  const movie = await fetchApiData(`/movie/${movieId}`)
  displayBackgroundImage('movie', movie.backdrop_path)
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
    <img
      src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
      class="card-img-top"
      alt="${movie.title}"
    />
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${movie.release_date
    }</p>
    <p>
      ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${movie.genres.map(genre => `
    <li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
    <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
    <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
    <li><span class="text-secondary">Status:</span> ${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  ${movie.production_companies.map(company => `
  <span class="list-group">${company.name}</span>`).join(', ')  }
</div>
  `
  document.getElementById('movie-details').appendChild(div)
}



// Get tv-show details
async function getShowDetail() {
  const showId = window.location.search.split('=')[1]
  const show = await fetchApiData(`/tv/${showId}`)
  displayBackgroundImage('show', show.backdrop_path)
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
    <img
      src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
      class="card-img-top"
      alt="${show.name}"
    />
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
    ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${show.genres.map(genre => `
    <li>${genre.name}</li>`).join('')}
    </ul>
    <a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}
    </li>
    <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  ${show.production_companies.map(company => `
  <span class="list-group">${company.name}</span>`).join(', ')  }
</div>
  `
  document.getElementById('show-details').appendChild(div)
}


// Display Slider Movie
async function displaySlider() {
  const { results } = await fetchApiData('movie/now_playing')
  console.log(results);
  // console.log(movieDetail);
  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${result.id}">
    <img src="https://image.tmdb.org/t/p/w500/${result.poster_path}" />
  </a>
  <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(1)} / 10
  </h4>
    `
    document.querySelector('.swiper-wrapper').appendChild(div)
    initSwiper()
  })
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    breakpoints: {
      // when window width is >= 320px
      500: {
        slidesPerView: 2,
      },
      // when window width is >= 480px
      700: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      1200: {
        slidesPerView: 4,
      }
    },
    
  });
}

// Fetch Data
async function fetchApiData(endpoint) {
  const API_KEY = '9ef830f07c9bfd20f31f48a911de5a79';
  const API_URL = 'https://api.themoviedb.org/3/';
  showSpinner()
  const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
  const data = await response.json();
  hideSpinner()
  return data;
}

//  add an overlay to the tv/movie details
function displayBackgroundImage(type, backdropImage) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(
  https://image.tmdb.org/t/p/original/${backdropImage})`
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.zIndex = '-1'
  overlayDiv.style.opacity = '0.1'
  overlayDiv.style.position = 'absolute'
  overlayDiv.style.height = '100vh'
  overlayDiv.style.width = '100vw'
  overlayDiv.style.top = '0'
  overlayDiv.style.left = '0'

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

// Show Spinner
function showSpinner() {
  document.querySelector('.spinner').classList.add('show')
}

// Show Spinner
function hideSpinner() {
  // document.querySelector('.spinner').className ='none'
  document.querySelector('.spinner').classList.remove('show')
}

// hide Spinner
function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Highlight Active Link
function highlightActiveLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === (global.currentPage)) {
      link.classList.add('active')
    }
  })
}



// init app
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider()
      getPopularMovies()
      break;
    case '/shows.html':
      getPopularShows()
      break;
    case '/search.html':
      console.log('search');
      break;
    case '/tv-details.html':
      getShowDetail()
      break;
    case '/movie-details.html':
      getMovieDetail()
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init)